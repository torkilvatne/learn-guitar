import { getSingleNoteLabel, type StepLabel } from '../domain/constants'

export type NoteCircleAccent = 'natural' | 'accidental'

export interface NoteCircleProps {
  cx: number
  cy: number
  r: number
  label: StepLabel
  preferFlats?: boolean
  accent: NoteCircleAccent
  highlighted?: boolean
  secondaryHighlighted?: boolean
  wrong?: boolean
  muted?: boolean
  onClick?: () => void
}

/**
 * A note on the NECK. Round, one spelling at a time (the player's sharp/flat choice).
 * Warm fill = natural, sage fill = accidental — the same two voices as everywhere else.
 */
export function NoteCircle({
  cx,
  cy,
  r,
  label,
  preferFlats = false,
  accent,
  highlighted = false,
  secondaryHighlighted = false,
  wrong = false,
  muted = false,
  onClick,
}: NoteCircleProps) {
  const interactive = onClick !== undefined
  const isNatural = accent === 'natural'

  const fill = wrong
    ? 'var(--destructive-fill)'
    : secondaryHighlighted
      ? 'var(--accent-2-200)'
      : isNatural
        ? 'var(--natural-fill)'
        : 'var(--accidental-fill)'

  const stroke = wrong
    ? 'var(--destructive)'
    : secondaryHighlighted
      ? 'var(--accent-2-600)'
      : highlighted
        ? 'var(--highlight-border)'
        : isNatural
          ? 'var(--natural)'
          : 'var(--accidental)'

  const textFill = wrong
    ? 'var(--destructive-foreground)'
    : secondaryHighlighted
      ? 'var(--accent-2-800)'
      : isNatural
        ? 'var(--natural-text)'
        : 'var(--accidental-text)'

  return (
    <g
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
      className={interactive ? 'cursor-pointer' : undefined}
      /* was 0.1 — near-invisible. 0.28 still recedes but stays legible. */
      opacity={muted ? 0.28 : 1}
    >
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={2} />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={r * 0.85}
        fontWeight={700}
        fill={textFill}
      >
        {getSingleNoteLabel(label, preferFlats)}
      </text>
    </g>
  )
}
