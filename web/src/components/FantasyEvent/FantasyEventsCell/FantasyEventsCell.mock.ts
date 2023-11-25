import { faker } from '@faker-js/faker'
import { FantasyEventsQuery } from 'types/graphql'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */): FantasyEventsQuery => ({
  fantasyEvents: Array.from({ length: 3 }, () => ({
    id: faker.string.uuid(),
    event: { name: faker.lorem.words(2) },
  })),
})
