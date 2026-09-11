import { describe, expect, it } from 'vitest'
import { groupByAdjacent } from './groupByAdjacent'

describe('groupByAdjacent', () => {
  it('merges consecutive items with the same group into one section', () => {
    const items = [1, 1, 2, 2, 2, 1, 3]
    const sections = groupByAdjacent(items, (item) => item)
    expect(sections).toEqual([
      { group: 1, items: [1, 1] },
      { group: 2, items: [2, 2, 2] },
      { group: 1, items: [1] },
      { group: 3, items: [3] },
    ])
  })

  it('returns an empty array for an empty input', () => {
    expect(groupByAdjacent([], (item) => item)).toEqual([])
  })

  it('accounts for every item exactly once, in the original order', () => {
    const items = ['a', 'b', 'c', 'd']
    const sections = groupByAdjacent(items, (item) => item.charCodeAt(0) % 2)
    expect(sections.flatMap((section) => section.items)).toEqual(items)
  })
})
