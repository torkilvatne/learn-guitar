import { resolveRootSemitone } from './scaleEngine'

export const DEFAULT_FRET_COUNT = 12

export const FRET_MARKERS: number[] = [3, 5, 7, 9, 12]

export const STANDARD_TUNING: number[] = ['E', 'B', 'G', 'D', 'A', 'E'].map(resolveRootSemitone)

export function getFretSemitone(openStringSemitone: number, fret: number): number {
  return (openStringSemitone + fret) % 12
}

export interface NamedTuning {
  id: string
  name: string
  semitones: number[]
}

// Semitone arrays are top-to-bottom row order (high string first), matching STANDARD_TUNING.
export const TUNINGS: NamedTuning[] = [
  { id: 'standard', name: 'Standard (E A D G B E)', semitones: STANDARD_TUNING },
  {
    id: 'drop-d',
    name: 'Drop D',
    semitones: ['E', 'B', 'G', 'D', 'A', 'D'].map(resolveRootSemitone),
  },
  {
    id: 'half-step-down',
    name: 'Half Step Down (Eb Standard)',
    semitones: ['Eb', 'Bb', 'Gb', 'Db', 'Ab', 'Eb'].map(resolveRootSemitone),
  },
  {
    id: 'open-g',
    name: 'Open G',
    semitones: ['D', 'B', 'G', 'D', 'G', 'D'].map(resolveRootSemitone),
  },
  {
    id: 'open-d',
    name: 'Open D',
    semitones: ['D', 'A', 'F#', 'D', 'A', 'D'].map(resolveRootSemitone),
  },
  {
    id: 'open-e',
    name: 'Open E',
    semitones: ['E', 'B', 'G#', 'E', 'B', 'E'].map(resolveRootSemitone),
  },
  {
    id: 'dadgad',
    name: 'DADGAD',
    semitones: ['D', 'A', 'G', 'D', 'A', 'D'].map(resolveRootSemitone),
  },
  {
    id: 'drop-c',
    name: 'Drop C',
    semitones: ['D', 'A', 'F', 'C', 'G', 'C'].map(resolveRootSemitone),
  },
]

export function getTuningById(id: string): NamedTuning | undefined {
  return TUNINGS.find((tuning) => tuning.id === id)
}
