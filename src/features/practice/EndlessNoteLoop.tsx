import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../../components/ui/button'
import { NOTE_STEPS, noteLabelText, type NoteStep } from '../../domain/constants'
import { transposeSemitone } from '../../domain/intervals'
import { pickDistinctRandom, pickRandom, shuffle } from '../../domain/random'
import { EndlessNoteTrack, type EndlessNoteTrackPhase } from './EndlessNoteTrack'
import { MultipleChoiceOptions } from './MultipleChoiceOptions'
import { useRandomPick } from './useRandomPick'

const OPTION_COUNT = 4
const INTERVAL_SPANS = Array.from({ length: 12 }, (_, index) => index + 1)
const ALL_SEMITONES = NOTE_STEPS.map((step) => step.semitone)
const CORRECT_PAUSE_MS = 500

export interface EndlessNoteLoopProps {
  onResult: (correct: boolean) => void
  onEnd: () => void
}

export function EndlessNoteLoop({ onResult, onEnd }: EndlessNoteLoopProps) {
  const [root, setRoot] = useState(() => pickRandom(ALL_SEMITONES))
  const [span, nextSpan] = useRandomPick(INTERVAL_SPANS)
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState(false)
  const [phase, setPhase] = useState<EndlessNoteTrackPhase>('question')
  const pauseTimeoutRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (pauseTimeoutRef.current !== null) {
        window.clearTimeout(pauseTimeoutRef.current)
      }
    },
    [],
  )

  const target = transposeSemitone(root, span)
  const correctOption = NOTE_STEPS[target]

  const options = useMemo(() => {
    const wrong = pickDistinctRandom(
      NOTE_STEPS.filter((step) => step.semitone !== target),
      OPTION_COUNT - 1,
    )
    return shuffle([correctOption, ...wrong])
  }, [target, correctOption])

  function handleSelect(option: NoteStep) {
    if (option.semitone === target) {
      setSolved(true)
      onResult(wrongAttempts.size === 0)
      setPhase('correct')
      pauseTimeoutRef.current = window.setTimeout(() => {
        setPhase('sliding')
      }, CORRECT_PAUSE_MS)
    } else {
      setWrongAttempts((previous) => new Set(previous).add(String(option.semitone)))
    }
  }

  function handleSlideEnd() {
    setRoot(target)
    setWrongAttempts(new Set())
    setSolved(false)
    setPhase('question')
    nextSpan()
  }

  return (
    <>
      <EndlessNoteTrack
        root={root}
        span={span}
        target={target}
        phase={phase}
        onSlideEnd={handleSlideEnd}
      />
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
        End practice
      </Button>
    </>
  )
}
