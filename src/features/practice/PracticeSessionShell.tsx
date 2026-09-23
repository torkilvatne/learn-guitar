import type { ReactNode } from 'react'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { SessionProgress } from './SessionProgress'

export interface PracticeSessionScore {
  correct: number
  total: number
}

export interface PracticeSessionShellProps {
  title: string
  question?: string
  description: ReactNode
  score?: PracticeSessionScore
  results?: boolean[]
  roundTarget?: number
  children: ReactNode
}

export function PracticeSessionShell({
  title,
  question,
  description,
  score,
  results = [],
  roundTarget = 10,
  children,
}: PracticeSessionShellProps) {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-neutral-200 p-4 sm:p-10">
      <div className="flex max-h-full w-full max-w-[840px] flex-col gap-6 overflow-y-auto rounded-[36px] bg-bg px-6 py-8 shadow-elev-lg sm:px-9 sm:py-9">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="pl-0" onClick={() => navigate(-1)}>
            <ArrowLeft strokeWidth={2.75} />
            Leave
          </Button>
          {started && score && (
            <div className="ml-auto">
              <SessionProgress
                results={results}
                total={score?.total ?? roundTarget}
              />
            </div>
          )}
        </div>

        {started ? (
          <div className="flex flex-1 flex-col items-center gap-6">
            <div className="text-center">
              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-text/55">
                {title}
              </div>
              {question && <h3 className="mt-1">{question}</h3>}
            </div>
            {children}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center gap-5 py-8 text-center">
            <h2>{title}</h2>
            <p className="max-w-md text-[15px] text-text/70">{description}</p>
            <Button size="lg" onClick={() => setStarted(true)}>
              Start
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
