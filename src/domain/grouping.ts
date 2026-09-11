import { groupByAdjacent } from './groupByAdjacent'
import { getDiatonicModeInfo } from './modes'
import type { Scale } from './types'

export type ScaleGroup = 'major-diatonic-modes' | 'pentatonic' | 'symmetrical' | 'other'

export const SCALE_GROUP_LABELS: Record<ScaleGroup, string> = {
  'major-diatonic-modes': 'Major Diatonic Modes',
  pentatonic: 'Pentatonics',
  symmetrical: 'Symmetrical',
  other: 'Other',
}

function isPentatonic(scale: Scale): boolean {
  return scale.degrees.length - 1 === 5
}

function getSteps(scale: Scale): number[] {
  const steps: number[] = []
  for (let i = 1; i < scale.degrees.length; i++) {
    steps.push(scale.degrees[i] - scale.degrees[i - 1])
  }
  return steps
}

function isSymmetrical(scale: Scale): boolean {
  const steps = getSteps(scale)
  for (let period = 1; period < steps.length; period++) {
    if (steps.length % period !== 0) {
      continue
    }
    const cell = steps.slice(0, period)
    const repeats = steps.every((step, index) => step === cell[index % period])
    if (repeats) {
      return true
    }
  }
  return false
}

export function getScaleGroup(scale: Scale): ScaleGroup {
  if (getDiatonicModeInfo(scale) !== undefined) {
    return 'major-diatonic-modes'
  }
  if (isPentatonic(scale)) {
    return 'pentatonic'
  }
  if (isSymmetrical(scale)) {
    return 'symmetrical'
  }
  return 'other'
}

export interface ScaleGroupSection {
  group: ScaleGroup
  scales: Scale[]
}

export function groupScales(scales: Scale[]): ScaleGroupSection[] {
  return groupByAdjacent(scales, getScaleGroup).map(({ group, items }) => ({
    group,
    scales: items,
  }))
}
