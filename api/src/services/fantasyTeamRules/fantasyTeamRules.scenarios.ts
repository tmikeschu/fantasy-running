import type { Prisma, FantasyTeamRule } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FantasyTeamRuleCreateArgs>({
  fantasyTeamRule: {
    one: {
      data: {
        pickNumberFrom: 9617276,
        pickNumberTo: 7697403,
        rankMin: 7624545,
        rankMax: 5803107,
        updatedAt: '2023-11-04T21:07:47.823Z',
      },
    },
    two: {
      data: {
        pickNumberFrom: 8561661,
        pickNumberTo: 6935910,
        rankMin: 9701222,
        rankMax: 3869102,
        updatedAt: '2023-11-04T21:07:47.823Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<FantasyTeamRule, 'fantasyTeamRule'>
