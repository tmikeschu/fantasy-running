import { faker } from '@faker-js/faker'

import { CurrentUser } from 'src/auth'

export const generateCurrentUser = (
  currentUser?: Partial<CurrentUser>
): CurrentUser => ({
  id: faker.string.uuid(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.past().toISOString(),
  email: faker.internet.email(),
  avatarUrl: faker.image.url(),
  name: faker.person.fullName(),
  roles: ['USER'],
  ...currentUser,
})
