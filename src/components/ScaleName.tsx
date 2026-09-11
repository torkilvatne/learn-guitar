import { getDiatonicModeInfo } from '../domain/modes'
import type { Scale } from '../domain/types'

export interface ScaleNameProps {
  scale: Scale
  layout?: 'inline' | 'sidebar'
  showDiatonicBadge?: boolean
}

export function ScaleName({
  scale,
  layout = 'inline',
  showDiatonicBadge = true,
}: ScaleNameProps) {
  const isDiatonicMode = showDiatonicBadge && getDiatonicModeInfo(scale) !== undefined

  return (
    <div
      className={`flex items-center gap-2 ${
        layout === 'sidebar'
          ? 'md:w-48 md:flex-none md:flex-col md:items-start md:justify-center md:gap-1'
          : ''
      }`}
    >
      <span className="text-2xl font-medium text-text">{scale.name}</span>
      {scale.altNames && scale.altNames.length > 0 && (
        <span className="text-sm text-text-muted">({scale.altNames.join(', ')})</span>
      )}
      {isDiatonicMode && (
        <span className="rounded-full bg-surface-alt px-2 py-0.5 text-xs font-medium text-text-muted">
          Major diatonic mode
        </span>
      )}
    </div>
  )
}
