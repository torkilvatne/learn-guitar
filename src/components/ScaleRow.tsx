import { chordFitsSemitones, getChordById } from '../domain/chords'
import { isDualLabel } from '../domain/constants'
import {
  getNoteLabelForSemitone,
  getNumberLabelForSemitone,
  mapScaleToGrid,
  type DisplayMode,
} from '../domain/scaleEngine'
import type { Scale } from '../domain/types'
import { Box } from './Box'

export interface ScaleRowProps {
  scale: Scale
  mode: DisplayMode
  rootSemitone: number
  offset?: number
  totalColumns?: number
  highlightedChordId?: string | null
  showDegreeLabels?: boolean
}

export function ScaleRow({
  scale,
  mode,
  rootSemitone,
  offset = 0,
  totalColumns = 13,
  highlightedChordId = null,
  showDegreeLabels = true,
}: ScaleRowProps) {
  const grid = mapScaleToGrid(scale)
  const chord = highlightedChordId ? getChordById(highlightedChordId) : undefined
  const chordFits = chord ? chordFitsSemitones(chord, scale.degrees) : false
  const chordSemitones = chordFits ? new Set(chord!.semitones) : null
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(0, 1fr))` }}
    >
      {grid.map((cell) => {
        const mainLabel =
          mode === 'numbers'
            ? getNumberLabelForSemitone(cell.semitone)
            : getNoteLabelForSemitone(cell.semitone, rootSemitone + offset)
        const numberLabel = getNumberLabelForSemitone(cell.semitone)
        return (
          <div
            key={cell.semitone}
            className="flex flex-col"
            style={{ gridColumn: cell.semitone + offset + 1 }}
          >
            <Box
              label={mainLabel}
              highlighted={cell.present}
              secondaryHighlighted={
                cell.present && (chordSemitones?.has(cell.semitone % 12) ?? false)
              }
              variant="outline"
            />
            {showDegreeLabels && (
              <div
                className={`mt-1 text-center text-[0.65rem] font-medium leading-none text-text ${
                  mode === 'notes' ? (cell.present ? '' : 'opacity-10') : 'invisible'
                }`}
              >
                {isDualLabel(numberLabel) ? (
                  <>
                    <span className="block">{numberLabel.sharp}</span>
                    <span className="block">{numberLabel.flat}</span>
                  </>
                ) : (
                  <span>{numberLabel}</span>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
