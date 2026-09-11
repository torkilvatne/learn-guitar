import { CHROMATIC_STEPS, isDualLabel, NOTE_STEPS, type StepLabel } from './constants'
import type { Scale } from './types'

export type DisplayMode = 'numbers' | 'notes'

export interface GridCell {
  semitone: number
  present: boolean
}

export function mapScaleToGrid(scale: Scale): GridCell[] {
  const semitones = new Set(scale.degrees)
  return Array.from({ length: 13 }, (_, semitone) => ({
    semitone,
    present: semitones.has(semitone),
  }))
}

export function resolveRootSemitone(note: string): number {
  const index = NOTE_STEPS.findIndex((step) =>
    isDualLabel(step.label)
      ? step.label.sharp === note || step.label.flat === note
      : step.label === note,
  )
  if (index === -1) {
    throw new RangeError(`Unknown root note: ${note}`)
  }
  return index
}

export function getNumberLabelForSemitone(semitone: number): StepLabel {
  return CHROMATIC_STEPS[semitone].label
}

export function getNoteLabelForSemitone(
  semitone: number,
  rootSemitone: number,
): StepLabel {
  const absoluteSemitone = (rootSemitone + semitone) % 12
  return NOTE_STEPS[absoluteSemitone].label
}
