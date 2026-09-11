import { useState } from 'react'
import { RootNoteSelector } from '../../components/RootNoteSelector'
import { Button } from '../../components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '../../components/ui/toggle-group'
import { EndlessNoteLoop } from './EndlessNoteLoop'
import { PracticeSessionShell } from './PracticeSessionShell'
import { StaticNoteLoop } from './StaticNoteLoop'

type GuessNoteMode = 'endless' | 'static'

export function GuessNoteSession() {
  const [mode, setMode] = useState<GuessNoteMode>('endless')
  const [staticRoot, setStaticRoot] = useState(0)
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  function handleEnd() {
    setStarted(false)
    setScore({ correct: 0, total: 0 })
  }

  function handleResult(correct: boolean) {
    setScore((previous) => ({
      correct: previous.correct + (correct ? 1 : 0),
      total: previous.total + 1,
    }))
  }

  return (
    <PracticeSessionShell
      title="Guess the note"
      description="See the root note and an arrow pointing to another position on the grid. Guess which note the arrow points to."
      score={started ? score : undefined}
    >
      {started ? (
        mode === 'endless' ? (
          <EndlessNoteLoop onResult={handleResult} onEnd={handleEnd} />
        ) : (
          <StaticNoteLoop staticRoot={staticRoot} onResult={handleResult} onEnd={handleEnd} />
        )
      ) : (
        <div className="flex w-full flex-col items-center gap-4">
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(value) => value && setMode(value as GuessNoteMode)}
            className="border border-border p-1"
          >
            <ToggleGroupItem value="endless">Endless</ToggleGroupItem>
            <ToggleGroupItem value="static">Static root</ToggleGroupItem>
          </ToggleGroup>
          <p className="max-w-sm text-center text-sm text-text-muted">
            {mode === 'endless'
              ? 'Start on a random note. Every correct guess becomes the new root and a fresh interval arrow appears — an endless chain.'
              : 'Pick a root note that stays fixed. Every round shows a fresh interval — guess which note it points to.'}
          </p>
          {mode === 'static' && (
            <RootNoteSelector rootSemitone={staticRoot} onSelect={setStaticRoot} />
          )}
          <Button type="button" onClick={() => setStarted(true)}>
            Start practice
          </Button>
        </div>
      )}
    </PracticeSessionShell>
  )
}
