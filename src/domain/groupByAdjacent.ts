export interface AdjacentGroup<T, G> {
  group: G
  items: T[]
}

export function groupByAdjacent<T, G>(
  items: T[],
  getGroup: (item: T) => G,
): AdjacentGroup<T, G>[] {
  const sections: AdjacentGroup<T, G>[] = []
  for (const item of items) {
    const group = getGroup(item)
    const last = sections[sections.length - 1]
    if (last && last.group === group) {
      last.items.push(item)
    } else {
      sections.push({ group, items: [item] })
    }
  }
  return sections
}
