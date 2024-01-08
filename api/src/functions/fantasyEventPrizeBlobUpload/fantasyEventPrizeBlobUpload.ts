import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import type { APIGatewayEvent, Context } from 'aws-lambda'
import { match } from 'ts-pattern'

import { getUserFromCookie } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const uploadLogger = logger.child({ module: 'prize-blob' })

  try {
    const user = await getUserFromCookie(event, context)
    if (!user || !user.roles.includes('ADMIN')) {
      if (!user) uploadLogger.error({ event, context }, 'No user')
      if (!user.roles.includes('ADMIN'))
        uploadLogger.error({ event, context }, 'Not admin')

      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
      }
    }

    return match(event)
      .with({ httpMethod: 'POST' }, async () => {
        const rawBody = event.isBase64Encoded
          ? Buffer.from(event.body, 'base64').toString('utf-8')
          : event.body
        const body = JSON.parse(rawBody) as HandleUploadBody
        const location = new URL(event.headers.referer)
        // A request object is required for handleUpload, mainly to extract headers
        const request = new Request(`${location.origin}/${event.path}`, {
          headers: new Headers(event.headers),
        })

        const { status, ...json } = await handleUpload({
          body,
          request,
          onBeforeGenerateToken: async (
            _pathname: string,
            _clientPayload?: string
          ) => {
            return {
              allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
              tokenPayload: JSON.stringify({}),
            }
          },
          onUploadCompleted: async () => {},
        })
          .then((body) => ({ status: 201, ...body }))
          .catch((error) => {
            uploadLogger.error({ message: error.message }, 'Blob upload failed')
            return {
              status: 400,
              body: JSON.stringify({ error: (error as Error).message }),
            }
          })
        return { statusCode: status, body: JSON.stringify(json) }
      })
      .otherwise(() => {
        uploadLogger.error('Other failure')
        return { statusCode: 404 }
      })
  } catch (e) {
    uploadLogger.error({ message: e.message }, 'Catch failure')
    return {
      statusCode: 500,
      body: JSON.stringify({ other: 'catch error', message: e.message }),
    }
  }
}
