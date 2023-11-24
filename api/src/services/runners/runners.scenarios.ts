import type { Prisma, Runner } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RunnerCreateArgs>({
  runner: {
    one: { data: { name: 'String', updatedAt: '2023-11-04T20:56:16.283Z' } },
    two: { data: { name: 'String', updatedAt: '2023-11-04T20:56:16.283Z' } },
  },
})

export type StandardScenario = ScenarioData<Runner, 'runner'>
