import type { FantasyEventPrize } from '@prisma/client'

import {
  fantasyEventPrizes,
  fantasyEventPrize,
  createFantasyEventPrize,
  updateFantasyEventPrize,
  deleteFantasyEventPrize,
} from './fantasyEventPrizes'
import type { StandardScenario } from './fantasyEventPrizes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('fantasyEventPrizes', () => {
  scenario(
    'returns all fantasyEventPrizes',
    async (scenario: StandardScenario) => {
      const result = await fantasyEventPrizes()

      expect(result.length).toEqual(
        Object.keys(scenario.fantasyEventPrize).length
      )
    }
  )

  scenario(
    'returns a single fantasyEventPrize',
    async (scenario: StandardScenario) => {
      const result = await fantasyEventPrize({
        id: scenario.fantasyEventPrize.one.id,
      })

      expect(result).toEqual(scenario.fantasyEventPrize.one)
    }
  )

  scenario(
    'creates a fantasyEventPrize',
    async (scenario: StandardScenario) => {
      const result = await createFantasyEventPrize({
        input: {
          name: 'String',
          description: 'String',
          rank: 2656834,
          fantasyEventId: scenario.fantasyEventPrize.two.fantasyEventId,
        },
      })

      expect(result.name).toEqual('String')
      expect(result.description).toEqual('String')
      expect(result.rank).toEqual(2656834)
      expect(result.fantasyEventId).toEqual(
        scenario.fantasyEventPrize.two.fantasyEventId
      )
    }
  )

  scenario(
    'updates a fantasyEventPrize',
    async (scenario: StandardScenario) => {
      const original = (await fantasyEventPrize({
        id: scenario.fantasyEventPrize.one.id,
      })) as FantasyEventPrize
      const result = await updateFantasyEventPrize({
        id: original.id,
        input: { name: 'String2' },
      })

      expect(result.name).toEqual('String2')
    }
  )

  scenario(
    'deletes a fantasyEventPrize',
    async (scenario: StandardScenario) => {
      const original = (await deleteFantasyEventPrize({
        id: scenario.fantasyEventPrize.one.id,
      })) as FantasyEventPrize
      const result = await fantasyEventPrize({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
