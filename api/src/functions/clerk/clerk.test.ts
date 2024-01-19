import { WebhookVerificationError, verifyEvent } from '@redwoodjs/api/webhooks'
import { mockSignedWebhook } from '@redwoodjs/testing/api'

import { db } from 'src/lib/db'

import { ClerkPayload, handler } from './clerk'

jest.mock('@redwoodjs/api/webhooks')

const verifyEventMock = verifyEvent as jest.Mock

describe('clerk function', () => {
  test('creates a user', async () => {
    const payload = {
      type: 'user.created',
      data: {
        id: 'external',
        email_addresses: [{ email_address: 'a@b.c' }],
        profile_image_url: 'https://example.com/avatar.png',
      },
    } as ClerkPayload

    const event = mockSignedWebhook({
      payload,
      signatureType: 'base64Sha256Verifier',
      signatureHeader: 'svix-signature',
      secret: process.env.CLERK_WH_SECRET.slice(6),
    })

    expect(await db.user.count()).toEqual(0)
    const result = await handler(event)

    expect(result.statusCode).toBe(200)
    const user = await db.user.findFirst()
    expect(user.externalId).toEqual('external')
    expect(user.avatarUrl).toEqual('https://example.com/avatar.png')
  })

  test('upserts a user', async () => {
    const existingUser = await db.user.create({
      data: { externalId: 'external', email: 'a@b.c' },
    })
    expect(existingUser.avatarUrl).toBeNull()

    const payload = {
      type: 'user.updated',
      data: {
        id: 'external',
        email_addresses: [{ email_address: 'a@b.c' }],
        profile_image_url: 'https://example.com/avatar.png',
      },
    } as ClerkPayload

    const event = mockSignedWebhook({
      payload,
      signatureType: 'base64Sha256Verifier',
      signatureHeader: 'svix-signature',
      secret: process.env.CLERK_WH_SECRET.slice(6),
    })

    await handler(event)

    const user = await db.user.findFirst()
    expect(user.avatarUrl).toEqual('https://example.com/avatar.png')
  })

  test('deletes a user', async () => {
    await db.user.create({
      data: { externalId: 'external', email: 'a@b.c' },
    })
    expect(await db.user.count()).toEqual(1)

    const payload = {
      type: 'user.deleted',
      data: {
        id: 'external',
        email_addresses: [{ email_address: 'a@b.c' }],
        profile_image_url: 'https://example.com/avatar.png',
      },
    } as ClerkPayload

    const event = mockSignedWebhook({
      payload,
      signatureType: 'base64Sha256Verifier',
      signatureHeader: 'svix-signature',
      secret: process.env.CLERK_WH_SECRET.slice(6),
    })

    await handler(event)

    expect(await db.user.count()).toEqual(0)
  })

  test('sets an admin', async () => {
    await db.user.create({
      data: { externalId: 'external', email: 'a@b.c' },
    })
    expect((await db.user.findFirst()).roles).toEqual(['USER'])

    const payload = {
      type: 'organizationMembership.created',
      data: {
        public_user_data: { user_id: 'external' },
        role: 'admin',
      },
    } as ClerkPayload

    const event = mockSignedWebhook({
      payload,
      signatureType: 'base64Sha256Verifier',
      signatureHeader: 'svix-signature',
      secret: process.env.CLERK_WH_SECRET.slice(6),
    })

    await handler(event)

    expect((await db.user.findFirst()).roles).toEqual(['ADMIN'])
  })

  test('demotes an admin', async () => {
    await db.user.create({
      data: { externalId: 'external', email: 'a@b.c', roles: ['ADMIN'] },
    })

    const payload = {
      type: 'organizationMembership.updated',
      data: {
        public_user_data: { user_id: 'external' },
        role: 'basic_member',
      },
    } as ClerkPayload

    const event = mockSignedWebhook({
      payload,
      signatureType: 'base64Sha256Verifier',
      signatureHeader: 'svix-signature',
      secret: process.env.CLERK_WH_SECRET.slice(6),
    })

    await handler(event)

    expect((await db.user.findFirst()).roles).toEqual(['USER'])
  })

  test('demotes an admin (2)', async () => {
    await db.user.create({
      data: { externalId: 'external', email: 'a@b.c', roles: ['ADMIN'] },
    })

    const payload = {
      type: 'organizationMembership.deleted',
      data: {
        public_user_data: { user_id: 'external' },
        role: 'basic_member',
      },
    } as ClerkPayload

    const event = mockSignedWebhook({
      payload,
      signatureType: 'base64Sha256Verifier',
      signatureHeader: 'svix-signature',
      secret: process.env.CLERK_WH_SECRET.slice(6),
    })

    await handler(event)

    expect((await db.user.findFirst()).roles).toEqual(['USER'])
  })

  test('blocks unauthorized', async () => {
    verifyEventMock.mockImplementation(() => {
      throw new WebhookVerificationError()
    })
    const payload = {}

    const event = mockSignedWebhook({
      payload,
      signatureType: 'base64Sha256Verifier',
      signatureHeader: 'svix-signature',
      secret: process.env.CLERK_WH_SECRET.slice(6),
    })

    const result = await handler(event)

    expect(result.statusCode).toBe(401)
  })

  test('throws 500', async () => {
    verifyEventMock.mockImplementation(() => {
      throw new Error('oh no!')
    })
    const payload = {}

    const event = mockSignedWebhook({
      payload,
      signatureType: 'base64Sha256Verifier',
      signatureHeader: 'svix-signature',
      secret: process.env.CLERK_WH_SECRET.slice(6),
    })

    const result = await handler(event)

    expect(result.statusCode).toBe(500)
    expect(result.body.includes('oh no!')).toBe(true)
  })
})
