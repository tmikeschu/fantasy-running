import type { EventRunner } from '@prisma/client'

import {
  eventRunners,
  eventRunner,
  createEventRunner,
  updateEventRunner,
  deleteEventRunner,
} from './eventRunners'
import type { StandardScenario } from './eventRunners.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('eventRunners', () => {
  scenario('returns all eventRunners', async (scenario: StandardScenario) => {
    const result = await eventRunners()

    expect(result.length).toEqual(Object.keys(scenario.eventRunner).length)
  })

  scenario(
    'returns a single eventRunner',
    async (scenario: StandardScenario) => {
      const result = await eventRunner({ id: scenario.eventRunner.one.id })

      expect(result).toEqual(scenario.eventRunner.one)
    }
  )

  scenario('creates a eventRunner', async (scenario: StandardScenario) => {
    const result = await createEventRunner({
      input: {
        eventId: scenario.eventRunner.two.eventId,
        runnerId: scenario.eventRunner.two.runnerId,
        seed: 5687149,
        updatedAt: '2023-11-04T20:56:31.426Z',
      },
    })

    expect(result.eventId).toEqual(scenario.eventRunner.two.eventId)
    expect(result.runnerId).toEqual(scenario.eventRunner.two.runnerId)
    expect(result.seed).toEqual(5687149)
    expect(result.updatedAt).toEqual(new Date('2023-11-04T20:56:31.426Z'))
  })

  scenario('updates a eventRunner', async (scenario: StandardScenario) => {
    const original = (await eventRunner({
      id: scenario.eventRunner.one.id,
    })) as EventRunner
    const result = await updateEventRunner({
      id: original.id,
      input: { seed: 7735970 },
    })

    expect(result.seed).toEqual(7735970)
  })

  scenario('deletes a eventRunner', async (scenario: StandardScenario) => {
    const original = (await deleteEventRunner({
      id: scenario.eventRunner.one.id,
    })) as EventRunner
    const result = await eventRunner({ id: original.id })

    expect(result).toEqual(null)
  })
})
