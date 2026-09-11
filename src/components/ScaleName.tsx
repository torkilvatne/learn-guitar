import { getDiatonicModeInfo } from '../domain/modes'
import type { Scale } from '../domain/types'

export interface ScaleNameProps {
  scale: Scale
  layout?: 'inline' | 'sidebar'
  showDiatonicBadge?: boolean
  emphasis?: boolean
}

export function ScaleName({
  scale,
  layout = 'inline',
  showDiatonicBadge = true,
  emphasis = false,
}: ScaleNameProps) {
  const isDiatonicMode = showDiatonicBadge && getDiatonicModeInfo(scale) !== undefined

  return (
    <div
      className={`flex items-center gap-2.5 ${
        layout === 'sidebar'
          ? 'md:w-[210px] md:flex-none md:flex-col md:items-start md:justify-center md:gap-0.5'
          : ''
      }`}
    >
      <span
        className={`font-heading leading-tight text-text ${
          emphasis ? 'text-[28px]' : 'text-[22px]'
        }`}
      >
        {scale.name}
      </span>
      {scale.altNames && scale.altNames.length > 0 && (
        <span className="text-xs text-text/60">{scale.altNames.join(', ')}</span>
      )}
      {isDiatonicMode && (
        <span className="rounded-full bg-accent-2-100 px-3 py-1 text-xs font-medium text-accent-2-800">
          Major diatonic mode
        </span>
      )}
    </div>
  )
}
