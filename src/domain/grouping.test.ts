import { describe, expect, it } from 'vitest'
import { getScaleGroup, groupScales, SCALE_GROUP_LABELS } from './grouping'
import { getScaleById, SCALES } from './scales'

describe('getScaleGroup', () => {
  it('groups all 7 major-diatonic modes together', () => {
    for (const id of [
      'ionian',
      'dorian',
      'phrygian',
      'lydian',
      'mixolydian',
      'aeolian',
      'locrian',
    ]) {
      expect(getScaleGroup(getScaleById(id)!)).toBe('major-diatonic-modes')
    }
  })

  it('groups every 5-note scale as pentatonic', () => {
    for (const id of [
      'major-pentatonic',
      'minor-pentatonic',
      'hirajoshi',
      'kumoi',
      'iwato',
      'pelog',
      'balinese',
      'egyptian',
      'chinese-2',
    ]) {
      expect(getScaleGroup(getScaleById(id)!)).toBe('pentatonic')
    }
  })

  it('groups scales with a periodic, octave-tiling interval pattern as symmetrical', () => {
    expect(getScaleGroup(getScaleById('whole-tone')!)).toBe('symmetrical')
    expect(getScaleGroup(getScaleById('diminished')!)).toBe('symmetrical')
  })

  it('does not misclassify a non-periodic scale as symmetrical', () => {
    expect(getScaleGroup(getScaleById('leading-whole-tone')!)).not.toBe('symmetrical')
    expect(getScaleGroup(getScaleById('hungarian-gypsy')!)).not.toBe('symmetrical')
  })

  it('falls back to "other" for must-know scales that are not diatonic, pentatonic, or symmetrical', () => {
    expect(getScaleGroup(getScaleById('harmonic-minor')!)).toBe('other')
    expect(getScaleGroup(getScaleById('melodic-minor')!)).toBe('other')
  })

  it('falls back to "other" for exotic scales matching none of the other groups', () => {
    expect(getScaleGroup(getScaleById('hungarian-gypsy')!)).toBe('other')
    expect(getScaleGroup(getScaleById('ethiopian')!)).toBe('other')
  })
})

describe('SCALE_GROUP_LABELS', () => {
  it('has a human-readable label for every group', () => {
    expect(SCALE_GROUP_LABELS['major-diatonic-modes']).toBe('Major Diatonic Modes')
    expect(SCALE_GROUP_LABELS.pentatonic).toBe('Pentatonics')
    expect(SCALE_GROUP_LABELS.symmetrical).toBe('Symmetrical')
    expect(SCALE_GROUP_LABELS.other).toBe('Other')
  })
})

describe('groupScales', () => {
  it('splits the scales into one section per contiguous run of the same group', () => {
    const sections = groupScales(SCALES)
    expect(sections.map((section) => section.group)).toEqual([
      'major-diatonic-modes',
      'pentatonic',
      'symmetrical',
      'other',
    ])
  })

  it('accounts for every scale exactly once, in the original order', () => {
    const sections = groupScales(SCALES)
    expect(sections.flatMap((section) => section.scales)).toEqual(SCALES)
  })

  it('merges consecutive same-group scales into a single section', () => {
    const sections = groupScales(SCALES)
    const diatonic = sections.find((section) => section.group === 'major-diatonic-modes')
    expect(diatonic?.scales.map((scale) => scale.id)).toEqual([
      'ionian',
      'dorian',
      'phrygian',
      'lydian',
      'mixolydian',
      'aeolian',
      'locrian',
    ])
  })
})

describe('SCALES ordering', () => {
  it('lists the 7 major-diatonic modes first, in mode-rotation order', () => {
    expect(SCALES.slice(0, 7).map((scale) => scale.id)).toEqual([
      'ionian',
      'dorian',
      'phrygian',
      'lydian',
      'mixolydian',
      'aeolian',
      'locrian',
    ])
  })

  it('places Harmonic Minor first and Harmonic Major second among the "other" group', () => {
    const otherIds = SCALES.filter((scale) => getScaleGroup(scale) === 'other').map(
      (scale) => scale.id,
    )
    expect(otherIds[0]).toBe('harmonic-minor')
    expect(otherIds[1]).toBe('harmonic-major')
  })

  it('keeps every group contiguous, since the list renders one separator per group transition', () => {
    const groups = SCALES.map((scale) => getScaleGroup(scale))
    const seen = new Set<string>()
    let previous: string | undefined
    for (const group of groups) {
      if (group !== previous) {
        expect(seen.has(group)).toBe(false)
        seen.add(group)
      }
      previous = group
    }
  })
})
