import type { Prisma, FantasyEventPrize } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FantasyEventPrizeCreateArgs>({
  fantasyEventPrize: {
    one: {
      data: {
        name: 'String',
        description: 'String',
        rank: 7881995,
        fantasyEvent: {
          create: {
            teamSize: 4461753,
            updatedAt: '2024-01-07T00:08:08.139Z',
            event: {
              create: {
                name: 'String8083475',
                date: '2024-01-07T00:08:08.139Z',
                location: 'String',
                updatedAt: '2024-01-07T00:08:08.139Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        description: 'String',
        rank: 8083559,
        fantasyEvent: {
          create: {
            teamSize: 954380,
            updatedAt: '2024-01-07T00:08:08.139Z',
            event: {
              create: {
                name: 'String6540711',
                date: '2024-01-07T00:08:08.139Z',
                location: 'String',
                updatedAt: '2024-01-07T00:08:08.139Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  FantasyEventPrize,
  'fantasyEventPrize'
>
