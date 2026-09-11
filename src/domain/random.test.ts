import { describe, expect, it } from 'vitest'
import { pickDistinctRandom, pickRandom, pickRandomExcluding, shuffle } from './random'

describe('pickRandom', () => {
  it('throws on an empty array', () => {
    expect(() => pickRandom([])).toThrow(RangeError)
  })

  it('returns the only item when given a single-item array', () => {
    expect(pickRandom(['a'])).toBe('a')
  })

  it('always returns an item from the input array', () => {
    const items = [1, 2, 3, 4, 5]
    for (let i = 0; i < 50; i++) {
      expect(items).toContain(pickRandom(items))
    }
  })
})

describe('pickRandomExcluding', () => {
  it('throws on an empty array', () => {
    expect(() => pickRandomExcluding([], 'a')).toThrow(RangeError)
  })

  it('returns the only item when given a single-item array, even if excluded', () => {
    expect(pickRandomExcluding(['a'], 'a')).toBe('a')
  })

  it('never returns the excluded item when alternatives exist', () => {
    const items = [1, 2]
    for (let i = 0; i < 50; i++) {
      expect(pickRandomExcluding(items, 1)).toBe(2)
    }
  })
})

describe('pickDistinctRandom', () => {
  it('throws when count exceeds the input length', () => {
    expect(() => pickDistinctRandom([1, 2], 3)).toThrow(RangeError)
  })

  it('returns the requested count with no duplicates', () => {
    const items = [1, 2, 3, 4, 5, 6]
    const picked = pickDistinctRandom(items, 4)
    expect(picked).toHaveLength(4)
    expect(new Set(picked).size).toBe(4)
    for (const item of picked) {
      expect(items).toContain(item)
    }
  })

  it('returns an empty array when count is 0', () => {
    expect(pickDistinctRandom([1, 2, 3], 0)).toEqual([])
  })
})

describe('shuffle', () => {
  it('returns an array with the same items, in some order', () => {
    const items = [1, 2, 3, 4, 5]
    const shuffled = shuffle(items)
    expect(shuffled).toHaveLength(items.length)
    expect([...shuffled].sort()).toEqual([...items].sort())
  })

  it('does not mutate the input array', () => {
    const items = [1, 2, 3]
    const copy = [...items]
    shuffle(items)
    expect(items).toEqual(copy)
  })
})
