import { isDualLabel, type StepLabel } from '../domain/constants'

export type BoxVariant = 'filled' | 'outline'

export interface BoxProps {
  label: StepLabel | null
  highlighted?: boolean
  secondaryHighlighted?: boolean
  wrong?: boolean
  variant?: BoxVariant
  onClick?: () => void
}

export function Box({
  label,
  highlighted = false,
  secondaryHighlighted = false,
  wrong = false,
  variant = 'filled',
  onClick,
}: BoxProps) {
  if (label === null) {
    return <div className="aspect-square" aria-hidden="true" />
  }

  const interactive = onClick !== undefined
  const isOutline = variant === 'outline'

  return (
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
      className={`flex aspect-square flex-col items-center justify-center border-2 text-center text-base font-semibold leading-tight sm:text-3xl ${
        interactive ? 'cursor-pointer' : ''
      } ${
        wrong
          ? 'border-destructive bg-destructive text-destructive-foreground'
          : secondaryHighlighted
            ? 'border-primary bg-primary text-primary-foreground'
            : isOutline
              ? `text-text ${highlighted ? 'border-highlight-border' : 'border-border/40'}`
              : highlighted
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-surface text-text'
      }`}
    >
      <div
        className={
          isOutline && !highlighted && !secondaryHighlighted && !wrong
            ? 'flex flex-col items-center opacity-10'
            : 'flex flex-col items-center'
        }
      >
        {isDualLabel(label) ? (
          <>
            <span className="text-[0.5em]">{label.sharp}</span>
            <span className="text-[0.5em]">{label.flat}</span>
          </>
        ) : (
          <span>{label}</span>
        )}
      </div>
    </div>
  )
}
