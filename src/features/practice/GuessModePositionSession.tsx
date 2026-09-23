import { useMemo, useState } from 'react'
import { ScaleRow } from '../../components/ScaleRow'
import { getModeProgressionInfo, getModesInProgressionOrder } from '../../domain/modes'
import { pickDistinctRandom, pickRandom, pickRandomExcluding, shuffle } from '../../domain/random'
import type { Scale } from '../../domain/types'
import { useSettings } from '../../state/settings'
import { FeedbackBanner } from './FeedbackBanner'
import { MultipleChoiceOptions } from './MultipleChoiceOptions'
import { PracticeSessionShell } from './PracticeSessionShell'

const OPTION_COUNT = 4
const ROOT_DEGREES = [1, 6]
const ROOT_DEGREE_LABELS: Record<number, string> = { 1: 'major', 6: 'minor' }

interface ModePositionRound {
  rootDegree: number
  scale: Scale
  numeral: string
}

function pickRound(previous?: ModePositionRound): ModePositionRound {
  const rootDegree = pickRandom(ROOT_DEGREES)
  const modes = getModesInProgressionOrder(rootDegree)
  const scale = previous ? pickRandomExcluding(modes, previous.scale) : pickRandom(modes)
  const numeral = getModeProgressionInfo(scale, rootDegree)!.numeral
  return { rootDegree, scale, numeral }
}

export function GuessModePositionSession() {
  const { mode, rootSemitone } = useSettings()
  const [round, setRound] = useState<ModePositionRound>(() => pickRound())
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [results, setResults] = useState<boolean[]>([])

  const options = useMemo(() => {
    const modes = getModesInProgressionOrder(round.rootDegree)
    const otherNumerals = modes
      .filter((candidate) => candidate.id !== round.scale.id)
      .map((candidate) => getModeProgressionInfo(candidate, round.rootDegree)!.numeral)
    const wrong = pickDistinctRandom(otherNumerals, OPTION_COUNT - 1)
    return shuffle([round.numeral, ...wrong])
  }, [round])

  function handleSelect(option: string) {
    if (option === round.numeral) {
      setSolved(true)
      const isClean = wrongAttempts.size === 0
      setScore((previous) => ({
        correct: previous.correct + (isClean ? 1 : 0),
        total: previous.total + 1,
      }))
      setResults((previous) => [...previous, isClean])
    } else {
      setWrongAttempts((previous) => new Set(previous).add(option))
    }
  }

  function handleNext() {
    setWrongAttempts(new Set())
    setSolved(false)
    setRound((previous) => pickRound(previous))
  }

  return (
    <PracticeSessionShell
      title="Guess the mode's position"
      description="A diatonic mode will be shown. Pick its roman numeral position in the major or minor key progression."
      score={score}
      results={results}
    >
      <p className="text-center text-text-muted">
        What's this mode's position in the{' '}
        <span className="font-semibold text-text">{ROOT_DEGREE_LABELS[round.rootDegree]} key</span>{' '}
        progression?
      </p>
      <div className="w-full">
        <ScaleRow scale={round.scale} mode={mode} rootSemitone={rootSemitone} />
      </div>
      <MultipleChoiceOptions
        options={options}
        getKey={(option) => option}
        getLabel={(option) => option}
        correctOption={round.numeral}
        wrongKeys={wrongAttempts}
        solved={solved}
        onSelect={handleSelect}
      />
      {solved && <FeedbackBanner onNext={handleNext} />}
    </PracticeSessionShell>
  )
}
