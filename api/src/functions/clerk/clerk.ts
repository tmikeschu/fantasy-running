import { APIGatewayEvent } from 'aws-lambda'
import { match, P } from 'ts-pattern'

import {
  verifyEvent,
  VerifyOptions,
  WebhookVerificationError,
} from '@redwoodjs/api/webhooks'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

type EmailAddressConfig = {
  email_address: string
  id: string
}

type Payload =
  | {
      object: string
      type: `user.${'updated' | 'created' | 'deleted'}`
      data: {
        email_addresses: EmailAddressConfig[]
        external_accounts: []
        first_name: string
        has_image: false
        id: string
        image_url: string
        last_name: string
        private_metadata: Record<string, unknown>
        profile_image_url: string
        public_metadata: Record<string, unknown>
        unsafe_metadata: Record<string, unknown>
      }
    }
  | {
      type: `organizationMembership.${'updated' | 'created' | 'deleted'}`
      data: {
        id: string
        role: 'admin' | 'basic_member'
        created_at: 1699202663855
        public_user_data: {
          user_id: 'user_2XlTMUXfjjoEmIjlyy3e6ApYDJk'
        }
      }
    }

export const handler = async (event: APIGatewayEvent) => {
  const clerkInfo = { webhook: 'clerk' }
  const webhookLogger = logger.child({ clerkInfo })
  const body = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf-8')
    : event.body

  webhookLogger.trace('Invoked clerkWebhook function')

  try {
    const options: VerifyOptions = {
      signatureHeader: 'svix-signature',
      signatureTransformer: (signature: string) => {
        // Clerk can pass a space separated list of signatures.
        // Let's just use the first one that's of version 1
        const passedSignatures = signature.split(' ')

        for (const versionedSignature of passedSignatures) {
          const [version, signature] = versionedSignature.split(',')

          if (version === 'v1') {
            return signature
          }
        }
      },
    }

    const svix_id = event.headers['svix-id']
    const svix_timestamp = event.headers['svix-timestamp']

    verifyEvent('base64Sha256Verifier', {
      event,
      secret: process.env.CLERK_WH_SECRET.slice(6),
      payload: `${svix_id}.${svix_timestamp}.${body}`,
      options,
    })

    const payload = JSON.parse(body) as Payload
    webhookLogger.debug({ payload }, 'Payload')
    await match(payload)
      .with(
        {
          type: P.union(
            'organizationMembership.updated',
            'organizationMembership.created'
          ),
        },
        ({ data }) => {
          return db.user.update({
            where: { externalId: data.public_user_data.user_id },
            data: { roles: [data.role === 'admin' ? 'ADMIN' : 'USER'] },
          })
        }
      )
      .with({ type: 'organizationMembership.deleted' }, ({ data }) => {
        return db.user.update({
          where: { externalId: data.public_user_data.user_id },
          data: { roles: ['USER'] },
        })
      })
      .with({ type: P.union('user.updated', 'user.created') }, (payload) => {
        return db.user.upsert({
          where: { email: payload.data.email_addresses[0].email_address },
          create: {
            externalId: payload.data.id,
            email: payload.data.email_addresses[0].email_address,
            avatarUrl: payload.data.profile_image_url,
          },
          update: { avatarUrl: payload.data.profile_image_url },
        })
      })
      .with({ type: 'user.deleted' }, ({ data }) => {
        return db.user.delete({ where: { externalId: data.id } })
      })
      .otherwise(async () => {})

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    }
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      webhookLogger.warn('Unauthorized')

      return {
        statusCode: 401,
      }
    } else {
      webhookLogger.error({ error }, error.message)

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      }
    }
  }
}
