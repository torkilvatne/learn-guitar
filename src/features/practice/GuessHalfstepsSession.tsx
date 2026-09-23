import { useMemo, useState } from 'react'
import { CircleHelp } from 'lucide-react'
import { IntervalArcs } from '../../components/IntervalArcs'
import { RootNoteSelector } from '../../components/RootNoteSelector'
import { ScaleRow } from '../../components/ScaleRow'
import { Button } from '../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import { INTERVALS, type IntervalInfo } from '../../domain/constants'
import { formatIntervalName, getInterval } from '../../domain/intervals'
import { pickDistinctRandom, shuffle } from '../../domain/random'
import { FeedbackBanner } from './FeedbackBanner'
import { MultipleChoiceOptions } from './MultipleChoiceOptions'
import { PracticeSessionShell } from './PracticeSessionShell'
import { useRandomPick } from './useRandomPick'

const OPTION_COUNT = 4
const TARGET_SEMITONES = Array.from({ length: 12 }, (_, index) => index + 1)
const REFERENCE_INTERVALS = [...INTERVALS].reverse()

export function GuessHalfstepsSession() {
  const [rootSemitone, setRootSemitone] = useState(0)
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [results, setResults] = useState<boolean[]>([])

  function handleEnd() {
    setStarted(false)
    setScore({ correct: 0, total: 0 })
    setResults([])
  }

  return (
    <PracticeSessionShell
      title="Guess the half-steps"
      description="Pick a root note. Each round names an interval — count how many half-steps it spans."
      score={started ? score : undefined}
      results={started ? results : undefined}
    >
      {started ? (
        <GuessHalfstepsLoop
          rootSemitone={rootSemitone}
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
        <div className="flex w-full flex-col gap-4">
          <RootNoteSelector rootSemitone={rootSemitone} onSelect={setRootSemitone} />
          <Button type="button" onClick={() => setStarted(true)}>
            Start practice
          </Button>
        </div>
      )}
    </PracticeSessionShell>
  )
}

interface GuessHalfstepsLoopProps {
  rootSemitone: number
  onResult: (correct: boolean) => void
  onEnd: () => void
}

function GuessHalfstepsLoop({ rootSemitone, onResult, onEnd }: GuessHalfstepsLoopProps) {
  const [target, nextTarget] = useRandomPick(TARGET_SEMITONES)
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  const correct = getInterval(target)

  const options = useMemo(() => {
    const wrong = pickDistinctRandom(
      INTERVALS.filter((interval) => interval.semitones !== target),
      OPTION_COUNT - 1,
    )
    return shuffle([correct, ...wrong])
  }, [target, correct])

  const syntheticScale = useMemo(
    () => ({ id: 'halfsteps-quiz', name: '', degrees: [0, target] }),
    [target],
  )

  function handleSelect(option: IntervalInfo) {
    if (option.semitones === target) {
      setSolved(true)
      onResult(wrongAttempts.size === 0)
    } else {
      setWrongAttempts((previous) => new Set(previous).add(String(option.semitones)))
    }
  }

  function handleNext() {
    setWrongAttempts(new Set())
    setSolved(false)
    nextTarget()
  }

  return (
    <>
      <div className="flex w-full justify-end">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Interval reference"
          onClick={() => setHelpOpen(true)}
        >
          <CircleHelp strokeWidth={2.75} />
        </Button>
      </div>
      <div className="w-full">
        <ScaleRow
          scale={syntheticScale}
          mode="notes"
          rootSemitone={rootSemitone}
          showDegreeLabels={false}
        />
        <IntervalArcs scale={syntheticScale} direction="direct" />
      </div>
      <MultipleChoiceOptions
        options={options}
        getKey={(option) => String(option.semitones)}
        getLabel={(option) => String(option.semitones)}
        correctOption={correct}
        wrongKeys={wrongAttempts}
        solved={solved}
        onSelect={handleSelect}
      />
      {solved && <FeedbackBanner onNext={handleNext} />}
      <Button type="button" variant="ghost" size="sm" onClick={onEnd}>
        Change root
      </Button>
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interval reference</DialogTitle>
          </DialogHeader>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-muted">
                <th className="pb-2 font-medium">Interval</th>
                <th className="pb-2 text-right font-medium">Half-steps</th>
              </tr>
            </thead>
            <tbody>
              {REFERENCE_INTERVALS.map((interval) => (
                <tr key={interval.semitones} className="border-t border-border">
                  <td className="py-1.5">{formatIntervalName(interval)}</td>
                  <td className="py-1.5 text-right font-semibold">{interval.semitones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </>
  )
}
