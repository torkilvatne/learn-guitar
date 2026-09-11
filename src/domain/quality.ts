import type { Scale } from './types'

export type Quality = 'major' | 'minor' | 'diminished' | 'half-diminished' | 'augmented'

export function getScaleQuality(scale: Scale): Quality | undefined {
  const semitones = new Set(scale.degrees)
  const hasMajorThird = semitones.has(4)
  const hasMinorThird = semitones.has(3)
  if (hasMajorThird === hasMinorThird) {
    return undefined
  }

  if (semitones.has(7)) {
    return hasMajorThird ? 'major' : 'minor'
  }

  const hasNaturalFourth = semitones.has(5)
  const fifthIsFlat = semitones.has(6) && (hasMinorThird || hasNaturalFourth)
  if (fifthIsFlat) {
    if (!hasMinorThird) {
      return undefined
    }
    return semitones.has(10) ? 'half-diminished' : 'diminished'
  }

  if (semitones.has(8) && hasMajorThird) {
    return 'augmented'
  }

  return undefined
}
