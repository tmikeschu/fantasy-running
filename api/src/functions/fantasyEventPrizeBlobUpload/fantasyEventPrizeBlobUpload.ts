import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import type { APIGatewayEvent, Context } from 'aws-lambda'
import { match } from 'ts-pattern'

import { getUserFromCookie } from 'src/lib/auth'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const user = await getUserFromCookie(event, context)
  if (!user || !user.roles.includes('ADMIN')) return { statusCode: 401 }

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

      return handleUpload({
        body,
        request,
        onBeforeGenerateToken: async (
          _pathname: string,
          _clientPayload?: string
        ) => {
          return {
            allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
          }
        },
        onUploadCompleted: async () => {},
      })
        .then((body) => ({ statusCode: 201, body }))
        .catch((error) => ({
          statusCode: 400,
          body: { error: (error as Error).message },
        }))
    })
    .otherwise(() => ({ statusCode: 404 }))
}
