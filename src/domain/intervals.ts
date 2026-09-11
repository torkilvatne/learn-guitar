import { INTERVALS, type IntervalInfo } from './constants'
import type { Scale } from './types'

export function getInterval(semitones: number): IntervalInfo {
  const interval = INTERVALS[semitones]
  if (!interval) {
    throw new RangeError(`No interval defined for ${semitones} semitones`)
  }
  return interval
}

export function invertSemitones(semitones: number): number {
  return 12 - semitones
}

export function transposeSemitone(rootSemitone: number, intervalSpan: number): number {
  return (rootSemitone + intervalSpan) % 12
}

export function getInvertedInterval(semitones: number): IntervalInfo {
  return getInterval(invertSemitones(semitones))
}

export function formatIntervalName(interval: IntervalInfo): string {
  return interval.altName ? `${interval.name} / ${interval.altName}` : interval.name
}

export type IntervalArcDirection = 'direct' | 'inverted'

export interface IntervalArc {
  semitone: number
  span: number
  label: string
}

export function getIntervalArc(fromSemitone: number, toSemitone: number): IntervalArc {
  const span = Math.abs(toSemitone - fromSemitone)
  return {
    semitone: toSemitone,
    span,
    label: formatIntervalName(getInterval(span)),
  }
}

export function getScaleIntervalArcs(
  scale: Scale,
  direction: IntervalArcDirection,
): IntervalArc[] {
  const anchor = direction === 'direct' ? 0 : 12
  return scale.degrees
    .filter((semitone) => semitone !== anchor)
    .map((semitone) => getIntervalArc(anchor, semitone))
}
