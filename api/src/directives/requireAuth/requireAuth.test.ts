import { Mock } from 'ts-mockery'
import { User } from 'types/graphql'

import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  it('requireAuth has stub implementation. Should not throw when current user', () => {
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: {
        currentUser: Mock.of<Omit<User, 'fantasyTeams'>>({ id: '1' }),
      },
    })

    expect(mockExecution).not.toThrow()
  })
})
