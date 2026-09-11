import { useState } from 'react'
import { IntervalArcs } from '../components/IntervalArcs'
import { ScaleRow } from '../components/ScaleRow'
import { Label } from '../components/ui/label'
import { Switch } from '../components/ui/switch'
import type { DisplayMode } from '../domain/scaleEngine'
import type { Scale } from '../domain/types'

export interface IntervalsPaneProps {
  scale: Scale
  mode: DisplayMode
  rootSemitone: number
  highlightedChordId?: string | null
}

/**
 * The shadcn Field block (title + two-line description + switch, in a 384px column
 * above the grid) is replaced by a single inline toggle. It was the largest thing on
 * the screen and explained something the user can see by flipping it.
 *
 * The grid and its arcs now sit in one rounded surface panel rather than floating
 * loose on the page background.
 */
export function IntervalsPane({
  scale,
  mode,
  rootSemitone,
  highlightedChordId,
}: IntervalsPaneProps) {
  const [showArrows, setShowArrows] = useState(true)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5 self-end">
        <Switch id="show-arrows" checked={showArrows} onCheckedChange={setShowArrows} />
        <Label htmlFor="show-arrows" className="text-sm">
          Interval arrows
        </Label>
      </div>

      <div className="rounded-[32px] bg-surface px-9 py-8 shadow-elev-sm">
        <IntervalArcs scale={scale} direction="inverted" visible={showArrows} />
        <div className="my-2">
          <ScaleRow
            scale={scale}
            mode={mode}
            rootSemitone={rootSemitone}
            highlightedChordId={highlightedChordId}
          />
        </div>
        <IntervalArcs scale={scale} direction="direct" visible={showArrows} />
      </div>
    </div>
  )
}
