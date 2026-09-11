export function pickRandom<T>(items: T[]): T {
  if (items.length === 0) {
    throw new RangeError('Cannot pick a random item from an empty array')
  }
  return items[Math.floor(Math.random() * items.length)]
}

export function pickRandomExcluding<T>(items: T[], exclude: T): T {
  if (items.length === 0) {
    throw new RangeError('Cannot pick a random item from an empty array')
  }
  if (items.length === 1) {
    return items[0]
  }
  const candidates = items.filter((item) => item !== exclude)
  return pickRandom(candidates.length > 0 ? candidates : items)
}

export function pickDistinctRandom<T>(items: T[], count: number): T[] {
  if (count > items.length) {
    throw new RangeError(
      `Cannot pick ${count} distinct items from an array of length ${items.length}`,
    )
  }
  return shuffle(items).slice(0, count)
}

export function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
