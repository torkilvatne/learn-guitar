import type { Ref } from 'react'
import type { DisplayMode } from '../domain/scaleEngine'
import type { Scale } from '../domain/types'
import { ScaleName } from './ScaleName'
import { ScaleRow } from './ScaleRow'

export const ITEM_HEIGHT_PX = 176

const MAX_FOCUS_DISTANCE = 3
const OPACITY_STEP = 0.28
const MIN_OPACITY = 0.08
const ACTIVE_THRESHOLD = 0.5

export function getFocusStyle(focus: number) {
  const distance = Math.min(Math.abs(focus), MAX_FOCUS_DISTANCE)
  return {
    opacity: Math.max(1 - distance * OPACITY_STEP, MIN_OPACITY),
  }
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
      className="flex shrink-0 snap-center items-center justify-center px-2"
      style={{ opacity, height: ITEM_HEIGHT_PX }}
    >
      <button
        type="button"
        onClick={() => onSelect(scale)}
        className={`h-full w-full overflow-hidden px-3 py-2 text-left transition-colors ${
          isActive ? 'bg-surface' : 'bg-transparent'
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-1 md:flex-row md:items-center md:gap-3">
          <ScaleName scale={scale} layout="sidebar" showDiatonicBadge={false} />
          <div className="max-w-[1000px] md:flex-1">
            <ScaleRow
              scale={scale}
              mode={mode}
              rootSemitone={rootSemitone}
              highlightedChordId={highlightedChordId}
            />
          </div>
        </div>
      </button>
    </div>
  )
}
