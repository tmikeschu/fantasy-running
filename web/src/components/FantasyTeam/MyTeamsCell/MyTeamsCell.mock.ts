import { faker } from '@faker-js/faker'
import { MyTeamsQuery } from 'types/graphql'

export const standard = (): MyTeamsQuery => {
  return {
    fantasyTeams: Array.from({ length: 2 }, (_, teamNo) => ({
      id: faker.string.uuid(),
      teamMembers: Array.from({ length: 14 }, (_, i) => ({
        id: faker.string.uuid(),
        pickNumber: Math.floor(i / 2) + 1,
        runner: {
          runner: {
            genderDivision: i % 2 === 0 ? 'women' : 'men',
            name: faker.person.fullName(),
          },
        },
      })),

      fantasyEvent: {
        event: {
          name: `USA OTQ 2024 ${teamNo}`,
        },
      },
    })),
  }
}
