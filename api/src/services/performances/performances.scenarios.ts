import type { Prisma, Performance } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PerformanceCreateArgs>({
  performance: {
    one: {
      data: {
        time: 4427351.295779319,
        updatedAt: '2023-11-04T20:53:45.147Z',
        event: {
          create: {
            name: 'String',
            date: '2023-11-04T20:53:45.147Z',
            location: 'String',
            updatedAt: '2023-11-04T20:53:45.147Z',
          },
        },
        runner: {
          create: { name: 'String', updatedAt: '2023-11-04T20:53:45.147Z' },
        },
      },
    },
    two: {
      data: {
        time: 9507260.29733119,
        updatedAt: '2023-11-04T20:53:45.147Z',
        event: {
          create: {
            name: 'String',
            date: '2023-11-04T20:53:45.147Z',
            location: 'String',
            updatedAt: '2023-11-04T20:53:45.147Z',
          },
        },
        runner: {
          create: { name: 'String', updatedAt: '2023-11-04T20:53:45.147Z' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Performance, 'performance'>
