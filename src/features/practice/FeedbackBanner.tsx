import { CheckIcon, XIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Button } from '../../components/ui/button'

export type FeedbackStatus = 'correct' | 'incorrect'

export interface FeedbackBannerProps {
  status?: FeedbackStatus
  correctAnswer?: ReactNode
  onNext: () => void
}

export function FeedbackBanner({ status = 'correct', correctAnswer, onNext }: FeedbackBannerProps) {
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
    <div className="flex w-full flex-col gap-3">
      <div
        className={`flex w-full flex-col gap-3 border p-4 ${
          isCorrect
            ? 'border-success/40 bg-success/10 text-success'
            : 'border-destructive/40 bg-destructive/10 text-destructive'
        }`}
      >
        <div className="flex items-center gap-2 font-medium">
          {isCorrect ? <CheckIcon className="size-5" /> : <XIcon className="size-5" />}
          {isCorrect ? 'Correct!' : 'Not quite.'}
        </div>
        {!isCorrect && correctAnswer && <div className="text-sm text-text">{correctAnswer}</div>}
      </div>
      <Button type="button" size="lg" className="w-full py-3 text-base" onClick={onNext}>
        Next
      </Button>
    </div>
  )
}
