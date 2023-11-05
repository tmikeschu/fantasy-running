import { db } from 'api/src/lib/db'

const apifyDatasetIds = {
  men: ['rtuJFUse1BDbvE1s1', 'oGmBkxjFOhJ1yYo5i'],
  women: ['8RxmjxDnFajiV4n3E', 'kiQp692ZrTNHv6hZq'],
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

  const event = await db.event.upsert({
    where: { name: '2024 USA OTQ' },
    update: {},
    create: {
      name: '2024 USA OTQ',
      date: new Date('2024-02-03'),
      location: 'Orlando, FL',
    },
  })

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
