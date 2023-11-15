import { db } from 'api/src/lib/db'

const apifyDatasets = [
  { id: 'rtuJFUse1BDbvE1s1', genderDivision: 'men', event: 'half' },
  { id: 'oGmBkxjFOhJ1yYo5i', genderDivision: 'men', event: 'full' },
  { id: '8RxmjxDnFajiV4n3E', genderDivision: 'women', event: 'half' },
  { id: 'kiQp692ZrTNHv6hZq', genderDivision: 'women', event: 'full' },
] as const

type ApifyRunner = {
  Name: string
  Time: string
  Race: string
  Location: string
  Date: string
  rank: number
}

const hoursMinutesSecondsToSeconds = (hoursMinutesSeconds: string) => {
  const [hours, minutes, seconds] = hoursMinutesSeconds.split(':').map(Number)
  return hours * 60 * 60 + minutes * 60 + seconds
}

const halfSecondsToFullSeconds = (halfTime: string) => {
  const halfTimeInSeconds = hoursMinutesSecondsToSeconds(halfTime)

  // T2 = T1 x (D2/D1) 1.06 where T1 is the given time, D1 is the given distance, D2 is the distance to predict a time for, and T2 is the calculated time for D2.
  // But we adjust to 1.075 based on Garret's estimation.
  const D1 = 13.1
  const D2 = 26.2
  const T2 = halfTimeInSeconds * (D2 / D1) ** 1.1
  return T2
}

type RunnerWithSeconds = ApifyRunner & {
  seconds: number
  genderDivision: string
  event: 'half' | 'full'
}

export default async () => {
  const runnersByGenderDivision = (
    await Promise.all(
      apifyDatasets.map(async (dataset) =>
        fetch(`https://api.apify.com/v2/datasets/${dataset.id}/items`)
          .then((r) => r.json())
          .then(
            (items) =>
              items.map((item: ApifyRunner) => ({
                ...item,
                seconds:
                  dataset.event === 'half'
                    ? halfSecondsToFullSeconds(item.Time)
                    : hoursMinutesSecondsToSeconds(item.Time),
                genderDivision: dataset.genderDivision,
                event: dataset.event,
              })) as RunnerWithSeconds[]
          )
      )
    ).then((arrays) => arrays.flat())
  ).reduce(
    (acc, runner) => {
      acc[runner.genderDivision].push(runner)
      return acc
    },
    { men: [], women: [] } as {
      men: RunnerWithSeconds[]
      women: RunnerWithSeconds[]
    }
  )

  const sortedWithSeed = Object.values(runnersByGenderDivision)
    .map((runners) => {
      return runners
        .slice()
        .sort((a, b) => {
          return a.seconds - b.seconds
        })
        .map((r, i) => ({ ...r, seed: i + 1 }))
    })
    .flat()

  const event = await db.event.findFirst({ where: { name: '2024 USA OTQ' } })

  for (const runner of sortedWithSeed) {
    const existing = await db.runner.findFirst({ where: { name: runner.Name } })
    if (!existing) {
      console.log('No existing runner found for', runner.Name)
      throw new Error('No existing runner found')
    }

    await db.eventRunner.update({
      where: { eventId_runnerId: { runnerId: existing.id, eventId: event.id } },
      data: {
        seed: runner.seed,
        ...(runner.event === 'half'
          ? { seedNotes: 'Time derived by 1/2 marathon time * 2.2' }
          : {}),
      },
    })
  }
}
