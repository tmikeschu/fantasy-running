import type { Prisma, Event } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EventCreateArgs>({
  event: {
    one: {
      data: {
        name: 'String',
        date: '2023-11-04T20:52:58.165Z',
        location: 'String',
        updatedAt: '2023-11-04T20:52:58.165Z',
      },
    },
    two: {
      data: {
        name: 'String',
        date: '2023-11-04T20:52:58.165Z',
        location: 'String',
        updatedAt: '2023-11-04T20:52:58.165Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Event, 'event'>
