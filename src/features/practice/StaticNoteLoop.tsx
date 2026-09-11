import { useEffect, useMemo, useRef, useState } from 'react'
import { Box } from '../../components/Box'
import { IntervalArcs } from '../../components/IntervalArcs'
import { Button } from '../../components/ui/button'
import { NOTE_STEPS, noteLabelText, type NoteStep } from '../../domain/constants'
import { transposeSemitone } from '../../domain/intervals'
import { pickDistinctRandom, shuffle } from '../../domain/random'
import { MultipleChoiceOptions } from './MultipleChoiceOptions'
import { useRandomPick } from './useRandomPick'

const REVEAL_DURATION_MS = 800
const OPTION_COUNT = 4
const COLUMN_COUNT = 13
const INTERVAL_SPANS = Array.from({ length: 12 }, (_, index) => index + 1)

export interface StaticNoteLoopProps {
  staticRoot: number
  onResult: (correct: boolean) => void
  onEnd: () => void
}

export function StaticNoteLoop({ staticRoot, onResult, onEnd }: StaticNoteLoopProps) {
  const [span, nextSpan] = useRandomPick(INTERVAL_SPANS)
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState(false)
  const [revealing, setRevealing] = useState(false)
  const revealTimeoutRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (revealTimeoutRef.current !== null) {
        window.clearTimeout(revealTimeoutRef.current)
      }
    },
    [],
  )

  const target = transposeSemitone(staticRoot, span)
  const correctOption = NOTE_STEPS[target]

  const options = useMemo(() => {
    const wrong = pickDistinctRandom(
      NOTE_STEPS.filter((step) => step.semitone !== target),
      OPTION_COUNT - 1,
    )
    return shuffle([correctOption, ...wrong])
  }, [target, correctOption])

  const arcScale = { id: 'guess-note-arc', name: '', degrees: [0, span] }

  function handleSelect(option: NoteStep) {
    if (option.semitone === target) {
      setSolved(true)
      onResult(wrongAttempts.size === 0)
      setRevealing(true)
      revealTimeoutRef.current = window.setTimeout(() => {
        setWrongAttempts(new Set())
        setSolved(false)
        setRevealing(false)
        nextSpan()
      }, REVEAL_DURATION_MS)
    } else {
      setWrongAttempts((previous) => new Set(previous).add(String(option.semitone)))
    }
  }

  return (
    <>
      <div className="flex w-full flex-col items-center gap-4">
        <div className="w-full">
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${COLUMN_COUNT}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: COLUMN_COUNT }, (_, column) => {
              const isRoot = column === 0
              const isRevealTarget = revealing && column === span
              const label = isRoot
                ? NOTE_STEPS[staticRoot].label
                : isRevealTarget
                  ? correctOption.label
                  : ''
              return (
                <Box
                  key={column}
                  label={label}
                  highlighted={isRoot || isRevealTarget}
                  variant="outline"
                />
              )
            })}
          </div>
          <IntervalArcs scale={arcScale} direction="direct" />
        </div>
      </div>
      <MultipleChoiceOptions
        options={options}
        getKey={(option) => String(option.semitone)}
        getLabel={(option) => noteLabelText(option.label)}
        correctOption={correctOption}
        wrongKeys={wrongAttempts}
        solved={solved}
        onSelect={handleSelect}
      />
      <Button type="button" variant="ghost" size="sm" onClick={onEnd}>
        Change root
      </Button>
    </>
  )
}
