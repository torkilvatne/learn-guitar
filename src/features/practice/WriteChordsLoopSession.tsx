import { useState } from 'react'
import { ChromaticGrid } from '../../components/ChromaticGrid'
import { Button } from '../../components/ui/button'
import { CHORDS, chordExactlyMatchesSemitones, type Chord } from '../../domain/chords'
import { isDualLabel, NOTE_STEPS } from '../../domain/constants'
import { pickRandom, pickRandomExcluding } from '../../domain/random'
import type { DisplayMode } from '../../domain/scaleEngine'
import { useSettings } from '../../state/settings'
import { ChordGroupPicker } from './ChordGroupPicker'
import { FeedbackBanner, type FeedbackStatus } from './FeedbackBanner'
import { NoteAnswerInput } from './NoteAnswerInput'
import { PracticeSessionShell } from './PracticeSessionShell'

const ROOT_SEMITONES = Array.from({ length: 12 }, (_, semitone) => semitone)

function rootLabelText(rootSemitone: number): string {
  const label = NOTE_STEPS[rootSemitone].label
  return isDualLabel(label) ? `${label.sharp}/${label.flat}` : label
}

interface ChordRound {
  chord: Chord
  root: number
}

function pickChordRound(chords: Chord[], previous?: Chord): ChordRound {
  const chord = previous ? pickRandomExcluding(chords, previous) : pickRandom(chords)
  const root = pickRandom(ROOT_SEMITONES)
  return { chord, root }
}

export function WriteChordsLoopSession() {
  const { mode } = useSettings()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [results, setResults] = useState<boolean[]>([])

  const selectedChords = CHORDS.filter((chord) => selectedIds.has(chord.id))

  function handleEnd() {
    setStarted(false)
    setScore({ correct: 0, total: 0 })
    setResults([])
  }

  return (
    <PracticeSessionShell
      title="Write the chords"
      description="Pick the chords you want to practice. Each round shows a chord name and a random root note — write out the resulting notes. A new round starts until you end the session."
      score={started ? score : undefined}
      results={started ? results : undefined}
    >
      {started && selectedChords.length > 0 ? (
        <WriteChordsLoop
          chords={selectedChords}
          mode={mode}
          onResult={(correct) => {
            setScore((previous) => ({
              correct: previous.correct + (correct ? 1 : 0),
              total: previous.total + 1,
            }))
            setResults((previous) => [...previous, correct])
          }}
          onEnd={handleEnd}
        />
      ) : (
        <div className="flex w-full flex-col gap-3">
          <p className="text-sm text-text-muted">Select the chords you want to practice.</p>
          <ChordGroupPicker selectedIds={selectedIds} onChange={setSelectedIds} />
          <Button
            type="button"
            disabled={selectedChords.length === 0}
            onClick={() => setStarted(true)}
          >
            Start practice
          </Button>
        </div>
      )}
    </PracticeSessionShell>
  )
}

interface WriteChordsLoopProps {
  chords: Chord[]
  mode: DisplayMode
  onResult: (correct: boolean) => void
  onEnd: () => void
}

function WriteChordsLoop({ chords, mode, onResult, onEnd }: WriteChordsLoopProps) {
  const [round, setRound] = useState(() => pickChordRound(chords))
  const [roundIndex, setRoundIndex] = useState(0)

  return (
    <>
      <WriteChordSession
        key={`${round.chord.id}-${round.root}-${roundIndex}`}
        chord={round.chord}
        root={round.root}
        mode={mode}
        onResult={onResult}
        onNext={() => {
          setRoundIndex((previous) => previous + 1)
          setRound((previous) => pickChordRound(chords, previous.chord))
        }}
      />
      <Button type="button" variant="ghost" size="sm" onClick={onEnd}>
        End practice
      </Button>
    </>
  )
}

interface WriteChordSessionProps {
  chord: Chord
  root: number
  mode: DisplayMode
  onNext: () => void
  onResult: (correct: boolean) => void
}

function WriteChordSession({ chord, root, mode, onNext, onResult }: WriteChordSessionProps) {
  const [value, setValue] = useState<number[]>([])
  const [feedback, setFeedback] = useState<FeedbackStatus | null>(null)

  function handleSubmit() {
    const matches = chordExactlyMatchesSemitones(chord, value)
    setFeedback(matches ? 'correct' : 'incorrect')
    onResult(matches)
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <p className="text-center text-text-muted">
        Build a{' '}
        <span className="font-semibold text-text">
          {chord.name} ({chord.shorthand})
        </span>{' '}
        chord starting on <span className="font-semibold text-text">{rootLabelText(root)}</span>
      </p>
      <NoteAnswerInput
        mode={mode}
        rootSemitone={root}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        disabled={feedback !== null}
      />
      {feedback && (
        <FeedbackBanner
          status={feedback}
          correctAnswer={
            feedback === 'incorrect' ? (
              <ChromaticGrid
                mode={mode}
                rootSemitone={root}
                selectedSemitones={chord.semitones}
                variant="outline"
              />
            ) : undefined
          }
          onNext={onNext}
        />
      )}
    </div>
  )
}
