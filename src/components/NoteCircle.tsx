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
  const baseFill = accent === 'natural' ? 'var(--natural-fill)' : 'var(--accidental-fill)'
  const baseStroke = accent === 'natural' ? 'var(--natural)' : 'var(--accidental)'

  const fill = wrong ? 'var(--destructive)' : secondaryHighlighted ? 'var(--primary)' : baseFill
  const stroke = wrong
    ? 'var(--destructive)'
    : secondaryHighlighted || highlighted
      ? 'var(--primary)'
      : baseStroke
  const textFill = wrong
    ? 'var(--destructive-foreground)'
    : secondaryHighlighted
      ? 'var(--primary-foreground)'
      : 'var(--text)'

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
      opacity={muted ? 0.1 : 1}
    >
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={2.25} />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={r * 0.95}
        fontWeight={650}
        fill={textFill}
      >
        {getSingleNoteLabel(label, preferFlats)}
      </text>
    </g>
  )
}
