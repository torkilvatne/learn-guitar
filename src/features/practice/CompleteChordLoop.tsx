import { useEffect, useMemo, useState } from 'react'
import { Box } from '../../components/Box'
import { IntervalArcs } from '../../components/IntervalArcs'
import { Button } from '../../components/ui/button'
import {
  isDualLabel,
  NATURAL_ABSOLUTE_SEMITONE_FOR_LETTER_CODE,
  NOTE_STEPS,
  SHARP_ABSOLUTE_SEMITONE_FOR_LETTER_CODE,
  type NoteStep,
} from '../../domain/constants'
import type { Chord } from '../../domain/chords'
import { shuffle } from '../../domain/random'
import { getNumberLabelForSemitone } from '../../domain/scaleEngine'
import { FeedbackBanner } from './FeedbackBanner'
import { useRandomPick } from './useRandomPick'

const COLUMN_COUNT = 12
const ALTERNATIVE_COLUMN_COUNT = 11

export interface CompleteChordLoopProps {
  chord: Chord
  rootPool: number[]
  onResult: (correct: boolean) => void
  onEnd: () => void
}

export function CompleteChordLoop({ chord, rootPool, onResult, onEnd }: CompleteChordLoopProps) {
  const [root, nextRoot] = useRandomPick(rootPool)
  const [foundSemitones, setFoundSemitones] = useState<Set<number>>(new Set([0]))
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState(false)

  const remainingTargets = useMemo(
    () => chord.semitones.filter((semitone) => semitone !== 0),
    [chord],
  )

  const alternatives = useMemo(
    () => shuffle(NOTE_STEPS.filter((step) => step.semitone !== root)),
    [root],
  )

  const arcScale = { id: 'complete-chord-arc', name: '', degrees: chord.semitones }

  function handleSelect(option: NoteStep) {
    if (solved || option.semitone === root) {
      return
    }
    const relative = (option.semitone - root + 12) % 12
    const key = String(option.semitone)
    if (foundSemitones.has(relative) || wrongAttempts.has(key)) {
      return
    }
    const isTarget = chord.semitones.includes(relative)
    if (isTarget) {
      const next = new Set(foundSemitones)
      next.add(relative)
      setFoundSemitones(next)
      if (remainingTargets.every((semitone) => next.has(semitone))) {
        setSolved(true)
        onResult(wrongAttempts.size === 0)
      }
    } else {
      setWrongAttempts((previous) => new Set(previous).add(key))
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const absoluteSemitone = event.shiftKey
        ? (SHARP_ABSOLUTE_SEMITONE_FOR_LETTER_CODE[event.code] ??
          NATURAL_ABSOLUTE_SEMITONE_FOR_LETTER_CODE[event.code])
        : NATURAL_ABSOLUTE_SEMITONE_FOR_LETTER_CODE[event.code]
      if (absoluteSemitone === undefined) {
        return
      }
      event.preventDefault()
      handleSelect(NOTE_STEPS[absoluteSemitone])
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  function handleNext() {
    setFoundSemitones(new Set([0]))
    setWrongAttempts(new Set())
    setSolved(false)
    nextRoot()
  }

  return (
    <>
      <p className="text-center text-sm text-text-muted">
        Build a{' '}
        <span className="font-semibold text-text">
          {chord.name} ({chord.shorthand})
        </span>{' '}
        chord.
      </p>
      <div className="w-full">
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${COLUMN_COUNT}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: COLUMN_COUNT }, (_, column) => {
            const isRoot = column === 0
            const isChordTone = chord.semitones.includes(column)
            const isFoundHere = isChordTone && foundSemitones.has(column)
            const label = isRoot
              ? NOTE_STEPS[root].label
              : isFoundHere
                ? NOTE_STEPS[(root + column) % 12].label
                : ''
            const degreeLabel = getNumberLabelForSemitone(column)
            return (
              <div key={column} className="flex flex-col">
                <Box
                  label={label}
                  highlighted={isRoot || isChordTone}
                  secondaryHighlighted={isFoundHere}
                  variant="outline"
                />
                <div
                  className={`mt-1 text-center text-[0.65rem] font-medium leading-none text-text ${
                    isChordTone ? '' : 'invisible'
                  }`}
                >
                  {isDualLabel(degreeLabel) ? (
                    <>
                      <span className="block">{degreeLabel.sharp}</span>
                      <span className="block">{degreeLabel.flat}</span>
                    </>
                  ) : (
                    <span>{degreeLabel}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <IntervalArcs scale={arcScale} direction="direct" columnCount={COLUMN_COUNT} />
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="text-center text-sm text-text-muted">
          Pick the rest of the chord's notes. Click a box, or type its letter (hold Shift for the
          sharp).
        </p>
        <div
          className="grid w-full gap-2"
          style={{ gridTemplateColumns: `repeat(${ALTERNATIVE_COLUMN_COUNT}, minmax(0, 1fr))` }}
        >
          {alternatives.map((option) => {
            const key = String(option.semitone)
            const relative = (option.semitone - root + 12) % 12
            const isFound = foundSemitones.has(relative)
            const isWrong = wrongAttempts.has(key)
            return (
              <Box
                key={key}
                label={option.label}
                highlighted
                secondaryHighlighted={isFound}
                wrong={isWrong}
                variant="outline"
                onClick={isFound || isWrong || solved ? undefined : () => handleSelect(option)}
              />
            )
          })}
        </div>
      </div>
      {solved && <FeedbackBanner onNext={handleNext} />}
      <Button type="button" variant="ghost" size="sm" onClick={onEnd}>
        Change chord
      </Button>
    </>
  )
}
