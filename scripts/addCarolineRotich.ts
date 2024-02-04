import { db } from 'api/src/lib/db'

export default async () => {
  const runner = await db.runner.create({
    data: {
      name: 'Caroline Rotich',
      genderDivision: 'women',
    },
  })
  const event = await db.event.findUnique({ where: { name: '2024 USA OTQ' } })

  const eventRunner = await db.eventRunner.create({
    data: {
      seed: 174,
      eventId: event.id,
      runnerId: runner.id,
    },
  })

  await db.eventRunnerResult.create({
    data: {
      eventRunnerId: eventRunner.id,
      time: '02:26:10',
    },
  })
}
