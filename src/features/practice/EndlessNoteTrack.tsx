import { useEffect, useRef, useState, type TransitionEvent } from 'react'
import { Box } from '../../components/Box'
import { IntervalArcs } from '../../components/IntervalArcs'
import { NOTE_STEPS } from '../../domain/constants'

const VISIBLE_COLUMNS = 13
const PEEK_BEFORE = 3
const MAX_SPAN = 12
const PEEK_AFTER = 3
const TRACK_LENGTH = PEEK_BEFORE + 1 + MAX_SPAN + PEEK_AFTER

const FADE_MASK = 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'

export type EndlessNoteTrackPhase = 'question' | 'correct' | 'sliding'

export interface EndlessNoteTrackProps {
  root: number
  span: number
  target: number
  phase: EndlessNoteTrackPhase
  onSlideEnd: () => void
}

export function EndlessNoteTrack({ root, span, target, phase, onSlideEnd }: EndlessNoteTrackProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [boxWidth, setBoxWidth] = useState(0)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const observer = new ResizeObserver(() => {
      setBoxWidth(viewport.offsetWidth / (PEEK_BEFORE + VISIBLE_COLUMNS))
    })
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  const isRevealed = phase === 'correct' || phase === 'sliding'
  const isSliding = phase === 'sliding'
  const activeOffset = isSliding ? span : 0

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.propertyName === 'transform' && isSliding) {
      onSlideEnd()
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-full">
        <div
          ref={viewportRef}
          className="relative w-full overflow-hidden"
          style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(${-activeOffset * boxWidth}px)`,
              transition: isSliding ? 'transform 500ms ease-in-out' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {Array.from({ length: TRACK_LENGTH }, (_, index) => {
              const column = index - PEEK_BEFORE
              const isRoot = column === 0
              const isTarget = isRevealed && column === span
              const label = isRoot
                ? NOTE_STEPS[root].label
                : isTarget
                  ? NOTE_STEPS[target].label
                  : ''
              return (
                <div key={index} style={{ width: boxWidth, flexShrink: 0 }}>
                  <Box label={label} highlighted={isRoot || isTarget} variant="outline" />
                </div>
              )
            })}
          </div>
        </div>
        {boxWidth > 0 && (
          <div style={{ width: VISIBLE_COLUMNS * boxWidth, marginLeft: PEEK_BEFORE * boxWidth }}>
            <IntervalArcs
              scale={{ id: 'guess-note-arc', name: '', degrees: [0, span] }}
              direction="direct"
              visible={phase === 'question'}
            />
          </div>
        )}
      </div>
    </div>
  )
}
