import { faker } from '@faker-js/faker'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  fantasyEvent: {
    id: faker.string.uuid(),
    teamSize: 5,
    rules: [
      {
        pickNumberFrom: 1,
        pickNumberTo: 1,
        rankMin: 1,
        rankMax: 20,
      },
      {
        pickNumberFrom: 2,
        pickNumberTo: 2,
        rankMin: 21,
        rankMax: 45,
      },
      {
        pickNumberFrom: 3,
        pickNumberTo: 3,
        rankMin: 46,
      },
    ],
    event: {
      eventRunners: Array.from({ length: 100 }, (_, i) => ({
        id: faker.string.uuid(),
        seed: i + 1,

        runner: {
          genderDivision: i % 2 === 0 ? 'men' : 'women',
          name: faker.person.fullName(),
        },
      })),
    },
  },
})
