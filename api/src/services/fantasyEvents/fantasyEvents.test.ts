import type { FantasyEvent } from '@prisma/client'

import {
  fantasyEvents,
  fantasyEvent,
  createFantasyEvent,
  updateFantasyEvent,
  deleteFantasyEvent,
} from './fantasyEvents'
import type { StandardScenario } from './fantasyEvents.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('fantasyEvents', () => {
  scenario('returns all fantasyEvents', async (scenario: StandardScenario) => {
    const result = await fantasyEvents()

    expect(result.length).toEqual(Object.keys(scenario.fantasyEvent).length)
  })

  scenario(
    'returns a single fantasyEvent',
    async (scenario: StandardScenario) => {
      const result = await fantasyEvent({ id: scenario.fantasyEvent.one.id })

      expect(result).toEqual(scenario.fantasyEvent.one)
    }
  )

  scenario('creates a fantasyEvent', async (scenario: StandardScenario) => {
    const result = await createFantasyEvent({
      input: {
        eventId: scenario.fantasyEvent.two.eventId,
        teamSize: 3245961,
        updatedAt: '2023-11-04T20:56:45.395Z',
      },
    })

    expect(result.eventId).toEqual(scenario.fantasyEvent.two.eventId)
    expect(result.teamSize).toEqual(3245961)
    expect(result.updatedAt).toEqual(new Date('2023-11-04T20:56:45.395Z'))
  })

  scenario('updates a fantasyEvent', async (scenario: StandardScenario) => {
    const original = (await fantasyEvent({
      id: scenario.fantasyEvent.one.id,
    })) as FantasyEvent
    const result = await updateFantasyEvent({
      id: original.id,
      input: { teamSize: 9881199 },
    })

    expect(result.teamSize).toEqual(9881199)
  })

  scenario('deletes a fantasyEvent', async (scenario: StandardScenario) => {
    const original = (await deleteFantasyEvent({
      id: scenario.fantasyEvent.one.id,
    })) as FantasyEvent
    const result = await fantasyEvent({ id: original.id })

    expect(result).toEqual(null)
  })
})
