import { describe, expect, it } from 'vitest'
import { CHROMATIC_STEPS, isDualLabel, NOTE_STEPS, INTERVALS } from './constants'

describe('CHROMATIC_STEPS', () => {
  it('has 13 columns spanning semitone 0 to 12', () => {
    expect(CHROMATIC_STEPS).toHaveLength(13)
    expect(CHROMATIC_STEPS.map((step) => step.semitone)).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ])
  })

  it('has no accidental between 3-4 and 7-8', () => {
    const three = CHROMATIC_STEPS[4]
    const four = CHROMATIC_STEPS[5]
    const seven = CHROMATIC_STEPS[11]
    const eight = CHROMATIC_STEPS[12]
    expect(three.label).toBe('3')
    expect(four.label).toBe('4')
    expect(seven.label).toBe('7')
    expect(eight.label).toBe('8')
  })

  it('renders accidentals as sharp-over-flat dual labels', () => {
    const step = CHROMATIC_STEPS[1]
    expect(isDualLabel(step.label)).toBe(true)
    expect(step.label).toEqual({ sharp: '1#', flat: '2b' })
  })
})

describe('NOTE_STEPS', () => {
  it('has 12 pitch classes starting at A', () => {
    expect(NOTE_STEPS).toHaveLength(12)
    expect(NOTE_STEPS[0].label).toBe('A')
  })

  it('renders accidentals as sharp-over-flat dual labels', () => {
    const aSharp = NOTE_STEPS[1]
    expect(isDualLabel(aSharp.label)).toBe(true)
    expect(aSharp.label).toEqual({ sharp: 'A#', flat: 'Bb' })
  })

  it('has naturals at A B C D E F G positions', () => {
    const naturals = NOTE_STEPS.filter((step) => !isDualLabel(step.label)).map(
      (step) => step.label,
    )
    expect(naturals).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
  })
})

describe('INTERVALS', () => {
  it('covers every semitone from unison to octave', () => {
    expect(INTERVALS).toHaveLength(13)
    expect(INTERVALS[0].name).toBe('PER UNISON')
    expect(INTERVALS[12].name).toBe('PER OCT')
  })

  it('has dual names for the ambiguous 6 and 8 semitone intervals', () => {
    expect(INTERVALS[6]).toEqual({
      semitones: 6,
      name: 'AUG 4',
      altName: 'DIM 5',
    })
    expect(INTERVALS[8]).toEqual({
      semitones: 8,
      name: 'AUG 5',
      altName: 'MIN 6',
    })
  })
})
