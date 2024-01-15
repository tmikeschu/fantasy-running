import { db } from 'api/src/lib/db'

const apifyDatasetIds = {
  men: ['6v2m0knz4TvaJPP19', '6yeTIR2HkulibS0ci'],
  women: ['saSutD0KoTHhGtaSL', 'o5tTIYQGdpaNpkBAq'],
}

type ApifyRunner = {
  Name: string
  Time: string
  Race: string
  Location: string
  Date: string
  rank: number
}
export default async () => {
  const runners = (await Promise.all(
    Object.entries(apifyDatasetIds)
      .flatMap(([genderDivision, datasetIds]) =>
        datasetIds.map((datasetId) => [genderDivision, datasetId])
      )
      .flatMap(async ([genderDivision, datasetId]) =>
        fetch(`https://api.apify.com/v2/datasets/${datasetId}/items`)
          .then((r) => r.json())
          .then((items) =>
            items.map((item: ApifyRunner) => ({ ...item, genderDivision }))
          )
      )
  ).then((arrays) => arrays.flat())) as (ApifyRunner & {
    genderDivision: string
  })[]

  const existingEvent = await db.event.findFirst({
    where: { name: '2024 USA OTQ' },
  })

  const newEvent = existingEvent
    ? null
    : await db.event.create({
        data: {
          name: '2024 USA OTQ',
          date: new Date('2024-02-03'),
          location: 'Orlando, FL',
        },
      })

  const event = newEvent ?? existingEvent

  for (const runner of runners) {
    const existing = await db.runner.findFirst({ where: { name: runner.Name } })
    if (existing) {
      continue
    }

    const dbRunner = await db.runner.create({
      data: {
        name: runner.Name,
        genderDivision: runner.genderDivision,
      },
    })

    await db.eventRunner.upsert({
      where: { eventId_runnerId: { runnerId: dbRunner.id, eventId: event.id } },
      update: {},
      create: {
        runnerId: dbRunner.id,
        eventId: event.id,
        seed: runner.rank,
      },
    })
  }
}
