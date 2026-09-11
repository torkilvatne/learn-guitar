import { describe, expect, it } from 'vitest'
import { getScaleQuality } from './quality'
import { getScaleById } from './scales'

describe('getScaleQuality', () => {
  it('classifies each major-diatonic mode correctly', () => {
    expect(getScaleQuality(getScaleById('ionian')!)).toBe('major')
    expect(getScaleQuality(getScaleById('dorian')!)).toBe('minor')
    expect(getScaleQuality(getScaleById('phrygian')!)).toBe('minor')
    expect(getScaleQuality(getScaleById('lydian')!)).toBe('major')
    expect(getScaleQuality(getScaleById('mixolydian')!)).toBe('major')
    expect(getScaleQuality(getScaleById('aeolian')!)).toBe('minor')
    expect(getScaleQuality(getScaleById('locrian')!)).toBe('half-diminished')
  })

  it('classifies the symmetrical scales by their embedded triad', () => {
    expect(getScaleQuality(getScaleById('whole-tone')!)).toBe('augmented')
    expect(getScaleQuality(getScaleById('diminished')!)).toBe('diminished')
  })

  it('classifies the pentatonic and other minor-family scales', () => {
    expect(getScaleQuality(getScaleById('major-pentatonic')!)).toBe('major')
    expect(getScaleQuality(getScaleById('minor-pentatonic')!)).toBe('minor')
    expect(getScaleQuality(getScaleById('melodic-minor')!)).toBe('minor')
    expect(getScaleQuality(getScaleById('harmonic-minor')!)).toBe('minor')
  })

  it('returns undefined when a scale has no third, or both thirds, or an ambiguous fifth', () => {
    expect(getScaleQuality(getScaleById('egyptian')!)).toBeUndefined()
    expect(getScaleQuality(getScaleById('ethiopian')!)).toBeUndefined()
    expect(getScaleQuality(getScaleById('persian')!)).toBeUndefined()
  })

  it('returns undefined for Major Locrian rather than mistaking its b6 for an augmented 5th', () => {
    expect(getScaleQuality(getScaleById('major-locrian')!)).toBeUndefined()
  })

  it('still finds a true augmented 5th when nothing else competes for the fifth', () => {
    expect(getScaleQuality(getScaleById('enigmatic')!)).toBe('augmented')
  })

  it('returns undefined for Hungarian Major, since its #2 is indistinguishable from a b3 by semitone alone', () => {
    expect(getScaleQuality(getScaleById('hungarian-major')!)).toBeUndefined()
  })
})
