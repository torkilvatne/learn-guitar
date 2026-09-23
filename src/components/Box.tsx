import { isDualLabel, type StepLabel } from '../domain/constants'

export type BoxVariant = 'filled' | 'outline'

export interface BoxProps {
  label: StepLabel | null
  highlighted?: boolean
  secondaryHighlighted?: boolean
  wrong?: boolean
  variant?: BoxVariant
  caption?: string
  onClick?: () => void
}

export function Box({
  label,
  highlighted = false,
  secondaryHighlighted = false,
  wrong = false,
  variant = 'filled',
  caption,
  onClick,
}: BoxProps) {
  if (label === null) {
    return <div className="aspect-square" aria-hidden="true" />
  }

  const interactive = onClick !== undefined
  const isOutline = variant === 'outline'
  const dim = isOutline && !highlighted && !secondaryHighlighted && !wrong

  const tone = wrong
    ? 'border-destructive bg-destructive-fill text-destructive-foreground line-through'
    : secondaryHighlighted
      ? 'border-accent-2-600 bg-accent-2-200 text-accent-2-800'
      : highlighted
        ? 'border-accent-600 bg-accent text-accent-foreground'
        : 'border-border bg-surface-alt text-text/40'

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onClick()
                }
              }
            : undefined
        }
        className={`flex aspect-square w-full flex-col items-center justify-center rounded-[18%] border-[1.5px] text-center text-base font-bold leading-none transition-colors sm:text-2xl ${
          interactive ? 'cursor-pointer hover:border-accent-400' : ''
        } ${tone} ${dim ? 'opacity-100' : ''}`}
      >
        {isDualLabel(label) ? (
          <>
            <span className="text-[0.55em]">{label.sharp}</span>
            <span className="text-[0.55em]">{label.flat}</span>
          </>
        ) : (
          <span>{label}</span>
        )}
      </div>
      {caption !== undefined && (
        <span className={`text-[11px] ${highlighted ? 'text-text/75' : 'text-text/30'}`}>
          {caption}
        </span>
      )}
    </div>
  )
}
