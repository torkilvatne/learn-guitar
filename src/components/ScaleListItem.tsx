import type { Ref } from 'react'
import { ChevronRight } from 'lucide-react'
import type { DisplayMode } from '../domain/scaleEngine'
import type { Scale } from '../domain/types'
import { ScaleName } from './ScaleName'
import { ScaleRow } from './ScaleRow'

export const ITEM_HEIGHT_PX = 176

const MAX_FOCUS_DISTANCE = 2
const FOCUS_OPACITIES = [1, 0.62, 0.34]
const ACTIVE_THRESHOLD = 0.5

export function getFocusStyle(focus: number) {
  const distance = Math.min(Math.round(Math.abs(focus)), MAX_FOCUS_DISTANCE)
  return { opacity: FOCUS_OPACITIES[distance] }
}

export interface ScaleListItemProps {
  scale: Scale
  mode: DisplayMode
  rootSemitone: number
  highlightedChordId?: string | null
  focus: number
  onSelect: (scale: Scale) => void
  itemRef?: Ref<HTMLDivElement>
}

export function ScaleListItem({
  scale,
  mode,
  rootSemitone,
  highlightedChordId,
  focus,
  onSelect,
  itemRef,
}: ScaleListItemProps) {
  const { opacity } = getFocusStyle(focus)
  const isActive = Math.abs(focus) < ACTIVE_THRESHOLD

  return (
    <div
      ref={itemRef}
      className="flex shrink-0 snap-center items-center justify-center px-6 sm:px-14"
      style={{ opacity, height: ITEM_HEIGHT_PX, transition: 'opacity 150ms linear' }}
    >
      <button
        type="button"
        onClick={() => onSelect(scale)}
        className={`h-full w-full overflow-hidden rounded-[24px] px-5 py-4 text-left transition-all ${
          isActive ? 'bg-surface shadow-elev-sm' : 'bg-transparent'
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-1 md:flex-row md:items-center md:gap-6">
          <ScaleName
            scale={scale}
            layout="sidebar"
            showDiatonicBadge={false}
            emphasis={isActive}
          />
          <div className="max-w-[1000px] md:flex-1">
            <ScaleRow
              scale={scale}
              mode={mode}
              rootSemitone={rootSemitone}
              highlightedChordId={highlightedChordId}
              showDegreeLabels={false}
            />
          </div>
          <ChevronRight
            size={18}
            strokeWidth={2.75}
            className={`hidden shrink-0 text-text/70 md:block ${isActive ? '' : 'invisible'}`}
          />
        </div>
      </button>
    </div>
  )
}
