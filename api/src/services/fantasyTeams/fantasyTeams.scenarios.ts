import type { Prisma, FantasyTeam } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FantasyTeamCreateArgs>({
  fantasyTeam: {
    one: {
      data: {
        fantasyTeamWagerId: 'String',
        updatedAt: '2023-11-04T20:57:05.902Z',
        owner: {
          create: {
            email: 'String8669627',
            updatedAt: '2023-11-04T20:57:05.902Z',
          },
        },
      },
    },
    two: {
      data: {
        fantasyTeamWagerId: 'String',
        updatedAt: '2023-11-04T20:57:05.902Z',
        owner: {
          create: {
            email: 'String1953984',
            updatedAt: '2023-11-04T20:57:05.902Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<FantasyTeam, 'fantasyTeam'>
