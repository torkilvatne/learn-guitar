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

/**
 * Same data, calmer frame: the whole stack sits in one rounded surface, the active
 * mode gets a ground-coloured inset row with a small shadow instead of a flat
 * surface-alt band, and the roman numeral becomes an accent tag so the progression
 * reads at a glance.
 */
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
    <div className="overflow-x-auto rounded-[32px] bg-surface px-5 py-5 shadow-elev-sm sm:px-7 sm:py-6">
      <div className="flex flex-col gap-1.5">
        {modes.map((modeScale, index) => {
          const info = infos[index]
          const quality = getScaleQuality(modeScale)
          const isActive = modeScale.id === scale.id

          return (
            <div
              key={modeScale.id}
              className={`flex flex-col gap-1.5 rounded-[20px] px-3 py-2.5 sm:flex-row sm:items-center sm:gap-4 ${
                isActive ? 'bg-bg shadow-elev-sm' : ''
              }`}
            >
              <div className="flex items-baseline gap-2.5 sm:contents">
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-center text-xs font-bold sm:w-12 ${
                    isActive
                      ? 'bg-accent-100 text-accent-800'
                      : 'bg-neutral-200 text-text/60'
                  }`}
                >
                  {info.numeral}
                </span>
                <div
                  className={`text-sm sm:w-52 sm:shrink-0 ${
                    isActive ? 'font-semibold text-text' : 'text-text/65'
                  }`}
                >
                  {modeScale.name}
                  {quality && (
                    <span className="font-normal text-text/50">
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
                  showDegreeLabels={false}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
