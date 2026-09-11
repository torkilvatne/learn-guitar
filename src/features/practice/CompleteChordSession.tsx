import { useState } from 'react'
import { Button } from '../../components/ui/button'
import type { Chord } from '../../domain/chords'
import { isDualLabel, NOTE_STEPS } from '../../domain/constants'
import { ChordPicker } from './ChordPicker'
import { CompleteChordLoop } from './CompleteChordLoop'
import { NoteGroupPicker } from './NoteGroupPicker'
import { PracticeSessionShell } from './PracticeSessionShell'

const DEFAULT_ROOT_IDS = new Set(
  NOTE_STEPS.filter((step) => !isDualLabel(step.label)).map((step) => String(step.semitone)),
)

export function CompleteChordSession() {
  const [selectedChord, setSelectedChord] = useState<Chord | null>(null)
  const [selectedRootIds, setSelectedRootIds] = useState<Set<string>>(DEFAULT_ROOT_IDS)
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const rootPool = NOTE_STEPS.filter((step) => selectedRootIds.has(String(step.semitone))).map(
    (step) => step.semitone,
  )
  const canStart = selectedChord !== null && rootPool.length > 0

  function handleEnd() {
    setStarted(false)
    setScore({ correct: 0, total: 0 })
  }

  return (
    <PracticeSessionShell
      title="Complete the chord"
      description="Pick a chord and which root notes to practice. Each round shows the root — pick the rest of the chord's notes from the shuffled row below."
      score={started ? score : undefined}
    >
      {started && selectedChord && canStart ? (
        <CompleteChordLoop
          chord={selectedChord}
          rootPool={rootPool}
          onResult={(correct) =>
            setScore((previous) => ({
              correct: previous.correct + (correct ? 1 : 0),
              total: previous.total + 1,
            }))
          }
          onEnd={handleEnd}
        />
      ) : (
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-text-muted">Choose the chord to practice.</p>
            <ChordPicker selectedChordId={selectedChord?.id ?? null} onChange={setSelectedChord} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-text-muted">Choose which root notes can appear.</p>
            <NoteGroupPicker selectedIds={selectedRootIds} onChange={setSelectedRootIds} />
          </div>
          {!canStart && (
            <p className="text-sm text-destructive">
              Pick a chord and at least one root note to start.
            </p>
          )}
          <Button type="button" disabled={!canStart} onClick={() => setStarted(true)}>
            Start practice
          </Button>
        </div>
      )}
    </PracticeSessionShell>
  )
}
