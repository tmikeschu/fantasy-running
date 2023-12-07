import { db } from 'api/src/lib/db'

import { MutationcreateFantasyTeamRuleArgs } from '$web/types/graphql'

export default async () => {
  try {
    const rules: MutationcreateFantasyTeamRuleArgs['input'][] = [
      { pickNumberFrom: 1, pickNumberTo: 3, rankMin: 1, rankMax: 20 },
      { pickNumberFrom: 4, pickNumberTo: 5, rankMin: 21, rankMax: 50 },
      { pickNumberFrom: 6, pickNumberTo: 7, rankMin: 51 },
    ]
    await db.fantasyTeamRule.createMany({
      data: rules,
    })
    const dbRules = await db.fantasyTeamRule.findMany({ take: 3 })
    // depends on sync script from scraped apify data data
    const event = await db.event.findFirst()
    await db.fantasyEvent.create({
      data: {
        eventId: event.id,
        teamSize: 7,
        teamCount: 2,
        rules: {
          connect: dbRules.map((rule) => ({ id: rule.id })),
        },
      },
    })
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
