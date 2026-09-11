import { useState } from 'react'
import { IntervalArcs } from '../components/IntervalArcs'
import { ScaleRow } from '../components/ScaleRow'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '../components/ui/field'
import { Switch } from '../components/ui/switch'
import type { DisplayMode } from '../domain/scaleEngine'
import type { Scale } from '../domain/types'

export interface IntervalsPaneProps {
  scale: Scale
  mode: DisplayMode
  rootSemitone: number
  highlightedChordId?: string | null
}

export function IntervalsPane({
  scale,
  mode,
  rootSemitone,
  highlightedChordId,
}: IntervalsPaneProps) {
  const [showArrows, setShowArrows] = useState(true)

  return (
    <div>
      <FieldLabel htmlFor="show-arrows" className="max-w-sm">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Arrows</FieldTitle>
            <FieldDescription>
              Show the interval and inverted interval arrows above and below the scale
              row.
            </FieldDescription>
          </FieldContent>
          <Switch id="show-arrows" checked={showArrows} onCheckedChange={setShowArrows} />
        </Field>
      </FieldLabel>
      <div className="mt-8">
        <IntervalArcs scale={scale} direction="inverted" visible={showArrows} />
        <div className="my-1">
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
