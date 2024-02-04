import { db } from 'api/src/lib/db'

import { results } from './2024USAOTQResults'

export default async () => {
  for (const genderResults of Object.values(results)) {
    let i = 0
    for (const result of genderResults) {
      const [name] = result

      const [runner] = await db.eventRunner.findMany({
        where: {
          runner: { name },
          event: { name: '2024 USA OTQ' },
        },
      })

      await db.eventRunnerResult.update({
        where: { eventRunnerId: runner.id },
        data: {
          points: i + 1,
        },
      })

      i++
    }
  }
}
