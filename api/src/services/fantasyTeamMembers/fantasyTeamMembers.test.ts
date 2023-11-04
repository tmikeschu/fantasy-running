import type { FantasyTeamMember } from '@prisma/client'

import {
  fantasyTeamMembers,
  fantasyTeamMember,
  createFantasyTeamMember,
  updateFantasyTeamMember,
  deleteFantasyTeamMember,
} from './fantasyTeamMembers'
import type { StandardScenario } from './fantasyTeamMembers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('fantasyTeamMembers', () => {
  scenario(
    'returns all fantasyTeamMembers',
    async (scenario: StandardScenario) => {
      const result = await fantasyTeamMembers()

      expect(result.length).toEqual(
        Object.keys(scenario.fantasyTeamMember).length
      )
    }
  )

  scenario(
    'returns a single fantasyTeamMember',
    async (scenario: StandardScenario) => {
      const result = await fantasyTeamMember({
        id: scenario.fantasyTeamMember.one.id,
      })

      expect(result).toEqual(scenario.fantasyTeamMember.one)
    }
  )

  scenario(
    'creates a fantasyTeamMember',
    async (scenario: StandardScenario) => {
      const result = await createFantasyTeamMember({
        input: {
          fantasyTeamId: scenario.fantasyTeamMember.two.fantasyTeamId,
          runnerId: scenario.fantasyTeamMember.two.runnerId,
          updatedAt: '2023-11-04T21:28:57.703Z',
        },
      })

      expect(result.fantasyTeamId).toEqual(
        scenario.fantasyTeamMember.two.fantasyTeamId
      )
      expect(result.runnerId).toEqual(scenario.fantasyTeamMember.two.runnerId)
      expect(result.updatedAt).toEqual(new Date('2023-11-04T21:28:57.703Z'))
    }
  )

  scenario(
    'updates a fantasyTeamMember',
    async (scenario: StandardScenario) => {
      const original = (await fantasyTeamMember({
        id: scenario.fantasyTeamMember.one.id,
      })) as FantasyTeamMember
      const result = await updateFantasyTeamMember({
        id: original.id,
        input: { updatedAt: '2023-11-05T22:28:57.704Z' },
      })

      expect(result.updatedAt).toEqual(new Date('2023-11-05T22:28:57.704Z'))
    }
  )

  scenario(
    'deletes a fantasyTeamMember',
    async (scenario: StandardScenario) => {
      const original = (await deleteFantasyTeamMember({
        id: scenario.fantasyTeamMember.one.id,
      })) as FantasyTeamMember
      const result = await fantasyTeamMember({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
