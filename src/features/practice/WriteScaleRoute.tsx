import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getScaleById } from '../../domain/scales'
import { useSettings } from '../../state/settings'
import { PracticeSessionShell } from './PracticeSessionShell'
import { WriteScaleSession } from './WriteScaleSession'

export function WriteScaleRoute() {
  const { scaleId } = useParams<{ scaleId: string }>()
  const { mode, rootSemitone } = useSettings()
  const scale = scaleId ? getScaleById(scaleId) : undefined
  const [round, setRound] = useState(0)

  if (!scale) {
    return <Navigate to="/practice" replace />
  }

  return (
    <PracticeSessionShell
      title={`Write the scale: ${scale.name}`}
      description={`Write out every degree of ${scale.name} on the grid, or use your keyboard (hold Shift for the sharp) and press Enter to submit.`}
    >
      <WriteScaleSession
        key={round}
        scale={scale}
        mode={mode}
        rootSemitone={rootSemitone}
        onNext={() => setRound((previous) => previous + 1)}
      />
    </PracticeSessionShell>
  )
}
