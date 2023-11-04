import type { Performance } from '@prisma/client'

import {
  performances,
  performance,
  createPerformance,
  updatePerformance,
  deletePerformance,
} from './performances'
import type { StandardScenario } from './performances.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('performances', () => {
  scenario('returns all performances', async (scenario: StandardScenario) => {
    const result = await performances()

    expect(result.length).toEqual(Object.keys(scenario.performance).length)
  })

  scenario(
    'returns a single performance',
    async (scenario: StandardScenario) => {
      const result = await performance({ id: scenario.performance.one.id })

      expect(result).toEqual(scenario.performance.one)
    }
  )

  scenario('creates a performance', async (scenario: StandardScenario) => {
    const result = await createPerformance({
      input: {
        time: 6530650.498184891,
        eventId: scenario.performance.two.eventId,
        runnerId: scenario.performance.two.runnerId,
        updatedAt: '2023-11-04T20:53:45.135Z',
      },
    })

    expect(result.time).toEqual(6530650.498184891)
    expect(result.eventId).toEqual(scenario.performance.two.eventId)
    expect(result.runnerId).toEqual(scenario.performance.two.runnerId)
    expect(result.updatedAt).toEqual(new Date('2023-11-04T20:53:45.135Z'))
  })

  scenario('updates a performance', async (scenario: StandardScenario) => {
    const original = (await performance({
      id: scenario.performance.one.id,
    })) as Performance
    const result = await updatePerformance({
      id: original.id,
      input: { time: 1342423.9210555335 },
    })

    expect(result.time).toEqual(1342423.9210555335)
  })

  scenario('deletes a performance', async (scenario: StandardScenario) => {
    const original = (await deletePerformance({
      id: scenario.performance.one.id,
    })) as Performance
    const result = await performance({ id: original.id })

    expect(result).toEqual(null)
  })
})
