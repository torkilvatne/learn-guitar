import { useState } from 'react'
import { ScaleRow } from '../../components/ScaleRow'
import { findScalesExactlyMatchingSemitones } from '../../domain/search'
import type { DisplayMode } from '../../domain/scaleEngine'
import type { Scale } from '../../domain/types'
import { FeedbackBanner, type FeedbackStatus } from './FeedbackBanner'
import { NoteAnswerInput } from './NoteAnswerInput'

export interface WriteScaleSessionProps {
  scale: Scale
  mode: DisplayMode
  rootSemitone: number
  onNext: () => void
  onResult?: (correct: boolean) => void
}

export function WriteScaleSession({
  scale,
  mode,
  rootSemitone,
  onNext,
  onResult,
}: WriteScaleSessionProps) {
  const [value, setValue] = useState<number[]>([])
  const [feedback, setFeedback] = useState<FeedbackStatus | null>(null)

  function handleSubmit() {
    const answer = value.includes(12) ? value : [...value, 12]
    const matches = findScalesExactlyMatchingSemitones(answer).some(
      (match) => match.id === scale.id,
    )
    setFeedback(matches ? 'correct' : 'incorrect')
    onResult?.(matches)
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <p className="text-center text-text-muted">
        Write the {mode === 'numbers' ? 'chromatic numbers' : 'notes'} for{' '}
        <span className="font-semibold text-text">{scale.name}</span>
      </p>
      <NoteAnswerInput
        mode={mode}
        rootSemitone={rootSemitone}
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
              <ScaleRow scale={scale} mode={mode} rootSemitone={rootSemitone} />
            ) : undefined
          }
          onNext={onNext}
        />
      )}
    </div>
  )
}
