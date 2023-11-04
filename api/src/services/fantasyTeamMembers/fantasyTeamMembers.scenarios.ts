import type { Prisma, FantasyTeamMember } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FantasyTeamMemberCreateArgs>({
  fantasyTeamMember: {
    one: {
      data: {
        updatedAt: '2023-11-04T21:28:57.787Z',
        fantasyTeam: {
          create: {
            fantasyTeamWagerId: 'String',
            updatedAt: '2023-11-04T21:28:57.787Z',
            owner: {
              create: {
                email: 'String9101359',
                updatedAt: '2023-11-04T21:28:57.788Z',
              },
            },
          },
        },
        runner: {
          create: { name: 'String', updatedAt: '2023-11-04T21:28:57.788Z' },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-11-04T21:28:57.788Z',
        fantasyTeam: {
          create: {
            fantasyTeamWagerId: 'String',
            updatedAt: '2023-11-04T21:28:57.788Z',
            owner: {
              create: {
                email: 'String6848901',
                updatedAt: '2023-11-04T21:28:57.788Z',
              },
            },
          },
        },
        runner: {
          create: { name: 'String', updatedAt: '2023-11-04T21:28:57.788Z' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  FantasyTeamMember,
  'fantasyTeamMember'
>
