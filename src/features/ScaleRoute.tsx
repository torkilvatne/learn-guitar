import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getScaleById } from '../domain/scales'
import { useSettings } from '../state/settings'
import { ScaleView } from './ScaleView'

export function ScaleRoute() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { mode, rootSemitone, highlightedChordId } = useSettings()
  const scale = id ? getScaleById(id) : undefined

  if (!scale) {
    return <Navigate to="/scales" replace />
  }

  return (
    <div className="absolute inset-0 bg-bg">
      <ScaleView
        scale={scale}
        mode={mode}
        rootSemitone={rootSemitone}
        highlightedChordId={highlightedChordId}
        onBack={() => navigate('/scales')}
        onSelectScale={(next) => navigate(`/scales/${next.id}`)}
      />
    </div>
  )
}
