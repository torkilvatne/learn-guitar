import { describe, expect, it } from 'vitest'
import { CHORD_FAMILY_LABELS, groupChords } from './chordGrouping'
import { CHORDS, getChordById } from './chords'

describe('CHORD_FAMILY_LABELS', () => {
  it('has a human-readable label for every family', () => {
    expect(CHORD_FAMILY_LABELS.triad).toBe('Triads')
    expect(CHORD_FAMILY_LABELS.six).toBe('Sixth Chords')
    expect(CHORD_FAMILY_LABELS.seven).toBe('Seventh Chords')
    expect(CHORD_FAMILY_LABELS.nine).toBe('Ninth Chords')
    expect(CHORD_FAMILY_LABELS.eleven).toBe('Eleventh Chords')
    expect(CHORD_FAMILY_LABELS.thirteen).toBe('Thirteenth Chords')
  })
})

describe('groupChords', () => {
  it('splits the chords into one section per contiguous run of the same family', () => {
    const sections = groupChords(CHORDS)
    expect(sections.map((section) => section.family)).toEqual([
      'triad',
      'six',
      'seven',
      'nine',
      'eleven',
      'thirteen',
    ])
  })

  it('accounts for every chord exactly once, in the original order', () => {
    const sections = groupChords(CHORDS)
    expect(sections.flatMap((section) => section.chords)).toEqual(CHORDS)
  })

  it('groups every basic triad (and the power chord) together', () => {
    const sections = groupChords(CHORDS)
    const triads = sections.find((section) => section.family === 'triad')
    expect(triads?.chords.map((chord) => chord.id)).toEqual([
      'major',
      'minor',
      'augmented',
      'diminished-triad',
      'suspended-second',
      'suspended-fourth',
      'power-chord',
      'flat-5',
    ])
  })

  it('keeps 6/9 chords in the six family and altered-dominant 9ths in the seven family', () => {
    expect(getChordById('six-add-nine')?.family).toBe('six')
    expect(getChordById('seven-sharp-nine')?.family).toBe('seven')
    expect(getChordById('seven-flat-nine')?.family).toBe('seven')
  })
})
