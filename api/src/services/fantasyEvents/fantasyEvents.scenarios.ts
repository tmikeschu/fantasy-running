import type { Prisma, FantasyEvent } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FantasyEventCreateArgs>({
  fantasyEvent: {
    one: {
      data: {
        teamSize: 7682317,
        updatedAt: '2023-11-04T20:56:45.425Z',
        event: {
          create: {
            name: 'String',
            date: '2023-11-04T20:56:45.425Z',
            location: 'String',
            updatedAt: '2023-11-04T20:56:45.425Z',
          },
        },
      },
    },
    two: {
      data: {
        teamSize: 119270,
        updatedAt: '2023-11-04T20:56:45.425Z',
        event: {
          create: {
            name: 'String',
            date: '2023-11-04T20:56:45.425Z',
            location: 'String',
            updatedAt: '2023-11-04T20:56:45.425Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<FantasyEvent, 'fantasyEvent'>
