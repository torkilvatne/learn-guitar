import { getScaleQuality, type Quality } from './quality'
import { SCALES } from './scales'
import type { Scale } from './types'

const MAJOR_SCALE_STEPS = [2, 2, 1, 2, 2, 2, 1]

const NATURAL_STEP_SEMITONES = MAJOR_SCALE_STEPS.reduce(
  (semitones, step) => [...semitones, semitones[semitones.length - 1] + step],
  [0],
)

function getNaturalSemitoneForStep(step: number): number {
  const semitone = NATURAL_STEP_SEMITONES[step - 1]
  if (semitone === undefined) {
    throw new RangeError(`No natural semitone defined for scale step ${step}`)
  }
  return semitone
}

export interface DiatonicModeInfo {
  degree: number
}

function getConsecutiveSteps(scale: Scale): number[] | undefined {
  if (scale.degrees.length !== 8) {
    return undefined
  }
  const semitones = scale.degrees
  const steps: number[] = []
  for (let i = 1; i < semitones.length; i++) {
    steps.push(semitones[i] - semitones[i - 1])
  }
  return steps
}

export function getDiatonicModeInfo(scale: Scale): DiatonicModeInfo | undefined {
  const steps = getConsecutiveSteps(scale)
  if (!steps) {
    return undefined
  }
  for (let rotation = 0; rotation < 7; rotation++) {
    const rotatedSteps = [
      ...MAJOR_SCALE_STEPS.slice(rotation),
      ...MAJOR_SCALE_STEPS.slice(0, rotation),
    ]
    if (rotatedSteps.every((step, index) => step === steps[index])) {
      return { degree: rotation + 1 }
    }
  }
  return undefined
}

const ROMAN_NUMERAL_BASE = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

export function getRomanNumeral(position: number, quality: Quality): string {
  const base = ROMAN_NUMERAL_BASE[position - 1]
  if (!base) {
    throw new RangeError(`No roman numeral defined for position ${position}`)
  }
  switch (quality) {
    case 'major':
      return base
    case 'minor':
      return base.toLowerCase()
    case 'diminished':
      return `${base.toLowerCase()}°`
    case 'half-diminished':
      return `${base.toLowerCase()}ø`
    case 'augmented':
      return `${base}+`
  }
}

function getProgressionPosition(majorScaleDegree: number, rootDegree: number): number {
  return ((majorScaleDegree - rootDegree + 7) % 7) + 1
}

export interface ModeProgressionInfo {
  position: number
  numeral: string
  staggerOffset: number
}

export function getModeProgressionInfo(
  scale: Scale,
  rootDegree: number,
): ModeProgressionInfo | undefined {
  const diatonic = getDiatonicModeInfo(scale)
  const quality = getScaleQuality(scale)
  if (!diatonic || !quality) {
    return undefined
  }
  const position = getProgressionPosition(diatonic.degree, rootDegree)
  const numeral = getRomanNumeral(position, quality)
  const staggerOffset =
    (getNaturalSemitoneForStep(diatonic.degree) - getNaturalSemitoneForStep(rootDegree) + 12) %
    12
  return { position, numeral, staggerOffset }
}

export function getModesInProgressionOrder(rootDegree: number): Scale[] {
  const modes = SCALES.filter((scale) => getDiatonicModeInfo(scale) !== undefined)
  return [...modes].sort((a, b) => {
    const positionA = getModeProgressionInfo(a, rootDegree)!.position
    const positionB = getModeProgressionInfo(b, rootDegree)!.position
    return positionA - positionB
  })
}

export function getDisplayStaggerOffsets(modes: Scale[]): number[] {
  if (modes.length === 0) {
    return []
  }
  const firstSemitone = getNaturalSemitoneForStep(getDiatonicModeInfo(modes[0])!.degree)
  return modes.map((scale) => {
    const semitone = getNaturalSemitoneForStep(getDiatonicModeInfo(scale)!.degree)
    return (semitone - firstSemitone + 12) % 12
  })
}

export function centerModesOnScale(modes: Scale[], scale: Scale): Scale[] {
  const activeIndex = modes.findIndex((candidate) => candidate.id === scale.id)
  if (activeIndex === -1) {
    return modes
  }
  const centerIndex = Math.floor(modes.length / 2)
  const rotation = (activeIndex - centerIndex + modes.length) % modes.length
  return modes.map((_, index) => modes[(rotation + index) % modes.length])
}
