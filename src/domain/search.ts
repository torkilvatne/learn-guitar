import { SCALES } from './scales'
import type { Scale } from './types'

function getSemitoneSet(scale: Scale): Set<number> {
  return new Set(scale.degrees)
}

export function findScalesContainingSemitones(semitones: number[]): Scale[] {
  if (semitones.length === 0) {
    return []
  }
  const selected = new Set(semitones)
  return SCALES.filter((scale) => {
    const scaleSemitones = getSemitoneSet(scale)
    return [...selected].every((semitone) => scaleSemitones.has(semitone))
  })
}

export function findScalesExactlyMatchingSemitones(semitones: number[]): Scale[] {
  if (semitones.length === 0) {
    return []
  }
  const selected = new Set(semitones)
  return SCALES.filter((scale) => {
    const scaleSemitones = getSemitoneSet(scale)
    return (
      scaleSemitones.size === selected.size &&
      [...selected].every((semitone) => scaleSemitones.has(semitone))
    )
  })
}
