import type { FantasyTeamRule } from '@prisma/client'

import {
  fantasyTeamRules,
  fantasyTeamRule,
  createFantasyTeamRule,
  updateFantasyTeamRule,
  deleteFantasyTeamRule,
} from './fantasyTeamRules'
import type { StandardScenario } from './fantasyTeamRules.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('fantasyTeamRules', () => {
  scenario(
    'returns all fantasyTeamRules',
    async (scenario: StandardScenario) => {
      const result = await fantasyTeamRules()

      expect(result.length).toEqual(
        Object.keys(scenario.fantasyTeamRule).length
      )
    }
  )

  scenario(
    'returns a single fantasyTeamRule',
    async (scenario: StandardScenario) => {
      const result = await fantasyTeamRule({
        id: scenario.fantasyTeamRule.one.id,
      })

      expect(result).toEqual(scenario.fantasyTeamRule.one)
    }
  )

  scenario('creates a fantasyTeamRule', async () => {
    const result = await createFantasyTeamRule({
      input: {
        pickNumberFrom: 8225125,
        pickNumberTo: 9722197,
        rankMin: 6570474,
        rankMax: 1065406,
        updatedAt: '2023-11-04T21:07:47.811Z',
      },
    })

    expect(result.pickNumberFrom).toEqual(8225125)
    expect(result.pickNumberTo).toEqual(9722197)
    expect(result.rankMin).toEqual(6570474)
    expect(result.rankMax).toEqual(1065406)
    expect(result.updatedAt).toEqual(new Date('2023-11-04T21:07:47.811Z'))
  })

  scenario('updates a fantasyTeamRule', async (scenario: StandardScenario) => {
    const original = (await fantasyTeamRule({
      id: scenario.fantasyTeamRule.one.id,
    })) as FantasyTeamRule
    const result = await updateFantasyTeamRule({
      id: original.id,
      input: { pickNumberFrom: 7521380 },
    })

    expect(result.pickNumberFrom).toEqual(7521380)
  })

  scenario('deletes a fantasyTeamRule', async (scenario: StandardScenario) => {
    const original = (await deleteFantasyTeamRule({
      id: scenario.fantasyTeamRule.one.id,
    })) as FantasyTeamRule
    const result = await fantasyTeamRule({ id: original.id })

    expect(result).toEqual(null)
  })
})
