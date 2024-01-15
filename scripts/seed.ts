import { db } from 'api/src/lib/db'

import { MutationcreateFantasyTeamRuleArgs } from '$web/types/graphql'

export default async () => {
  try {
    if (process.env.ADMIN_USER_EXTERNAL_ID) {
      await db.user.upsert({
        where: { externalId: process.env.ADMIN_USER_EXTERNAL_ID },
        update: {},
        create: {
          externalId: process.env.ADMIN_USER_EXTERNAL_ID,
          roles: ['ADMIN'],
          email: process.env.ADMIN_USER_EMAIL,
          avatarUrl:
            'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yWGpxRTB5R0J6cUVOS0lNWkE3MnpSeENTbnYiLCJyaWQiOiJ1c2VyXzJYanI0SXBBMkR4VG9LVlBGaXBOSjRCS3BxTiIsImluaXRpYWxzIjoiTVMifQ',
        },
      })
    }

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
    const fantasyEvent = await db.fantasyEvent.create({
      data: {
        eventId: event.id,
        teamSize: 7,
        teamCount: 2,
        rules: {
          connect: dbRules.map((rule) => ({ id: rule.id })),
        },
      },
    })

    const owner = await db.user.findFirst()

    const runnersMen = await db.eventRunner.findMany({
      include: { runner: true },
      where: { runner: { genderDivision: 'men' } },
      orderBy: { seed: 'asc' },
    })

    const runnersWomen = await db.eventRunner.findMany({
      include: { runner: true },
      where: { runner: { genderDivision: 'women' } },
      orderBy: { seed: 'asc' },
    })
    const allRunners = [...runnersMen, ...runnersWomen]
    const teamPicks = [
      [1, 2, 3, 21, 22, 51, 52],
      [1, 4, 5, 23, 24, 53, 54],
      [2, 1, 3, 21, 24, 51, 55],
    ]
    const teamMembers = teamPicks.map((picks) =>
      allRunners
        .filter((r) => picks.includes(r.seed))
        .map((r, i) => ({
          eventRunnerId: r.id,
          pickNumber: i + 1,
        }))
    )
    await Promise.all(
      teamMembers.map((tm) =>
        db.fantasyTeam.create({
          data: {
            name: 'Team 1',
            fantasyEvent: { connect: { id: fantasyEvent.id } },
            owner: { connect: { id: owner.id } },
            wager: { create: { wager: 0 } },
            teamMembers: {
              createMany: {
                data: tm,
              },
            },
          },
        })
      )
    )
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
