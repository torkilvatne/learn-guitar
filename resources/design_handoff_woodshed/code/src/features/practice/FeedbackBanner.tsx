import { CircleCheck, CircleX } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Button } from '../../components/ui/button'

export type FeedbackStatus = 'correct' | 'incorrect'

export interface FeedbackBannerProps {
  status?: FeedbackStatus
  /** What the answer was — shown on a wrong answer. */
  correctAnswer?: ReactNode
  /** Why, in one line: "Major 6th — nine semitones." Shown on both outcomes. */
  explanation?: ReactNode
  onNext: () => void
}

/**
 * Was two stacked blocks — a bordered tinted banner saying only "Correct!", then a
 * full-width Next button below it. Now one rounded bar: icon, a sentence that teaches
 * something, and Next inline on the right with its keyboard hint.
 */
export function FeedbackBanner({
  status = 'correct',
  correctAnswer,
  explanation,
  onNext,
}: FeedbackBannerProps) {
  const isCorrect = status === 'correct'

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault()
        onNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNext])

  return (
    <div
      className={`flex w-full flex-wrap items-center gap-3.5 rounded-[24px] px-5 py-4 ${
        isCorrect
          ? 'bg-accent-2-100 text-accent-2-800'
          : 'bg-destructive-fill text-destructive-foreground'
      }`}
    >
      {isCorrect ? (
        <CircleCheck className="size-5 shrink-0" strokeWidth={2.75} />
      ) : (
        <CircleX className="size-5 shrink-0" strokeWidth={2.75} />
      )}
      <span className="text-[15px] font-semibold">
        {explanation ?? (isCorrect ? 'Correct.' : correctAnswer ?? 'Not quite.')}
      </span>
      {!isCorrect && explanation && correctAnswer && (
        <span className="text-sm opacity-80">{correctAnswer}</span>
      )}
      <Button className="ml-auto" onClick={onNext}>
        Next
        <span className="text-[11px] font-normal opacity-75">↵</span>
      </Button>
    </div>
  )
}
