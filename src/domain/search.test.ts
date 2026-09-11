import { describe, expect, it } from 'vitest'
import {
  findScalesContainingSemitones,
  findScalesExactlyMatchingSemitones,
} from './search'
import { getScaleById } from './scales'

describe('findScalesContainingSemitones', () => {
  it('returns an empty array when nothing is selected', () => {
    expect(findScalesContainingSemitones([])).toEqual([])
  })

  it('finds every scale containing a minor third and diminished fifth (Locrian and friends)', () => {
    const results = findScalesContainingSemitones([3, 6])
    const ids = results.map((scale) => scale.id)
    expect(ids).toContain('locrian')
    expect(ids).toContain('diminished')
    expect(ids).not.toContain('ionian')
  })

  it('narrows the result set as more semitones are selected', () => {
    const broad = findScalesContainingSemitones([4])
    const narrow = findScalesContainingSemitones([4, 7, 11])
    expect(narrow.length).toBeLessThanOrEqual(broad.length)
    expect(narrow.map((scale) => scale.id)).toContain('ionian')
  })
})

describe('findScalesExactlyMatchingSemitones', () => {
  it('returns an empty array when nothing is selected', () => {
    expect(findScalesExactlyMatchingSemitones([])).toEqual([])
  })

  it('matches only the scale whose semitone set is exactly the selection', () => {
    const dorian = getScaleById('dorian')!
    const results = findScalesExactlyMatchingSemitones(dorian.degrees)
    expect(results.map((scale) => scale.id)).toEqual(['dorian'])
  })

  it('does not match a scale that merely contains the selection as a subset', () => {
    const results = findScalesExactlyMatchingSemitones([0, 4, 7])
    expect(results).toEqual([])
  })
})
