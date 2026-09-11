import { describe, expect, it } from 'vitest'
import { resolveRootSemitone } from './scaleEngine'
import { DEFAULT_FRET_COUNT, FRET_MARKERS, getFretSemitone, STANDARD_TUNING } from './fretboard'

describe('STANDARD_TUNING', () => {
  it('resolves to E B G D A E, top-to-bottom row order', () => {
    expect(STANDARD_TUNING).toEqual([
      resolveRootSemitone('E'),
      resolveRootSemitone('B'),
      resolveRootSemitone('G'),
      resolveRootSemitone('D'),
      resolveRootSemitone('A'),
      resolveRootSemitone('E'),
    ])
  })

  it('has 6 strings', () => {
    expect(STANDARD_TUNING).toHaveLength(6)
  })
})

describe('getFretSemitone', () => {
  it('returns the open-string semitone at fret 0', () => {
    expect(getFretSemitone(resolveRootSemitone('E'), 0)).toBe(resolveRootSemitone('E'))
  })

  it('adds one semitone per fret', () => {
    const open = resolveRootSemitone('E')
    expect(getFretSemitone(open, 1)).toBe(resolveRootSemitone('F'))
    expect(getFretSemitone(open, 3)).toBe(resolveRootSemitone('G'))
  })

  it('wraps around the octave at fret 12', () => {
    const open = resolveRootSemitone('A')
    expect(getFretSemitone(open, 12)).toBe(open)
  })
})

describe('DEFAULT_FRET_COUNT / FRET_MARKERS', () => {
  it('covers one full octave', () => {
    expect(DEFAULT_FRET_COUNT).toBe(12)
  })

  it('marks frets 3, 5, 7, 9, 12', () => {
    expect(FRET_MARKERS).toEqual([3, 5, 7, 9, 12])
  })
})
