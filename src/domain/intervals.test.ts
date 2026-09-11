import { describe, expect, it } from 'vitest'
import { getScaleById } from './scales'
import {
  getInterval,
  getIntervalArc,
  getInvertedInterval,
  getScaleIntervalArcs,
  invertSemitones,
  transposeSemitone,
} from './intervals'

describe('getInterval', () => {
  it('returns the interval info for a given semitone distance', () => {
    expect(getInterval(4).name).toBe('MAJ 3')
    expect(getInterval(7).name).toBe('PER 5')
  })

  it('throws for a semitone distance outside 0-12', () => {
    expect(() => getInterval(13)).toThrow(RangeError)
    expect(() => getInterval(-1)).toThrow(RangeError)
  })
})

describe('invertSemitones', () => {
  it('subtracts the semitone distance from an octave', () => {
    expect(invertSemitones(0)).toBe(12)
    expect(invertSemitones(4)).toBe(8)
    expect(invertSemitones(12)).toBe(0)
  })
})

describe('getInvertedInterval', () => {
  it('returns the interval on the other side of the octave', () => {
    expect(getInvertedInterval(1).name).toBe('MAJ 7')
    expect(getInvertedInterval(4).name).toBe('AUG 5')
    expect(getInvertedInterval(4).altName).toBe('MIN 6')
    expect(getInvertedInterval(0).name).toBe('PER OCT')
  })
})

describe('transposeSemitone', () => {
  it('adds an interval span to a root and wraps within one octave', () => {
    expect(transposeSemitone(0, 4)).toBe(4)
    expect(transposeSemitone(9, 4)).toBe(1)
  })

  it('wraps a full octave span back onto the root itself', () => {
    expect(transposeSemitone(5, 12)).toBe(5)
  })
})

describe('getIntervalArc', () => {
  it('computes the span and label between two arbitrary semitones', () => {
    expect(getIntervalArc(0, 7)).toEqual({ semitone: 7, span: 7, label: 'PER 5' })
  })

  it('is symmetric regardless of argument order, since span uses absolute distance', () => {
    expect(getIntervalArc(7, 0).span).toBe(7)
    expect(getIntervalArc(0, 7).span).toBe(7)
  })

  it('backs getScaleIntervalArcs, producing identical results', () => {
    const ionian = getScaleById('ionian')!
    const viaArcs = getScaleIntervalArcs(ionian, 'direct')
    const viaDirect = ionian.degrees
      .filter((semitone) => semitone !== 0)
      .map((semitone) => getIntervalArc(0, semitone))
    expect(viaArcs).toEqual(viaDirect)
  })
})

describe('getScaleIntervalArcs', () => {
  it('builds a direct arc from the root to every other present degree, matching interval_chromatic_scale.png', () => {
    const majorDiatonic = getScaleById('ionian')!
    const arcs = getScaleIntervalArcs(majorDiatonic, 'direct')
    expect(arcs).toEqual([
      { semitone: 2, span: 2, label: 'MAJ 2' },
      { semitone: 4, span: 4, label: 'MAJ 3' },
      { semitone: 5, span: 5, label: 'PER 4' },
      { semitone: 7, span: 7, label: 'PER 5' },
      { semitone: 9, span: 9, label: 'MAJ 6' },
      { semitone: 11, span: 11, label: 'MAJ 7' },
      { semitone: 12, span: 12, label: 'PER OCT' },
    ])
  })

  it('excludes the root itself from direct arcs, since a unison arc is not shown', () => {
    const majorDiatonic = getScaleById('ionian')!
    const arcs = getScaleIntervalArcs(majorDiatonic, 'direct')
    expect(arcs.some((arc) => arc.semitone === 0)).toBe(false)
  })

  it('builds an inverted arc from the octave down to every other present degree', () => {
    const majorDiatonic = getScaleById('ionian')!
    const arcs = getScaleIntervalArcs(majorDiatonic, 'inverted')
    expect(arcs).toEqual([
      { semitone: 0, span: 12, label: 'PER OCT' },
      { semitone: 2, span: 10, label: 'MIN 7' },
      { semitone: 4, span: 8, label: 'AUG 5 / MIN 6' },
      { semitone: 5, span: 7, label: 'PER 5' },
      { semitone: 7, span: 5, label: 'PER 4' },
      { semitone: 9, span: 3, label: 'MIN 3' },
      { semitone: 11, span: 1, label: 'MIN 2' },
    ])
  })

  it('excludes the octave itself from inverted arcs, since a unison arc is not shown', () => {
    const majorDiatonic = getScaleById('ionian')!
    const arcs = getScaleIntervalArcs(majorDiatonic, 'inverted')
    expect(arcs.some((arc) => arc.semitone === 12)).toBe(false)
  })

  it('labels a tritone degree identically from both directions, since it inverts to itself', () => {
    const diminished = getScaleById('diminished')!
    expect(diminished.degrees).toContain(6)
    const direct = getScaleIntervalArcs(diminished, 'direct').find(
      (arc) => arc.semitone === 6,
    )
    const inverted = getScaleIntervalArcs(diminished, 'inverted').find(
      (arc) => arc.semitone === 6,
    )
    expect(direct?.label).toBe('AUG 4 / DIM 5')
    expect(inverted?.label).toBe('AUG 4 / DIM 5')
  })
})
