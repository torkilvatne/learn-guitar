import type { ReactNode } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'

export interface PracticeSessionScore {
  correct: number
  total: number
}

export interface PracticeSessionShellProps {
  title: string
  description: ReactNode
  score?: PracticeSessionScore
  children: ReactNode
}

export function PracticeSessionShell({
  title,
  description,
  score,
  children,
}: PracticeSessionShellProps) {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm">
      <div className="flex max-h-full w-full max-w-4xl flex-col gap-6 overflow-y-auto border border-border bg-surface p-6 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-text-muted hover:text-text"
          >
            ← Exit
          </button>
          <h1 className="text-lg font-semibold text-text">{title}</h1>
          <div className="w-10 text-right font-mono text-sm text-text-muted">
            {started && score ? `${score.correct}/${score.total}` : null}
          </div>
        </div>
        {started ? (
          <div className="flex flex-1 flex-col items-center gap-6">{children}</div>
        ) : (
          <div className="flex flex-1 flex-col items-center gap-4 text-center">
            <p className="text-text-muted">{description}</p>
            <Button type="button" onClick={() => setStarted(true)}>
              Start
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
