import { describe, expect, it } from 'vitest'
import {
  CHORDS,
  chordExactlyMatchesSemitones,
  chordFitsSemitones,
  getChordById,
  getChordsFittingScale,
} from './chords'
import { getScaleById } from './scales'

describe('CHORDS', () => {
  it('has 39 chords, matching resources/CHORDS_INTERVAL.pdf page 2 (27A)', () => {
    expect(CHORDS).toHaveLength(39)
  })

  it('has unique ids', () => {
    const ids = CHORDS.map((chord) => chord.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has unique, non-empty shorthands', () => {
    const shorthands = CHORDS.map((chord) => chord.shorthand)
    expect(new Set(shorthands).size).toBe(shorthands.length)
    for (const shorthand of shorthands) {
      expect(shorthand.length).toBeGreaterThan(0)
    }
  })

  it('every semitone is a pitch class within one octave and includes the root', () => {
    for (const chord of CHORDS) {
      expect(chord.semitones).toContain(0)
      for (const semitone of chord.semitones) {
        expect(semitone).toBeGreaterThanOrEqual(0)
        expect(semitone).toBeLessThanOrEqual(11)
      }
    }
  })

  it('matches known formulas for representative chords from page 27A', () => {
    expect(getChordById('major')?.semitones).toEqual([0, 4, 7])
    expect(getChordById('minor')?.semitones).toEqual([0, 3, 7])
    expect(getChordById('augmented')?.semitones).toEqual([0, 4, 8])
    expect(getChordById('diminished-triad')?.semitones).toEqual([0, 3, 6])
    expect(getChordById('power-chord')?.semitones).toEqual([0, 7])
    expect(getChordById('diminished-7')?.semitones).toEqual([0, 3, 6, 9])
    expect(getChordById('dominant-7')?.semitones).toEqual([0, 4, 7, 10])
    expect(getChordById('minor-seven-flat-five')?.semitones).toEqual([0, 3, 6, 10])
    expect(getChordById('thirteen-flat-five-flat-nine')?.semitones).toEqual([
      0, 1, 4, 5, 6, 9, 10,
    ])
  })

  it('extended chords (9/11/13) fold their upper extensions into the same octave as simple intervals', () => {
    expect(getChordById('dominant-9')?.semitones).toContain(2)
    expect(getChordById('dominant-11')?.semitones).toContain(5)
    expect(getChordById('dominant-13')?.semitones).toContain(9)
  })
})

describe('getChordById', () => {
  it('returns undefined for an unknown id', () => {
    expect(getChordById('not-a-real-chord')).toBeUndefined()
  })
})

describe('chordFitsSemitones', () => {
  it('only fits scales that contain every one of the chord tones', () => {
    const ionian = getScaleById('ionian')!
    const dorian = getScaleById('dorian')!
    const major = getChordById('major')!
    expect(chordFitsSemitones(major, ionian.degrees)).toBe(true)
    expect(chordFitsSemitones(major, dorian.degrees)).toBe(false)
  })

  it('fits a minor 7 chord onto Dorian (which has no natural 3)', () => {
    const dorian = getScaleById('dorian')!
    const minor7 = getChordById('minor-7')!
    expect(chordFitsSemitones(minor7, dorian.degrees)).toBe(true)
  })

  it('does not fit a chord whose tones are only partially present', () => {
    const ionian = getScaleById('ionian')!
    const minor = getChordById('minor')!
    expect(chordFitsSemitones(minor, ionian.degrees)).toBe(false)
  })
})

describe('chordExactlyMatchesSemitones', () => {
  it('matches when the answer set is exactly the chord tones', () => {
    const major = getChordById('major')!
    expect(chordExactlyMatchesSemitones(major, [0, 4, 7])).toBe(true)
    expect(chordExactlyMatchesSemitones(major, [7, 0, 4])).toBe(true)
  })

  it('does not match a superset or subset of the chord tones', () => {
    const major = getChordById('major')!
    expect(chordExactlyMatchesSemitones(major, [0, 4, 7, 11])).toBe(false)
    expect(chordExactlyMatchesSemitones(major, [0, 4])).toBe(false)
  })

  it('does not match a different chord with the same tone count', () => {
    const major = getChordById('major')!
    expect(chordExactlyMatchesSemitones(major, [0, 3, 7])).toBe(false)
  })
})

describe('getChordsFittingScale', () => {
  it('returns only chords fully contained in the scale', () => {
    const ionian = getScaleById('ionian')!
    const fitting = getChordsFittingScale(ionian)
    expect(fitting.length).toBeGreaterThan(0)
    for (const chord of fitting) {
      expect(chordFitsSemitones(chord, ionian.degrees)).toBe(true)
    }
    expect(fitting.some((chord) => chord.id === 'major')).toBe(true)
  })

  it('excludes chords that do not fully fit', () => {
    const dorian = getScaleById('dorian')!
    const fitting = getChordsFittingScale(dorian)
    expect(fitting.some((chord) => chord.id === 'major')).toBe(false)
  })
})
