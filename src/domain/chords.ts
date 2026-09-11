import type { Scale } from './types'

export type ChordFamily = 'triad' | 'six' | 'seven' | 'nine' | 'eleven' | 'thirteen'

export interface Chord {
  id: string
  name: string
  shorthand: string
  formula: string
  semitones: number[]
  family: ChordFamily
}

export const CHORDS: Chord[] = [
  {
    id: 'major',
    name: 'Major',
    shorthand: 'maj',
    formula: '1-3-5',
    semitones: [0, 4, 7],
    family: 'triad',
  },
  {
    id: 'minor',
    name: 'Minor',
    shorthand: 'm',
    formula: '1-b3-5',
    semitones: [0, 3, 7],
    family: 'triad',
  },
  {
    id: 'augmented',
    name: 'Augmented',
    shorthand: 'aug',
    formula: '1-3-#5',
    semitones: [0, 4, 8],
    family: 'triad',
  },
  {
    id: 'diminished-triad',
    name: 'Diminished Triad',
    shorthand: 'dim',
    formula: '1-b3-b5',
    semitones: [0, 3, 6],
    family: 'triad',
  },
  {
    id: 'suspended-second',
    name: 'Suspended Second',
    shorthand: 'sus2',
    formula: '1-2-5',
    semitones: [0, 2, 7],
    family: 'triad',
  },
  {
    id: 'suspended-fourth',
    name: 'Suspended Fourth',
    shorthand: 'sus4',
    formula: '1-4-5',
    semitones: [0, 5, 7],
    family: 'triad',
  },
  {
    id: 'power-chord',
    name: 'Power Chord',
    shorthand: '5',
    formula: '1-5',
    semitones: [0, 7],
    family: 'triad',
  },
  {
    id: 'flat-5',
    name: 'Flat 5',
    shorthand: 'b5',
    formula: '1-3-b5',
    semitones: [0, 4, 6],
    family: 'triad',
  },
  {
    id: 'six',
    name: 'Six',
    shorthand: '6',
    formula: '1-3-5-6',
    semitones: [0, 4, 7, 9],
    family: 'six',
  },
  {
    id: 'minor-six',
    name: 'Minor Six',
    shorthand: 'm6',
    formula: '1-b3-5-6',
    semitones: [0, 3, 7, 9],
    family: 'six',
  },
  {
    id: 'six-add-nine',
    name: 'Six Add Nine',
    shorthand: '6/9',
    formula: '1-3-5-6-9',
    semitones: [0, 2, 4, 7, 9],
    family: 'six',
  },
  {
    id: 'minor-six-add-nine',
    name: 'Minor Six Add Nine',
    shorthand: 'm6/9',
    formula: '1-b3-5-6-9',
    semitones: [0, 2, 3, 7, 9],
    family: 'six',
  },
  {
    id: 'diminished-7',
    name: 'Diminished 7th',
    shorthand: 'dim7',
    formula: '1-b3-b5-bb7',
    semitones: [0, 3, 6, 9],
    family: 'seven',
  },
  {
    id: 'dominant-7',
    name: 'Dominant Seven',
    shorthand: '7',
    formula: '1-3-5-b7',
    semitones: [0, 4, 7, 10],
    family: 'seven',
  },
  {
    id: 'minor-7',
    name: 'Minor Seven',
    shorthand: 'm7',
    formula: '1-b3-5-b7',
    semitones: [0, 3, 7, 10],
    family: 'seven',
  },
  {
    id: 'major-7',
    name: 'Major Seven',
    shorthand: 'maj7',
    formula: '1-3-5-7',
    semitones: [0, 4, 7, 11],
    family: 'seven',
  },
  {
    id: 'seven-suspended-four',
    name: 'Seven Suspended Four',
    shorthand: '7sus4',
    formula: '1-4-5-b7',
    semitones: [0, 5, 7, 10],
    family: 'seven',
  },
  {
    id: 'minor-major-7',
    name: 'Minor Major Seven',
    shorthand: 'm/maj7',
    formula: '1-b3-5-7',
    semitones: [0, 3, 7, 11],
    family: 'seven',
  },
  {
    id: 'seven-sharp-five',
    name: 'Seven Sharp Five',
    shorthand: '7#5',
    formula: '1-3-#5-b7',
    semitones: [0, 4, 8, 10],
    family: 'seven',
  },
  {
    id: 'seven-flat-five',
    name: 'Seven Flat Five',
    shorthand: '7b5',
    formula: '1-3-b5-b7',
    semitones: [0, 4, 6, 10],
    family: 'seven',
  },
  {
    id: 'minor-seven-flat-five',
    name: 'Minor Seven Flat Five',
    shorthand: 'm7b5',
    formula: '1-b3-b5-b7',
    semitones: [0, 3, 6, 10],
    family: 'seven',
  },
  {
    id: 'seven-sharp-five-sharp-nine',
    name: 'Seven Sharp Five Sharp Nine',
    shorthand: '7#5#9',
    formula: '1-3-#5-b7-#9',
    semitones: [0, 3, 4, 8, 10],
    family: 'seven',
  },
  {
    id: 'seven-sharp-five-flat-nine',
    name: 'Seven Sharp Five Flat Nine',
    shorthand: '7#5b9',
    formula: '1-3-#5-b7-b9',
    semitones: [0, 1, 4, 8, 10],
    family: 'seven',
  },
  {
    id: 'seven-flat-five-flat-nine',
    name: 'Seven Flat Five Flat Nine',
    shorthand: '7b5b9',
    formula: '1-3-b5-b7-b9',
    semitones: [0, 1, 4, 6, 10],
    family: 'seven',
  },
  {
    id: 'seven-sharp-nine',
    name: 'Seven Sharp Nine',
    shorthand: '7#9',
    formula: '1-3-5-b7-#9',
    semitones: [0, 3, 4, 7, 10],
    family: 'seven',
  },
  {
    id: 'seven-flat-nine',
    name: 'Seven Flat Nine',
    shorthand: '7b9',
    formula: '1-3-5-b7-b9',
    semitones: [0, 1, 4, 7, 10],
    family: 'seven',
  },
  {
    id: 'add9',
    name: 'Add Nine',
    shorthand: 'add9',
    formula: '1-3-5-9',
    semitones: [0, 2, 4, 7],
    family: 'nine',
  },
  {
    id: 'dominant-9',
    name: 'Ninth',
    shorthand: '9',
    formula: '1-3-5-b7-9',
    semitones: [0, 2, 4, 7, 10],
    family: 'nine',
  },
  {
    id: 'minor-9',
    name: 'Minor Nine',
    shorthand: 'm9',
    formula: '1-b3-5-b7-9',
    semitones: [0, 2, 3, 7, 10],
    family: 'nine',
  },
  {
    id: 'major-9',
    name: 'Major Nine',
    shorthand: 'maj9',
    formula: '1-3-5-7-9',
    semitones: [0, 2, 4, 7, 11],
    family: 'nine',
  },
  {
    id: 'minor-nine-major-seven',
    name: 'Minor Nine Major Seven',
    shorthand: 'm9maj7',
    formula: '1-b3-5-7-9',
    semitones: [0, 2, 3, 7, 11],
    family: 'nine',
  },
  {
    id: 'nine-sharp-five',
    name: 'Nine Sharp Five',
    shorthand: '9#5',
    formula: '1-3-#5-b7-9',
    semitones: [0, 2, 4, 8, 10],
    family: 'nine',
  },
  {
    id: 'nine-flat-five',
    name: 'Nine Flat Five',
    shorthand: '9b5',
    formula: '1-3-b5-b7-9',
    semitones: [0, 2, 4, 6, 10],
    family: 'nine',
  },
  {
    id: 'dominant-11',
    name: 'Eleventh',
    shorthand: '11',
    formula: '1-3-5-b7-9-11',
    semitones: [0, 2, 4, 5, 7, 10],
    family: 'eleven',
  },
  {
    id: 'minor-11',
    name: 'Minor Eleventh',
    shorthand: 'm11',
    formula: '1-b3-5-b7-9-11',
    semitones: [0, 2, 3, 5, 7, 10],
    family: 'eleven',
  },
  {
    id: 'dominant-13',
    name: 'Thirteenth',
    shorthand: '13',
    formula: '1-3-5-b7-9-11-13',
    semitones: [0, 2, 4, 5, 7, 9, 10],
    family: 'thirteen',
  },
  {
    id: 'minor-13',
    name: 'Minor Thirteenth',
    shorthand: 'm13',
    formula: '1-b3-5-b7-9-11-13',
    semitones: [0, 2, 3, 5, 7, 9, 10],
    family: 'thirteen',
  },
  {
    id: 'thirteen-flat-nine',
    name: 'Thirteen Flat Nine',
    shorthand: '13b9',
    formula: '1-3-5-b7-b9-11-13',
    semitones: [0, 1, 4, 5, 7, 9, 10],
    family: 'thirteen',
  },
  {
    id: 'thirteen-flat-five-flat-nine',
    name: 'Thirteen Flat Five Flat Nine',
    shorthand: '13b5b9',
    formula: '1-3-b5-b7-b9-11-13',
    semitones: [0, 1, 4, 5, 6, 9, 10],
    family: 'thirteen',
  },
]

export function getChordById(id: string): Chord | undefined {
  return CHORDS.find((chord) => chord.id === id)
}

export function chordFitsSemitones(chord: Chord, scaleSemitones: number[]): boolean {
  const scaleSet = new Set(scaleSemitones)
  return chord.semitones.every((semitone) => scaleSet.has(semitone))
}

export function chordExactlyMatchesSemitones(chord: Chord, semitones: number[]): boolean {
  const chordSet = new Set(chord.semitones)
  const answerSet = new Set(semitones)
  return (
    chordSet.size === answerSet.size &&
    [...chordSet].every((semitone) => answerSet.has(semitone))
  )
}

export function getChordsFittingScale(scale: Scale): Chord[] {
  return CHORDS.filter((chord) => chordFitsSemitones(chord, scale.degrees))
}
