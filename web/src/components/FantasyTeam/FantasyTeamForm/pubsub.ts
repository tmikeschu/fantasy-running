type Event =
  | { type: 'SELECTED'; fieldKey: string }
  | { type: 'AUTO_FOCUS'; fieldKey: string }

const listeners = new Set<(e: Event) => void>()

export const pubsub = {
  subscribe: (cb: (e: Event) => void) => {
    listeners.add(cb)
    return () => {
      listeners.delete(cb)
    }
  },

  broadcast: (event: Event) => {
    listeners.forEach((l) => {
      l(event)
    })
  },

  listenerCount: () => listeners.size,
}
