import type { Prisma, FantasyTeamWager } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FantasyTeamWagerCreateArgs>({
  fantasyTeamWager: {
    one: {
      data: {
        wager: 6975558.069876528,
        updatedAt: '2023-11-24T09:31:42.187Z',
      },
    },
    two: {
      data: {
        wager: 3575228.9272817792,
        updatedAt: '2023-11-24T09:31:42.187Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  FantasyTeamWager,
  'fantasyTeamWager'
>
