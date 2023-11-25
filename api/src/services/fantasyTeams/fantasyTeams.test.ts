import type { FantasyTeam } from '@prisma/client'

import {
  fantasyTeams,
  fantasyTeam,
  createFantasyTeam,
  updateFantasyTeam,
  deleteFantasyTeam,
} from './fantasyTeams'
import type { StandardScenario } from './fantasyTeams.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('fantasyTeams', () => {
  scenario('returns all fantasyTeams', async (scenario: StandardScenario) => {
    const result = await fantasyTeams()

    expect(result.length).toEqual(Object.keys(scenario.fantasyTeam).length)
  })

  scenario(
    'returns a single fantasyTeam',
    async (scenario: StandardScenario) => {
      const result = await fantasyTeam({ id: scenario.fantasyTeam.one.id })

      expect(result).toEqual(scenario.fantasyTeam.one)
    }
  )

  scenario('creates a fantasyTeam', async (scenario: StandardScenario) => {
    const result = await createFantasyTeam({
      input: {
        userId: scenario.fantasyTeam.two.userId,
        venmoHandle: 'String',
        fantasyEventId: 'blah',
      },
      members: [{ eventRunnerId: '1', seed: 10 }],
    })

    expect(result.userId).toEqual(scenario.fantasyTeam.two.userId)
    expect(result.fantasyTeamWagerId).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-11-04T20:57:05.889Z'))
  })

  scenario('updates a fantasyTeam', async (scenario: StandardScenario) => {
    const original = (await fantasyTeam({
      id: scenario.fantasyTeam.one.id,
    })) as FantasyTeam
    const result = await updateFantasyTeam({
      id: original.id,
      input: { fantasyTeamWagerId: 'String2' },
    })

    expect(result.fantasyTeamWagerId).toEqual('String2')
  })

  scenario('deletes a fantasyTeam', async (scenario: StandardScenario) => {
    const original = (await deleteFantasyTeam({
      id: scenario.fantasyTeam.one.id,
    })) as FantasyTeam
    const result = await fantasyTeam({ id: original.id })

    expect(result).toEqual(null)
  })
})
