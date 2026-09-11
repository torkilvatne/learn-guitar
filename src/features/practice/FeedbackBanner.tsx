import { CircleCheck, CircleX } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Button } from '../../components/ui/button'

export type FeedbackStatus = 'correct' | 'incorrect'

export interface FeedbackBannerProps {
  status?: FeedbackStatus
  correctAnswer?: ReactNode
  explanation?: ReactNode
  onNext: () => void
}

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
