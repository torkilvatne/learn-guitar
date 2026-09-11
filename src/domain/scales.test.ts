import { describe, expect, it } from 'vitest'
import { getScaleById, SCALES } from './scales'

describe('SCALES', () => {
  it('has 39 scales (13 must-know + 26 exotic, after folding duplicate-degree scales into altNames)', () => {
    expect(SCALES).toHaveLength(39)
  })

  it('has unique ids', () => {
    const ids = SCALES.map((scale) => scale.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every scale starts on the root and ends on the octave', () => {
    for (const scale of SCALES) {
      expect(scale.degrees[0]).toBe(0)
      expect(scale.degrees[scale.degrees.length - 1]).toBe(12)
    }
  })

  it('every degree semitone is within the 0-12 grid and strictly ascending', () => {
    for (const scale of SCALES) {
      for (const semitone of scale.degrees) {
        expect(semitone).toBeGreaterThanOrEqual(0)
        expect(semitone).toBeLessThanOrEqual(12)
      }
      for (let i = 1; i < scale.degrees.length; i++) {
        expect(scale.degrees[i]).toBeGreaterThan(scale.degrees[i - 1])
      }
    }
  })

  it('contains the 7 major-diatonic modes by id', () => {
    const diatonicIds = [
      'ionian',
      'dorian',
      'phrygian',
      'lydian',
      'mixolydian',
      'aeolian',
      'locrian',
    ]
    for (const id of diatonicIds) {
      expect(getScaleById(id)).toBeDefined()
    }
  })

  it('matches known formulas for representative must-know scales', () => {
    expect(getScaleById('ionian')?.degrees).toEqual([0, 2, 4, 5, 7, 9, 11, 12])
    expect(getScaleById('dorian')?.degrees).toEqual([0, 2, 3, 5, 7, 9, 10, 12])
    expect(getScaleById('harmonic-minor')?.degrees).toEqual([0, 2, 3, 5, 7, 8, 11, 12])
    expect(getScaleById('diminished')?.degrees).toEqual([0, 2, 3, 5, 6, 8, 9, 11, 12])
  })

  it('matches known formulas for representative exotic scales', () => {
    expect(getScaleById('major-phrygian')?.degrees).toEqual([0, 1, 4, 5, 7, 8, 10, 12])
    expect(getScaleById('egyptian')?.degrees).toEqual([0, 2, 5, 7, 10, 12])
    expect(getScaleById('harmonic-major')?.degrees).toEqual([0, 2, 4, 5, 7, 8, 11, 12])
  })

  it('has unique degree sets, since a scale sharing another scale degree set should be an altName instead', () => {
    const degreeKeys = SCALES.map((scale) => scale.degrees.join(','))
    expect(new Set(degreeKeys).size).toBe(degreeKeys.length)
  })

  it('folds scales that shared another scale degree set into that scale altNames', () => {
    expect(getScaleById('ionian')?.altNames).toContain('Major Diatonic')
    expect(getScaleById('aeolian')?.altNames).toContain('Natural Minor')
    expect(getScaleById('melodic-minor')?.altNames).toContain('Hawaiian')
    expect(getScaleById('harmonic-minor')?.altNames).toContain('Mohammedan')
    expect(getScaleById('major-pentatonic')?.altNames).toEqual(
      expect.arrayContaining(['Mongolian', 'Chinese']),
    )
    expect(getScaleById('double-harmonic-major')?.altNames).toEqual(
      expect.arrayContaining(['Gypsy', 'Byzantine']),
    )
    expect(getScaleById('hungarian-minor')?.altNames).toContain('Algerian')
    expect(getScaleById('kumoi')?.altNames).toContain('Japanese')
    expect(getScaleById('major-phrygian')?.altNames).toEqual(
      expect.arrayContaining(['Jewish', 'Spanish']),
    )
    expect(getScaleById('major-locrian')?.altNames).toContain('Arabian')
  })

  it('no longer has its own entry for scales that were folded into an altName', () => {
    const foldedIds = [
      'major-diatonic',
      'natural-minor',
      'hawaiian',
      'mohammedan',
      'mongolian',
      'chinese',
      'gypsy',
      'byzantine',
      'algerian',
      'japanese',
      'jewish',
      'spanish',
      'arabian',
    ]
    for (const id of foldedIds) {
      expect(getScaleById(id)).toBeUndefined()
    }
  })
})

describe('getScaleById', () => {
  it('returns undefined for an unknown id', () => {
    expect(getScaleById('not-a-real-scale')).toBeUndefined()
  })
})
