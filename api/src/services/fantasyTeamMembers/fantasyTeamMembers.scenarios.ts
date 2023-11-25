import type { Prisma, FantasyTeamMember } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FantasyTeamMemberCreateArgs>({
  fantasyTeamMember: {
    one: {
      data: {
        updatedAt: '2023-11-24T09:17:37.952Z',
        pickNumber: 2773524,
        fantasyTeam: {
          create: {
            updatedAt: '2023-11-24T09:17:37.952Z',
            owner: {
              create: {
                externalId: 'String4213918',
                email: 'String8927744',
                updatedAt: '2023-11-24T09:17:37.952Z',
              },
            },
            wager: {
              create: {
                wager: 6989231.364902762,
                updatedAt: '2023-11-24T09:17:37.952Z',
                venmoHandle: 'String',
              },
            },
          },
        },
        runner: {
          create: {
            seed: 4190495,
            updatedAt: '2023-11-24T09:17:37.952Z',
            event: {
              create: {
                name: 'String2568304',
                date: '2023-11-24T09:17:37.952Z',
                location: 'String',
                updatedAt: '2023-11-24T09:17:37.952Z',
              },
            },
            runner: {
              create: {
                name: 'String',
                genderDivision: 'String',
                updatedAt: '2023-11-24T09:17:37.952Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-11-24T09:17:37.952Z',
        pickNumber: 8781380,
        fantasyTeam: {
          create: {
            updatedAt: '2023-11-24T09:17:37.952Z',
            owner: {
              create: {
                externalId: 'String7874742',
                email: 'String428278',
                updatedAt: '2023-11-24T09:17:37.952Z',
              },
            },
            wager: {
              create: {
                wager: 1093807.410193468,
                updatedAt: '2023-11-24T09:17:37.952Z',
                venmoHandle: 'String',
              },
            },
          },
        },
        runner: {
          create: {
            seed: 158704,
            updatedAt: '2023-11-24T09:17:37.952Z',
            event: {
              create: {
                name: 'String2624002',
                date: '2023-11-24T09:17:37.952Z',
                location: 'String',
                updatedAt: '2023-11-24T09:17:37.952Z',
              },
            },
            runner: {
              create: {
                name: 'String',
                genderDivision: 'String',
                updatedAt: '2023-11-24T09:17:37.952Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  FantasyTeamMember,
  'fantasyTeamMember'
>
