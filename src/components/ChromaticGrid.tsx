import { CHROMATIC_STEPS } from '../domain/constants'
import { getNoteLabelForSemitone, getNumberLabelForSemitone } from '../domain/scaleEngine'
import type { DisplayMode } from '../domain/scaleEngine'
import { Box, type BoxVariant } from './Box'

export interface ChromaticGridProps {
  mode: DisplayMode
  rootSemitone: number
  selectedSemitones?: number[]
  onToggle?: (semitone: number) => void
  variant?: BoxVariant
}

export function ChromaticGrid({
  mode,
  rootSemitone,
  selectedSemitones,
  onToggle,
  variant = 'filled',
}: ChromaticGridProps) {
  const selected = new Set(selectedSemitones)
  return (
    <div className="grid w-full grid-cols-[repeat(13,minmax(0,1fr))] gap-1">
      {CHROMATIC_STEPS.map((step) => (
        <Box
          key={step.semitone}
          label={
            mode === 'numbers'
              ? getNumberLabelForSemitone(step.semitone)
              : getNoteLabelForSemitone(step.semitone, rootSemitone)
          }
          highlighted={selected.has(step.semitone)}
          variant={variant}
          onClick={onToggle ? () => onToggle(step.semitone) : undefined}
        />
      ))}
    </div>
  )
}
