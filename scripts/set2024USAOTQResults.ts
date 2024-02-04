import { db } from 'api/src/lib/db'

import { results } from './2024USAOTQResults'

export default async () => {
  const missingRunners: string[] = []

  for (const result of Object.values(results).flat()) {
    const [name, time] = result

    const [runner, ...rest] = await db.eventRunner.findMany({
      where: {
        runner: { name },
        event: { name: '2024 USA OTQ' },
      },
    })

    if (!runner || rest.length > 0) {
      missingRunners.push(name)
      continue
    }

    await db.eventRunnerResult.upsert({
      where: { eventRunnerId: runner.id },
      create: {
        eventRunnerId: runner.id,
        time,
      },
      update: {},
    })
  }

  console.log('Missing runners:', missingRunners)
}
