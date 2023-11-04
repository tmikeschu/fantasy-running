import type { Runner } from '@prisma/client'

import {
  runners,
  runner,
  createRunner,
  updateRunner,
  deleteRunner,
} from './runners'
import type { StandardScenario } from './runners.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('runners', () => {
  scenario('returns all runners', async (scenario: StandardScenario) => {
    const result = await runners()

    expect(result.length).toEqual(Object.keys(scenario.runner).length)
  })

  scenario('returns a single runner', async (scenario: StandardScenario) => {
    const result = await runner({ id: scenario.runner.one.id })

    expect(result).toEqual(scenario.runner.one)
  })

  scenario('creates a runner', async () => {
    const result = await createRunner({
      input: { name: 'String', updatedAt: '2023-11-04T20:56:16.272Z' },
    })

    expect(result.name).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-11-04T20:56:16.272Z'))
  })

  scenario('updates a runner', async (scenario: StandardScenario) => {
    const original = (await runner({ id: scenario.runner.one.id })) as Runner
    const result = await updateRunner({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a runner', async (scenario: StandardScenario) => {
    const original = (await deleteRunner({
      id: scenario.runner.one.id,
    })) as Runner
    const result = await runner({ id: original.id })

    expect(result).toEqual(null)
  })
})
