import type { EventRunnerResult } from '@prisma/client'

import {
  eventRunnerResults,
  eventRunnerResult,
  createEventRunnerResult,
  updateEventRunnerResult,
  deleteEventRunnerResult,
} from './eventRunnerResults'
import type { StandardScenario } from './eventRunnerResults.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('eventRunnerResults', () => {
  scenario(
    'returns all eventRunnerResults',
    async (scenario: StandardScenario) => {
      const result = await eventRunnerResults()

      expect(result.length).toEqual(
        Object.keys(scenario.eventRunnerResult).length
      )
    }
  )

  scenario(
    'returns a single eventRunnerResult',
    async (scenario: StandardScenario) => {
      const result = await eventRunnerResult({
        id: scenario.eventRunnerResult.one.id,
      })

      expect(result).toEqual(scenario.eventRunnerResult.one)
    }
  )

  scenario(
    'creates a eventRunnerResult',
    async (scenario: StandardScenario) => {
      const result = await createEventRunnerResult({
        input: {
          eventRunnerId: scenario.eventRunnerResult.two.eventRunnerId,
          time: 'String',
          updatedAt: '2024-02-04T00:45:45.309Z',
        },
      })

      expect(result.eventRunnerId).toEqual(
        scenario.eventRunnerResult.two.eventRunnerId
      )
      expect(result.time).toEqual('String')
      expect(result.updatedAt).toEqual(new Date('2024-02-04T00:45:45.309Z'))
    }
  )

  scenario(
    'updates a eventRunnerResult',
    async (scenario: StandardScenario) => {
      const original = (await eventRunnerResult({
        id: scenario.eventRunnerResult.one.id,
      })) as EventRunnerResult
      const result = await updateEventRunnerResult({
        id: original.id,
        input: { time: 'String2' },
      })

      expect(result.time).toEqual('String2')
    }
  )

  scenario(
    'deletes a eventRunnerResult',
    async (scenario: StandardScenario) => {
      const original = (await deleteEventRunnerResult({
        id: scenario.eventRunnerResult.one.id,
      })) as EventRunnerResult
      const result = await eventRunnerResult({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
