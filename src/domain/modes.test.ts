import { describe, expect, it } from 'vitest'
import {
  centerModesOnScale,
  getDiatonicModeInfo,
  getDisplayStaggerOffsets,
  getModeProgressionInfo,
  getModesInProgressionOrder,
  getRomanNumeral,
} from './modes'
import { SCALES, getScaleById } from './scales'

describe('getDiatonicModeInfo', () => {
  it('identifies the 7 major-diatonic modes with the correct degree', () => {
    expect(getDiatonicModeInfo(getScaleById('ionian')!)).toEqual({ degree: 1 })
    expect(getDiatonicModeInfo(getScaleById('dorian')!)).toEqual({ degree: 2 })
    expect(getDiatonicModeInfo(getScaleById('phrygian')!)).toEqual({ degree: 3 })
    expect(getDiatonicModeInfo(getScaleById('lydian')!)).toEqual({ degree: 4 })
    expect(getDiatonicModeInfo(getScaleById('mixolydian')!)).toEqual({ degree: 5 })
    expect(getDiatonicModeInfo(getScaleById('aeolian')!)).toEqual({ degree: 6 })
    expect(getDiatonicModeInfo(getScaleById('locrian')!)).toEqual({ degree: 7 })
  })

  it('does not misclassify scales that merely share a note count with the diatonic modes', () => {
    expect(getDiatonicModeInfo(getScaleById('harmonic-minor')!)).toBeUndefined()
    expect(getDiatonicModeInfo(getScaleById('melodic-minor')!)).toBeUndefined()
    expect(getDiatonicModeInfo(getScaleById('harmonic-major')!)).toBeUndefined()
  })

  it('returns undefined for scales with a different degree count entirely', () => {
    expect(getDiatonicModeInfo(getScaleById('ethiopian')!)).toBeUndefined()
    expect(getDiatonicModeInfo(getScaleById('major-pentatonic')!)).toBeUndefined()
    expect(getDiatonicModeInfo(getScaleById('diminished')!)).toBeUndefined()
  })

  it('matches exactly 7 scales across the whole dataset, one per degree', () => {
    const matches = SCALES.map((scale) => getDiatonicModeInfo(scale)).filter(Boolean)
    expect(matches).toHaveLength(7)
    const degrees = matches.map((match) => match!.degree).sort((a, b) => a - b)
    expect(degrees).toEqual([1, 2, 3, 4, 5, 6, 7])
  })
})

describe('getRomanNumeral', () => {
  it('cases the whole numeral by quality', () => {
    expect(getRomanNumeral(1, 'major')).toBe('I')
    expect(getRomanNumeral(2, 'minor')).toBe('ii')
    expect(getRomanNumeral(4, 'major')).toBe('IV')
    expect(getRomanNumeral(6, 'minor')).toBe('vi')
  })

  it('marks half-diminished and diminished with a suffix glyph', () => {
    expect(getRomanNumeral(7, 'half-diminished')).toBe('viiø')
    expect(getRomanNumeral(2, 'diminished')).toBe('ii°')
  })

  it('marks augmented with a + suffix, kept uppercase', () => {
    expect(getRomanNumeral(5, 'augmented')).toBe('V+')
  })
})

describe('getModeProgressionInfo', () => {
  it('matches the G-major worked example on resources/SCALES_AND_MODES.pdf page 18A for the major progression', () => {
    expect(getModeProgressionInfo(getScaleById('ionian')!, 1)).toEqual({
      position: 1,
      numeral: 'I',
      staggerOffset: 0,
    })
    expect(getModeProgressionInfo(getScaleById('dorian')!, 1)).toEqual({
      position: 2,
      numeral: 'ii',
      staggerOffset: 2,
    })
    expect(getModeProgressionInfo(getScaleById('phrygian')!, 1)).toEqual({
      position: 3,
      numeral: 'iii',
      staggerOffset: 4,
    })
    expect(getModeProgressionInfo(getScaleById('lydian')!, 1)).toEqual({
      position: 4,
      numeral: 'IV',
      staggerOffset: 5,
    })
    expect(getModeProgressionInfo(getScaleById('mixolydian')!, 1)).toEqual({
      position: 5,
      numeral: 'V',
      staggerOffset: 7,
    })
    expect(getModeProgressionInfo(getScaleById('aeolian')!, 1)).toEqual({
      position: 6,
      numeral: 'vi',
      staggerOffset: 9,
    })
    expect(getModeProgressionInfo(getScaleById('locrian')!, 1)).toEqual({
      position: 7,
      numeral: 'viiø',
      staggerOffset: 11,
    })
  })

  it('re-roots the same 7 modes at Aeolian for the minor progression, per PROJECT_DESCRIPTION.md', () => {
    expect(getModeProgressionInfo(getScaleById('aeolian')!, 6)).toEqual({
      position: 1,
      numeral: 'i',
      staggerOffset: 0,
    })
    expect(getModeProgressionInfo(getScaleById('locrian')!, 6)).toEqual({
      position: 2,
      numeral: 'iiø',
      staggerOffset: 2,
    })
    expect(getModeProgressionInfo(getScaleById('ionian')!, 6)).toEqual({
      position: 3,
      numeral: 'III',
      staggerOffset: 3,
    })
    expect(getModeProgressionInfo(getScaleById('dorian')!, 6)).toEqual({
      position: 4,
      numeral: 'iv',
      staggerOffset: 5,
    })
    expect(getModeProgressionInfo(getScaleById('phrygian')!, 6)).toEqual({
      position: 5,
      numeral: 'v',
      staggerOffset: 7,
    })
    expect(getModeProgressionInfo(getScaleById('lydian')!, 6)).toEqual({
      position: 6,
      numeral: 'VI',
      staggerOffset: 8,
    })
    expect(getModeProgressionInfo(getScaleById('mixolydian')!, 6)).toEqual({
      position: 7,
      numeral: 'VII',
      staggerOffset: 10,
    })
  })

  it('re-roots the same 7 modes at Dorian, for viewing a Dorian-harmonized progression', () => {
    expect(getModeProgressionInfo(getScaleById('dorian')!, 2)).toEqual({
      position: 1,
      numeral: 'i',
      staggerOffset: 0,
    })
    expect(getModeProgressionInfo(getScaleById('phrygian')!, 2)).toEqual({
      position: 2,
      numeral: 'ii',
      staggerOffset: 2,
    })
    expect(getModeProgressionInfo(getScaleById('lydian')!, 2)).toEqual({
      position: 3,
      numeral: 'III',
      staggerOffset: 3,
    })
    expect(getModeProgressionInfo(getScaleById('mixolydian')!, 2)).toEqual({
      position: 4,
      numeral: 'IV',
      staggerOffset: 5,
    })
    expect(getModeProgressionInfo(getScaleById('aeolian')!, 2)).toEqual({
      position: 5,
      numeral: 'v',
      staggerOffset: 7,
    })
    expect(getModeProgressionInfo(getScaleById('locrian')!, 2)).toEqual({
      position: 6,
      numeral: 'viø',
      staggerOffset: 9,
    })
    expect(getModeProgressionInfo(getScaleById('ionian')!, 2)).toEqual({
      position: 7,
      numeral: 'VII',
      staggerOffset: 10,
    })
  })

  it('re-roots the same 7 modes at Mixolydian, for viewing a Mixolydian-harmonized progression', () => {
    expect(getModeProgressionInfo(getScaleById('mixolydian')!, 5)).toEqual({
      position: 1,
      numeral: 'I',
      staggerOffset: 0,
    })
    expect(getModeProgressionInfo(getScaleById('aeolian')!, 5)).toEqual({
      position: 2,
      numeral: 'ii',
      staggerOffset: 2,
    })
    expect(getModeProgressionInfo(getScaleById('locrian')!, 5)).toEqual({
      position: 3,
      numeral: 'iiiø',
      staggerOffset: 4,
    })
    expect(getModeProgressionInfo(getScaleById('ionian')!, 5)).toEqual({
      position: 4,
      numeral: 'IV',
      staggerOffset: 5,
    })
    expect(getModeProgressionInfo(getScaleById('dorian')!, 5)).toEqual({
      position: 5,
      numeral: 'v',
      staggerOffset: 7,
    })
    expect(getModeProgressionInfo(getScaleById('phrygian')!, 5)).toEqual({
      position: 6,
      numeral: 'vi',
      staggerOffset: 9,
    })
    expect(getModeProgressionInfo(getScaleById('lydian')!, 5)).toEqual({
      position: 7,
      numeral: 'VII',
      staggerOffset: 10,
    })
  })

  it('returns undefined for a non-diatonic scale', () => {
    expect(getModeProgressionInfo(getScaleById('harmonic-minor')!, 1)).toBeUndefined()
  })
})

describe('getModesInProgressionOrder', () => {
  it('orders the major progression with Ionian on top', () => {
    const order = getModesInProgressionOrder(1).map((scale) => scale.id)
    expect(order).toEqual([
      'ionian',
      'dorian',
      'phrygian',
      'lydian',
      'mixolydian',
      'aeolian',
      'locrian',
    ])
  })

  it('orders the minor progression with Aeolian on top', () => {
    const order = getModesInProgressionOrder(6).map((scale) => scale.id)
    expect(order).toEqual([
      'aeolian',
      'locrian',
      'ionian',
      'dorian',
      'phrygian',
      'lydian',
      'mixolydian',
    ])
  })

  it('orders an arbitrary root (Dorian) on top, proving the rotation generalizes beyond major/minor', () => {
    const order = getModesInProgressionOrder(2).map((scale) => scale.id)
    expect(order).toEqual([
      'dorian',
      'phrygian',
      'lydian',
      'mixolydian',
      'aeolian',
      'locrian',
      'ionian',
    ])
  })
})

describe('centerModesOnScale', () => {
  const majorOrder = getModesInProgressionOrder(1)

  it('rotates the circular mode order so the given scale lands in the middle', () => {
    const centered = centerModesOnScale(majorOrder, getScaleById('dorian')!)
    expect(centered.map((scale) => scale.id)).toEqual([
      'aeolian',
      'locrian',
      'ionian',
      'dorian',
      'phrygian',
      'lydian',
      'mixolydian',
    ])
    expect(centered[3].id).toBe('dorian')
  })

  it('preserves the circular order regardless of which scale is centered', () => {
    expect(
      centerModesOnScale(majorOrder, getScaleById('ionian')!).map((s) => s.id),
    ).toEqual([
      'mixolydian',
      'aeolian',
      'locrian',
      'ionian',
      'dorian',
      'phrygian',
      'lydian',
    ])
    expect(
      centerModesOnScale(majorOrder, getScaleById('locrian')!).map((s) => s.id),
    ).toEqual([
      'lydian',
      'mixolydian',
      'aeolian',
      'locrian',
      'ionian',
      'dorian',
      'phrygian',
    ])
  })

  it('returns the list unchanged if the scale is not one of the given modes', () => {
    const centered = centerModesOnScale(majorOrder, getScaleById('harmonic-minor')!)
    expect(centered).toEqual(majorOrder)
  })
})

describe('getDisplayStaggerOffsets', () => {
  it('matches the progression-relative staggerOffset when the tonic is already first', () => {
    const majorOrder = getModesInProgressionOrder(1)
    const expected = majorOrder.map(
      (scale) => getModeProgressionInfo(scale, 1)!.staggerOffset,
    )
    expect(getDisplayStaggerOffsets(majorOrder)).toEqual(expected)
  })

  it('always starts at 0 and increases rightward, even when the list wraps past the tonic', () => {
    const centered = centerModesOnScale(
      getModesInProgressionOrder(1),
      getScaleById('aeolian')!,
    )
    expect(centered.map((scale) => scale.id)).toEqual([
      'phrygian',
      'lydian',
      'mixolydian',
      'aeolian',
      'locrian',
      'ionian',
      'dorian',
    ])
    expect(getDisplayStaggerOffsets(centered)).toEqual([0, 1, 3, 5, 7, 8, 10])
  })
})
