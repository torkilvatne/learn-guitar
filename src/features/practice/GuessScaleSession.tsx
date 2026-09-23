import { useMemo, useState } from 'react'
import { ChromaticGrid } from '../../components/ChromaticGrid'
import { Button } from '../../components/ui/button'
import { pickDistinctRandom, shuffle } from '../../domain/random'
import { SCALES } from '../../domain/scales'
import type { Scale } from '../../domain/types'
import { useSettings } from '../../state/settings'
import { FeedbackBanner } from './FeedbackBanner'
import { MultipleChoiceOptions } from './MultipleChoiceOptions'
import { PracticeSessionShell } from './PracticeSessionShell'
import { ScaleGroupPicker } from './ScaleGroupPicker'
import { useRandomPick } from './useRandomPick'

const OPTION_COUNT = 4
const ALL_SCALE_IDS = new Set(SCALES.map((scale) => scale.id))

export function GuessScaleSession() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(ALL_SCALE_IDS)
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [results, setResults] = useState<boolean[]>([])

  const pool = useMemo(
    () => SCALES.filter((scale) => selectedIds.has(scale.id)),
    [selectedIds],
  )
  const canStart = pool.length >= OPTION_COUNT

  function handleEnd() {
    setStarted(false)
    setScore({ correct: 0, total: 0 })
    setResults([])
  }

  return (
    <PracticeSessionShell
      title="Guess which scale"
      description="A random scale will appear on the grid. Pick its name from the four choices below."
      score={started ? score : undefined}
      results={started ? results : undefined}
    >
      {started && canStart ? (
        <GuessScaleLoop
          pool={pool}
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
          <p className="text-sm text-text-muted">
            Choose which scales can show up. Select a whole group at once, or pick individual
            scales.
          </p>
          <ScaleGroupPicker selectedIds={selectedIds} onChange={setSelectedIds} />
          {!canStart && (
            <p className="text-sm text-destructive">
              Select at least {OPTION_COUNT} scales to start.
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

interface GuessScaleLoopProps {
  pool: Scale[]
  onResult: (correct: boolean) => void
  onEnd: () => void
}

function GuessScaleLoop({ pool, onResult, onEnd }: GuessScaleLoopProps) {
  const { mode, rootSemitone } = useSettings()
  const [scale, nextScale] = useRandomPick(pool)
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState(false)

  const options = useMemo(() => {
    const wrong = pickDistinctRandom(
      pool.filter((candidate) => candidate.id !== scale.id),
      OPTION_COUNT - 1,
    )
    return shuffle([scale, ...wrong])
  }, [pool, scale])

  function handleSelect(option: Scale) {
    if (option.id === scale.id) {
      setSolved(true)
      onResult(wrongAttempts.size === 0)
    } else {
      setWrongAttempts((previous) => new Set(previous).add(option.id))
    }
  }

  function handleNext() {
    setWrongAttempts(new Set())
    setSolved(false)
    nextScale()
  }

  return (
    <>
      <ChromaticGrid
        mode={mode}
        rootSemitone={rootSemitone}
        selectedSemitones={scale.degrees}
        variant="outline"
      />
      <MultipleChoiceOptions
        options={options}
        getKey={(option) => option.id}
        getLabel={(option) => option.name}
        correctOption={scale}
        wrongKeys={wrongAttempts}
        solved={solved}
        onSelect={handleSelect}
      />
      {solved && <FeedbackBanner onNext={handleNext} />}
      <Button type="button" variant="ghost" size="sm" onClick={onEnd}>
        Change scales
      </Button>
    </>
  )
}
