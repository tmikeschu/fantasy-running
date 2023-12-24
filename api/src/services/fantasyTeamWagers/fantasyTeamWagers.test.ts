import type { FantasyTeamWager } from '@prisma/client'

import {
  fantasyTeamWagers,
  fantasyTeamWager,
  createFantasyTeamWager,
  updateFantasyTeamWager,
  deleteFantasyTeamWager,
} from './fantasyTeamWagers'
import type { StandardScenario } from './fantasyTeamWagers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('fantasyTeamWagers', () => {
  scenario(
    'returns all fantasyTeamWagers',
    async (scenario: StandardScenario) => {
      const result = await fantasyTeamWagers()

      expect(result.length).toEqual(
        Object.keys(scenario.fantasyTeamWager).length
      )
    }
  )

  scenario(
    'returns a single fantasyTeamWager',
    async (scenario: StandardScenario) => {
      const result = await fantasyTeamWager({
        id: scenario.fantasyTeamWager.one.id,
      })

      expect(result).toEqual(scenario.fantasyTeamWager.one)
    }
  )

  scenario('creates a fantasyTeamWager', async () => {
    const result = await createFantasyTeamWager({
      input: {
        wager: 8919023.156473016,
      },
    })

    expect(result.wager).toEqual(8919023.156473016)
    expect(result.updatedAt).toEqual(new Date('2023-11-24T09:31:42.145Z'))
  })

  scenario('updates a fantasyTeamWager', async (scenario: StandardScenario) => {
    const original = (await fantasyTeamWager({
      id: scenario.fantasyTeamWager.one.id,
    })) as FantasyTeamWager
    const result = await updateFantasyTeamWager({
      id: original.id,
      input: { wager: 4677532.074544757 },
    })

    expect(result.wager).toEqual(4677532.074544757)
  })

  scenario('deletes a fantasyTeamWager', async (scenario: StandardScenario) => {
    const original = (await deleteFantasyTeamWager({
      id: scenario.fantasyTeamWager.one.id,
    })) as FantasyTeamWager
    const result = await fantasyTeamWager({ id: original.id })

    expect(result).toEqual(null)
  })
})
