import type { Prisma, EventRunner } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EventRunnerCreateArgs>({
  eventRunner: {
    one: {
      data: {
        seed: 3311074,
        updatedAt: '2023-11-04T20:56:31.442Z',
        event: {
          create: {
            name: 'String',
            date: '2023-11-04T20:56:31.442Z',
            location: 'String',
            updatedAt: '2023-11-04T20:56:31.442Z',
          },
        },
        runner: {
          create: { name: 'String', updatedAt: '2023-11-04T20:56:31.442Z' },
        },
      },
    },
    two: {
      data: {
        seed: 8026925,
        updatedAt: '2023-11-04T20:56:31.442Z',
        event: {
          create: {
            name: 'String',
            date: '2023-11-04T20:56:31.442Z',
            location: 'String',
            updatedAt: '2023-11-04T20:56:31.442Z',
          },
        },
        runner: {
          create: { name: 'String', updatedAt: '2023-11-04T20:56:31.442Z' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<EventRunner, 'eventRunner'>
