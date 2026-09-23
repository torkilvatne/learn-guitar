import { useMemo, useState } from 'react'
import { IntervalArcs } from '../../components/IntervalArcs'
import { ScaleRow } from '../../components/ScaleRow'
import { INTERVALS, type IntervalInfo } from '../../domain/constants'
import { formatIntervalName, getInterval } from '../../domain/intervals'
import { pickDistinctRandom, shuffle } from '../../domain/random'
import { useSettings } from '../../state/settings'
import { FeedbackBanner } from './FeedbackBanner'
import { MultipleChoiceOptions } from './MultipleChoiceOptions'
import { PracticeSessionShell } from './PracticeSessionShell'
import { useRandomPick } from './useRandomPick'

const OPTION_COUNT = 4
const TARGET_SEMITONES = Array.from({ length: 12 }, (_, index) => index + 1)

export function GuessIntervalSession() {
  const { rootSemitone } = useSettings()
  const [target, nextTarget] = useRandomPick(TARGET_SEMITONES)
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [results, setResults] = useState<boolean[]>([])

  const correct = getInterval(target)

  const options = useMemo(() => {
    const wrong = pickDistinctRandom(
      INTERVALS.filter((interval) => interval.semitones !== target),
      OPTION_COUNT - 1,
    )
    return shuffle([correct, ...wrong])
  }, [target, correct])

  const syntheticScale = useMemo(
    () => ({ id: 'interval-quiz', name: '', degrees: [0, target] }),
    [target],
  )

  function handleSelect(option: IntervalInfo) {
    if (option.semitones === target) {
      setSolved(true)
      const isClean = wrongAttempts.size === 0
      setScore((previous) => ({
        correct: previous.correct + (isClean ? 1 : 0),
        total: previous.total + 1,
      }))
      setResults((previous) => [...previous, isClean])
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
    <PracticeSessionShell
      title="Guess the interval"
      description="An arrow will point from the root to another note on the grid. Pick the interval name that matches the distance between them."
      score={score}
      results={results}
    >
      <div className="w-full">
        <ScaleRow
          scale={syntheticScale}
          mode="notes"
          rootSemitone={rootSemitone}
          showDegreeLabels={false}
        />
        <IntervalArcs scale={syntheticScale} direction="direct" showLabels={solved} />
      </div>
      <MultipleChoiceOptions
        options={options}
        getKey={(option) => String(option.semitones)}
        getLabel={(option) => formatIntervalName(option)}
        correctOption={correct}
        wrongKeys={wrongAttempts}
        solved={solved}
        onSelect={handleSelect}
      />
      {solved && <FeedbackBanner onNext={handleNext} />}
    </PracticeSessionShell>
  )
}
