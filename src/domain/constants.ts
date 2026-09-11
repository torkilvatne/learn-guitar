export interface DualLabel {
  sharp: string
  flat: string
}

export type StepLabel = string | DualLabel

export function isDualLabel(label: StepLabel): label is DualLabel {
  return typeof label !== 'string'
}

export function noteLabelText(label: StepLabel): string {
  return isDualLabel(label) ? `${label.sharp} / ${label.flat}` : label
}

export function getSingleNoteLabel(label: StepLabel, preferFlats = false): string {
  return isDualLabel(label) ? (preferFlats ? label.flat : label.sharp) : label
}

export interface ChromaticStep {
  semitone: number
  label: StepLabel
}

export const CHROMATIC_STEPS: ChromaticStep[] = [
  { semitone: 0, label: '1' },
  { semitone: 1, label: { sharp: '1#', flat: '2b' } },
  { semitone: 2, label: '2' },
  { semitone: 3, label: { sharp: '2#', flat: '3b' } },
  { semitone: 4, label: '3' },
  { semitone: 5, label: '4' },
  { semitone: 6, label: { sharp: '4#', flat: '5b' } },
  { semitone: 7, label: '5' },
  { semitone: 8, label: { sharp: '5#', flat: '6b' } },
  { semitone: 9, label: '6' },
  { semitone: 10, label: { sharp: '6#', flat: '7b' } },
  { semitone: 11, label: '7' },
  { semitone: 12, label: '8' },
]

export interface NoteStep {
  semitone: number
  label: StepLabel
}

export const NOTE_STEPS: NoteStep[] = [
  { semitone: 0, label: 'A' },
  { semitone: 1, label: { sharp: 'A#', flat: 'Bb' } },
  { semitone: 2, label: 'B' },
  { semitone: 3, label: 'C' },
  { semitone: 4, label: { sharp: 'C#', flat: 'Db' } },
  { semitone: 5, label: 'D' },
  { semitone: 6, label: { sharp: 'D#', flat: 'Eb' } },
  { semitone: 7, label: 'E' },
  { semitone: 8, label: 'F' },
  { semitone: 9, label: { sharp: 'F#', flat: 'Gb' } },
  { semitone: 10, label: 'G' },
  { semitone: 11, label: { sharp: 'G#', flat: 'Ab' } },
]

export const NATURAL_ABSOLUTE_SEMITONE_FOR_LETTER_CODE: Record<string, number> = {
  KeyA: 0,
  KeyB: 2,
  KeyC: 3,
  KeyD: 5,
  KeyE: 7,
  KeyF: 8,
  KeyG: 10,
}

export const SHARP_ABSOLUTE_SEMITONE_FOR_LETTER_CODE: Record<string, number> = {
  KeyA: 1,
  KeyC: 4,
  KeyD: 6,
  KeyF: 9,
  KeyG: 11,
}

export interface IntervalInfo {
  semitones: number
  name: string
  altName?: string
}

export const INTERVALS: IntervalInfo[] = [
  { semitones: 0, name: 'PER UNISON' },
  { semitones: 1, name: 'MIN 2' },
  { semitones: 2, name: 'MAJ 2' },
  { semitones: 3, name: 'MIN 3' },
  { semitones: 4, name: 'MAJ 3' },
  { semitones: 5, name: 'PER 4' },
  { semitones: 6, name: 'AUG 4', altName: 'DIM 5' },
  { semitones: 7, name: 'PER 5' },
  { semitones: 8, name: 'AUG 5', altName: 'MIN 6' },
  { semitones: 9, name: 'MAJ 6' },
  { semitones: 10, name: 'MIN 7' },
  { semitones: 11, name: 'MAJ 7' },
  { semitones: 12, name: 'PER OCT' },
]
