import { ScaleRow } from '../components/ScaleRow'
import {
  centerModesOnScale,
  getDisplayStaggerOffsets,
  getModeProgressionInfo,
  getModesInProgressionOrder,
} from '../domain/modes'
import { getScaleQuality } from '../domain/quality'
import type { DisplayMode } from '../domain/scaleEngine'
import type { Scale } from '../domain/types'

const TWO_OCTAVE_COLUMNS = 24

export interface ModesPaneProps {
  scale: Scale
  mode: DisplayMode
  rootSemitone: number
  rootDegree: number
  centerScale: boolean
  highlightedChordId?: string | null
}

export function ModesPane({
  scale,
  mode,
  rootSemitone,
  rootDegree,
  centerScale,
  highlightedChordId,
}: ModesPaneProps) {
  const orderedModes = getModesInProgressionOrder(rootDegree)
  const modes = centerScale ? centerModesOnScale(orderedModes, scale) : orderedModes
  const infos = modes.map((modeScale) => getModeProgressionInfo(modeScale, rootDegree)!)
  const displayOffsets = getDisplayStaggerOffsets(modes)

  return (
    <div className="mt-6 space-y-1 overflow-x-auto sm:space-y-4">
      {modes.map((modeScale, index) => {
        const info = infos[index]
        const quality = getScaleQuality(modeScale)
        const isActive = modeScale.id === scale.id

        return (
          <div
            key={modeScale.id}
            className={`flex flex-col gap-1 pt-1 pr-2 pb-1 sm:flex-row sm:items-center sm:gap-3 sm:pt-3 sm:pr-4 sm:pb-3 ${isActive ? 'bg-surface-alt' : ''}`}
          >
            <div className="flex items-baseline gap-2 sm:contents">
              <div className="text-right font-mono text-sm text-text-muted sm:w-10 sm:shrink-0">
                {info.numeral}
              </div>
              <div
                className={`text-sm sm:w-52 sm:shrink-0 ${
                  isActive ? 'font-semibold text-text' : 'text-text-muted'
                }`}
              >
                {modeScale.name}
                {quality && (
                  <span className="font-normal text-text-muted">
                    {' '}
                    ({quality.replace('-', ' ')})
                  </span>
                )}
              </div>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[600px] sm:flex-1">
              <ScaleRow
                scale={modeScale}
                mode={mode}
                rootSemitone={rootSemitone}
                offset={displayOffsets[index]}
                totalColumns={TWO_OCTAVE_COLUMNS}
                highlightedChordId={highlightedChordId}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
