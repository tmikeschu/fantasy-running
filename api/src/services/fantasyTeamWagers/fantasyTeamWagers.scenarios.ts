import type { Prisma, FantasyTeamWager } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FantasyTeamWagerCreateArgs>({
  fantasyTeamWager: {
    one: {
      data: {
        wager: 7286705.04571298,
        updatedAt: '2023-11-04T21:13:53.951Z',
        fantasyTeam: {
          create: {
            fantasyTeamWagerId: 'String',
            updatedAt: '2023-11-04T21:13:53.951Z',
            owner: {
              create: {
                email: 'String6083002',
                updatedAt: '2023-11-04T21:13:53.951Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        wager: 2977807.603410354,
        updatedAt: '2023-11-04T21:13:53.951Z',
        fantasyTeam: {
          create: {
            fantasyTeamWagerId: 'String',
            updatedAt: '2023-11-04T21:13:53.951Z',
            owner: {
              create: {
                email: 'String229592',
                updatedAt: '2023-11-04T21:13:53.951Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  FantasyTeamWager,
  'fantasyTeamWager'
>
