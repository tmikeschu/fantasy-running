import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { email: 'String7314880', updatedAt: '2023-11-04T21:28:44.307Z' },
    },
    two: {
      data: { email: 'String4481345', updatedAt: '2023-11-04T21:28:44.307Z' },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
