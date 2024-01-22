import { handleUpload } from '@vercel/blob/client'

import { mockHttpEvent } from '@redwoodjs/testing/api'

import { getUserFromCookie } from 'src/lib/auth'

import { handler } from './fantasyEventPrizeBlobUpload'

jest.mock('src/lib/auth')
jest.mock('@vercel/blob/client')

const getUserFromCookieMock = getUserFromCookie as jest.Mock
const handleUploadMock = handleUpload as jest.Mock

describe('fantasyEventPrizeBlobUpload function', () => {
  it('responds with 401 for no user', async () => {
    const httpEvent = mockHttpEvent({})
    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(401)
  })

  it('responds with 401 for non admin user', async () => {
    getUserFromCookieMock.mockResolvedValueOnce({ roles: ['USER'] })
    const httpEvent = mockHttpEvent({})
    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(401)
  })

  it('responds with 404 for non POST', async () => {
    getUserFromCookieMock.mockResolvedValue({ roles: ['ADMIN'] })
    const methods = ['GET', 'PUT', 'PATCH', 'DELETE']
    for (const httpMethod of methods) {
      const httpEvent = mockHttpEvent({ httpMethod })
      const response = await handler(httpEvent, null)
      expect(response.statusCode).toBe(404)
    }
  })

  it('responds with 201 for POST', async () => {
    getUserFromCookieMock.mockResolvedValue({ roles: ['ADMIN'] })
    handleUploadMock.mockImplementation(() => Promise.resolve({ body: 'yay' }))
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers: {
        referer: 'http://localhost:8910/admin/fantasy-events/1/edit',
      },
      body: '{ "foo": "bar" }',
    })
    const response = await handler(httpEvent, null)

    expect(handleUploadMock).toHaveBeenCalledWith(
      expect.objectContaining({ body: { foo: 'bar' } })
    )

    expect(response.statusCode).toBe(201)
    const body = JSON.parse(
      'body' in response ? (response.body as string) : '{}'
    )
    expect(body).toEqual({ body: 'yay' })
  })

  it('parses base64 body strings', async () => {
    getUserFromCookieMock.mockResolvedValue({ roles: ['ADMIN'] })
    handleUploadMock.mockImplementation(() => Promise.resolve({ body: 'yay' }))
    const httpEvent = mockHttpEvent({
      httpMethod: 'POST',
      headers: {
        referer: 'http://localhost:8910/admin/fantasy-events/1/edit',
      },
      isBase64Encoded: true,
      body: Buffer.from('{ "foo": "bar" }').toString('base64'),
    })
    const response = await handler(httpEvent, null)

    expect(handleUploadMock).toHaveBeenCalledWith(
      expect.objectContaining({ body: { foo: 'bar' } })
    )

    expect(response.statusCode).toBe(201)
    const body = JSON.parse(
      'body' in response ? (response.body as string) : '{}'
    )
    expect(body).toEqual({ body: 'yay' })
  })
})
