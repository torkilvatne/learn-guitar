import type { Scale } from './types'

export const SCALES: Scale[] = [
  {
    id: 'ionian',
    name: 'Ionian',
    altNames: ['Major Diatonic'],
    degrees: [0, 2, 4, 5, 7, 9, 11, 12],
  },
  { id: 'dorian', name: 'Dorian', degrees: [0, 2, 3, 5, 7, 9, 10, 12] },
  { id: 'phrygian', name: 'Phrygian', degrees: [0, 1, 3, 5, 7, 8, 10, 12] },
  { id: 'lydian', name: 'Lydian', degrees: [0, 2, 4, 6, 7, 9, 11, 12] },
  { id: 'mixolydian', name: 'Mixolydian', degrees: [0, 2, 4, 5, 7, 9, 10, 12] },
  {
    id: 'aeolian',
    name: 'Aeolian',
    altNames: ['Natural Minor', 'Relative Minor'],
    degrees: [0, 2, 3, 5, 7, 8, 10, 12],
  },
  { id: 'locrian', name: 'Locrian', degrees: [0, 1, 3, 5, 6, 8, 10, 12] },
  {
    id: 'major-pentatonic',
    name: 'Major Pentatonic',
    altNames: ['Mongolian', 'Chinese'],
    degrees: [0, 2, 4, 7, 9, 12],
  },
  { id: 'minor-pentatonic', name: 'Minor Pentatonic', degrees: [0, 3, 5, 7, 10, 12] },
  { id: 'hirajoshi', name: 'Hirajoshi', degrees: [0, 2, 3, 7, 8, 12] },
  { id: 'kumoi', name: 'Kumoi', altNames: ['Japanese'], degrees: [0, 1, 5, 7, 8, 12] },
  { id: 'iwato', name: 'Iwato', degrees: [0, 1, 5, 6, 10, 12] },
  { id: 'pelog', name: 'Pelog', degrees: [0, 1, 3, 7, 10, 12] },
  { id: 'balinese', name: 'Balinese', degrees: [0, 1, 3, 7, 8, 12] },
  { id: 'egyptian', name: 'Egyptian', degrees: [0, 2, 5, 7, 10, 12] },
  { id: 'chinese-2', name: 'Chinese 2', degrees: [0, 4, 6, 7, 11, 12] },
  { id: 'whole-tone', name: 'Whole Tone', degrees: [0, 2, 4, 6, 8, 10, 12] },
  { id: 'diminished', name: 'Diminished', degrees: [0, 2, 3, 5, 6, 8, 9, 11, 12] },
  {
    id: 'harmonic-minor',
    name: 'Harmonic Minor',
    altNames: ['Mohammedan'],
    degrees: [0, 2, 3, 5, 7, 8, 11, 12],
  },
  { id: 'harmonic-major', name: 'Harmonic Major', degrees: [0, 2, 4, 5, 7, 8, 11, 12] },
  {
    id: 'melodic-minor',
    name: 'Melodic Minor',
    altNames: ['Hawaiian'],
    degrees: [0, 2, 3, 5, 7, 9, 11, 12],
  },
  {
    id: 'neapolitan-minor',
    name: 'Neapolitan Minor',
    degrees: [0, 1, 3, 5, 7, 8, 11, 12],
  },
  {
    id: 'neapolitan-major',
    name: 'Neapolitan Major',
    degrees: [0, 1, 3, 5, 7, 9, 11, 12],
  },
  { id: 'oriental', name: 'Oriental', degrees: [0, 1, 4, 5, 6, 9, 10, 12] },
  {
    id: 'double-harmonic-major',
    name: 'Double Harmonic Major',
    altNames: ['Gypsy', 'Byzantine'],
    degrees: [0, 1, 4, 5, 7, 8, 11, 12],
  },
  { id: 'enigmatic', name: 'Enigmatic', degrees: [0, 1, 4, 6, 8, 10, 11, 12] },
  {
    id: 'hungarian-minor',
    name: 'Hungarian Minor',
    altNames: ['Algerian'],
    degrees: [0, 2, 3, 6, 7, 8, 11, 12],
  },
  { id: 'hungarian-major', name: 'Hungarian Major', degrees: [0, 3, 4, 6, 7, 9, 10, 12] },
  { id: 'hindu', name: 'Hindu', degrees: [0, 2, 4, 5, 7, 8, 10, 12] },
  {
    id: 'spanish-8-tone',
    name: 'Spanish 8 Tone',
    degrees: [0, 1, 3, 4, 5, 6, 8, 10, 12],
  },
  { id: 'hungarian-gypsy', name: 'Hungarian Gypsy', degrees: [0, 2, 3, 6, 7, 8, 10, 12] },
  {
    id: 'major-phrygian',
    name: 'Major Phrygian',
    altNames: ['Jewish', 'Spanish'],
    degrees: [0, 1, 4, 5, 7, 8, 10, 12],
  },
  {
    id: 'major-locrian',
    name: 'Major Locrian',
    altNames: ['Arabian'],
    degrees: [0, 2, 4, 5, 6, 8, 10, 12],
  },
  { id: 'lydian-minor', name: 'Lydian Minor', degrees: [0, 2, 4, 6, 7, 8, 10, 12] },
  { id: 'overtone', name: 'Overtone', degrees: [0, 2, 4, 6, 7, 9, 10, 12] },
  {
    id: 'leading-whole-tone',
    name: 'Leading Whole Tone',
    degrees: [0, 2, 4, 6, 8, 10, 11, 12],
  },
  { id: 'javanese', name: 'Javanese', degrees: [0, 1, 3, 5, 7, 9, 10, 12] },
  { id: 'persian', name: 'Persian', degrees: [0, 1, 4, 5, 6, 8, 11, 12] },
  { id: 'ethiopian', name: 'Ethiopian', degrees: [0, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12] },
]

export function getScaleById(id: string): Scale | undefined {
  return SCALES.find((scale) => scale.id === id)
}
