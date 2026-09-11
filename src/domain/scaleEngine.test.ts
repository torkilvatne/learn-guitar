import { describe, expect, it } from 'vitest'
import { isDualLabel } from './constants'
import {
  getNoteLabelForSemitone,
  getNumberLabelForSemitone,
  mapScaleToGrid,
  resolveRootSemitone,
} from './scaleEngine'
import { getScaleById } from './scales'

describe('mapScaleToGrid', () => {
  it('returns 13 cells, marking gaps where the scale has no degree', () => {
    const dorian = getScaleById('dorian')!
    const grid = mapScaleToGrid(dorian)
    expect(grid).toHaveLength(13)
    expect(grid[1].present).toBe(false)
    expect(grid[2].present).toBe(true)
    expect(grid[3].present).toBe(true)
  })
})

describe('resolveRootSemitone', () => {
  it('resolves natural note names', () => {
    expect(resolveRootSemitone('A')).toBe(0)
    expect(resolveRootSemitone('D')).toBe(5)
  })

  it('resolves both sharp and flat spellings to the same semitone', () => {
    expect(resolveRootSemitone('F#')).toBe(resolveRootSemitone('Gb'))
  })

  it('throws for an unknown note name', () => {
    expect(() => resolveRootSemitone('H')).toThrow(RangeError)
  })
})

describe('getNumberLabelForSemitone', () => {
  it('returns a dual sharp/flat label for any accidental position, regardless of scale', () => {
    expect(getNumberLabelForSemitone(3)).toEqual({ sharp: '2#', flat: '3b' })
    expect(getNumberLabelForSemitone(6)).toEqual({ sharp: '4#', flat: '5b' })
  })

  it('returns a plain label for natural degree positions', () => {
    expect(getNumberLabelForSemitone(0)).toBe('1')
    expect(getNumberLabelForSemitone(7)).toBe('5')
  })
})

describe('getNoteLabelForSemitone', () => {
  it('renders C Ionian as C D E F G A B C, matching resources/slider.png', () => {
    const scale = getScaleById('ionian')!
    const root = resolveRootSemitone('C')
    const notes = scale.degrees.map((semitone) => getNoteLabelForSemitone(semitone, root))
    expect(notes).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'])
  })

  it('renders D Dorian as D E F G A B C D, matching resources/slider.png', () => {
    const scale = getScaleById('dorian')!
    const root = resolveRootSemitone('D')
    const notes = scale.degrees.map((semitone) => getNoteLabelForSemitone(semitone, root))
    expect(notes).toEqual(['D', 'E', 'F', 'G', 'A', 'B', 'C', 'D'])
  })

  it('renders A Harmonic Minor with a G#/Ab dual-labeled 7th degree, matching resources/slider.png', () => {
    const scale = getScaleById('harmonic-minor')!
    const root = resolveRootSemitone('A')
    const notes = scale.degrees.map((semitone) => getNoteLabelForSemitone(semitone, root))
    expect(notes[0]).toBe('A')
    expect(notes[6]).toEqual({ sharp: 'G#', flat: 'Ab' })
    expect(isDualLabel(notes[6])).toBe(true)
    expect(notes[7]).toBe('A')
  })

  it('renders F# Ionian using dual labels, since spelling is chromatic-position-based rather than key-signature-correct', () => {
    const scale = getScaleById('ionian')!
    const root = resolveRootSemitone('F#')
    const notes = scale.degrees.map((semitone) => getNoteLabelForSemitone(semitone, root))
    expect(notes).toEqual([
      { sharp: 'F#', flat: 'Gb' },
      { sharp: 'G#', flat: 'Ab' },
      { sharp: 'A#', flat: 'Bb' },
      'B',
      { sharp: 'C#', flat: 'Db' },
      { sharp: 'D#', flat: 'Eb' },
      'F',
      { sharp: 'F#', flat: 'Gb' },
    ])
  })
})
