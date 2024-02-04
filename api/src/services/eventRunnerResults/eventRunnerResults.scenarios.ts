import type { Prisma, EventRunnerResult } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EventRunnerResultCreateArgs>({
  eventRunnerResult: {
    one: {
      data: {
        time: 'String',
        updatedAt: '2024-02-04T00:45:45.403Z',
        eventRunner: {
          create: {
            seed: 919762,
            updatedAt: '2024-02-04T00:45:45.403Z',
            event: {
              create: {
                name: 'String35735',
                date: '2024-02-04T00:45:45.403Z',
                location: 'String',
                updatedAt: '2024-02-04T00:45:45.403Z',
              },
            },
            runner: {
              create: {
                name: 'String',
                genderDivision: 'String',
                updatedAt: '2024-02-04T00:45:45.403Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        time: 'String',
        updatedAt: '2024-02-04T00:45:45.403Z',
        eventRunner: {
          create: {
            seed: 6933359,
            updatedAt: '2024-02-04T00:45:45.403Z',
            event: {
              create: {
                name: 'String9776760',
                date: '2024-02-04T00:45:45.403Z',
                location: 'String',
                updatedAt: '2024-02-04T00:45:45.403Z',
              },
            },
            runner: {
              create: {
                name: 'String',
                genderDivision: 'String',
                updatedAt: '2024-02-04T00:45:45.403Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  EventRunnerResult,
  'eventRunnerResult'
>
