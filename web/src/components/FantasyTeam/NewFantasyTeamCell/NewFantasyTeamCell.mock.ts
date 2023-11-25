import { faker } from '@faker-js/faker'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  fantasyEvent: {
    id: faker.string.uuid(),
    teamSize: 7,
    rules: [
      {
        pickNumberFrom: 1,
        pickNumberTo: 3,
        rankMin: 1,
        rankMax: 20,
      },
    ],
    event: {
      eventRunners: [
        {
          id: faker.string.uuid(),
          seed: 1,

          runner: {
            genderDivision: '',
            name: faker.person.fullName(),
          },
        },
      ],
    },
  },
})
