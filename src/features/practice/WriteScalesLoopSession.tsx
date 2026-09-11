import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { SCALES } from '../../domain/scales'
import type { DisplayMode } from '../../domain/scaleEngine'
import type { Scale } from '../../domain/types'
import { useSettings } from '../../state/settings'
import { PracticeSessionShell } from './PracticeSessionShell'
import { ScaleGroupPicker } from './ScaleGroupPicker'
import { WriteScaleSession } from './WriteScaleSession'
import { useRandomPick } from './useRandomPick'

export function WriteScalesLoopSession() {
  const { mode, rootSemitone } = useSettings()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const selectedScales = SCALES.filter((scale) => selectedIds.has(scale.id))

  function handleEnd() {
    setStarted(false)
    setScore({ correct: 0, total: 0 })
  }

  return (
    <PracticeSessionShell
      title="Write the scales"
      description="Pick the scales you want to practice, then write out each one's degrees. A new random scale appears after every round until you end the session."
      score={started ? score : undefined}
    >
      {started && selectedScales.length > 0 ? (
        <WriteScalesLoop
          scales={selectedScales}
          mode={mode}
          rootSemitone={rootSemitone}
          onResult={(correct) =>
            setScore((previous) => ({
              correct: previous.correct + (correct ? 1 : 0),
              total: previous.total + 1,
            }))
          }
          onEnd={handleEnd}
        />
      ) : (
        <div className="flex w-full flex-col gap-3">
          <p className="text-sm text-text-muted">Select the scales you want to practice.</p>
          <ScaleGroupPicker selectedIds={selectedIds} onChange={setSelectedIds} />
          <Button
            type="button"
            disabled={selectedScales.length === 0}
            onClick={() => setStarted(true)}
          >
            Start practice
          </Button>
        </div>
      )}
    </PracticeSessionShell>
  )
}

interface WriteScalesLoopProps {
  scales: Scale[]
  mode: DisplayMode
  rootSemitone: number
  onResult: (correct: boolean) => void
  onEnd: () => void
}

function WriteScalesLoop({ scales, mode, rootSemitone, onResult, onEnd }: WriteScalesLoopProps) {
  const [scale, nextScale] = useRandomPick(scales)
  const [round, setRound] = useState(0)

  return (
    <>
      <WriteScaleSession
        key={round}
        scale={scale}
        mode={mode}
        rootSemitone={rootSemitone}
        onResult={onResult}
        onNext={() => {
          setRound((previous) => previous + 1)
          nextScale()
        }}
      />
      <Button type="button" variant="ghost" size="sm" onClick={onEnd}>
        End practice
      </Button>
    </>
  )
}
