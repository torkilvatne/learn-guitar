import { useMemo, useState } from 'react'
import { IntervalArcs } from '../../components/IntervalArcs'
import { RootNoteSelector } from '../../components/RootNoteSelector'
import { ScaleRow } from '../../components/ScaleRow'
import { Button } from '../../components/ui/button'
import { INTERVALS, type IntervalInfo } from '../../domain/constants'
import { formatIntervalName, getInvertedInterval } from '../../domain/intervals'
import { pickDistinctRandom, shuffle } from '../../domain/random'
import { FeedbackBanner } from './FeedbackBanner'
import { MultipleChoiceOptions } from './MultipleChoiceOptions'
import { PracticeSessionShell } from './PracticeSessionShell'
import { useRandomPick } from './useRandomPick'

const OPTION_COUNT = 4
const TARGET_SEMITONES = Array.from({ length: 12 }, (_, index) => index + 1)

export function GuessInversionSession() {
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
      title="Guess the inversion"
      description="Pick a root note. Each round shows an interval below the scale row — name the interval its inversion forms above."
      score={started ? score : undefined}
      results={started ? results : undefined}
    >
      {started ? (
        <GuessInversionLoop
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

interface GuessInversionLoopProps {
  rootSemitone: number
  onResult: (correct: boolean) => void
  onEnd: () => void
}

function GuessInversionLoop({ rootSemitone, onResult, onEnd }: GuessInversionLoopProps) {
  const [target, nextTarget] = useRandomPick(TARGET_SEMITONES)
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState(false)

  const invertedInterval = getInvertedInterval(target)

  const options = useMemo(() => {
    const wrong = pickDistinctRandom(
      INTERVALS.filter((interval) => interval.semitones !== invertedInterval.semitones),
      OPTION_COUNT - 1,
    )
    return shuffle([invertedInterval, ...wrong])
  }, [invertedInterval])

  const syntheticScale = useMemo(
    () => ({ id: 'inversion-quiz', name: '', degrees: [0, target] }),
    [target],
  )
  const invertedArcScale = useMemo(
    () => ({ id: 'inversion-quiz-inverted', name: '', degrees: [target] }),
    [target],
  )

  function handleSelect(option: IntervalInfo) {
    if (option.semitones === invertedInterval.semitones) {
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
      <div className="w-full">
        <IntervalArcs scale={invertedArcScale} direction="inverted" maskLabel={!solved} />
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
        getLabel={(option) => formatIntervalName(option)}
        correctOption={invertedInterval}
        wrongKeys={wrongAttempts}
        solved={solved}
        onSelect={handleSelect}
      />
      {solved && <FeedbackBanner onNext={handleNext} />}
      <Button type="button" variant="ghost" size="sm" onClick={onEnd}>
        Change root
      </Button>
    </>
  )
}
