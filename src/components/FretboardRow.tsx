import { isDualLabel, NOTE_STEPS } from '../domain/constants'
import { getFretSemitone } from '../domain/fretboard'
import { NoteCircle } from './NoteCircle'

export interface FretboardRowProps {
  openStringSemitone: number
  y: number
  r: number
  openX: number
  fretCenterX: (fret: number) => number
  fretCount: number
  rootSemitone?: number
  highlightedSemitones?: number[]
  preferFlats?: boolean
  visibleSemitones?: Set<number> | null
}

export function FretboardRow({
  openStringSemitone,
  y,
  r,
  openX,
  fretCenterX,
  fretCount,
  rootSemitone,
  highlightedSemitones = [],
  preferFlats = false,
  visibleSemitones = null,
}: FretboardRowProps) {
  function renderNote(x: number, semitone: number, key: string) {
    const step = NOTE_STEPS[semitone]
    const relative = rootSemitone === undefined ? null : (semitone - rootSemitone + 12) % 12
    return (
      <NoteCircle
        key={key}
        cx={x}
        cy={y}
        r={r}
        label={step.label}
        preferFlats={preferFlats}
        accent={isDualLabel(step.label) ? 'accidental' : 'natural'}
        highlighted={relative === 0}
        secondaryHighlighted={relative !== null && relative !== 0 && highlightedSemitones.includes(relative)}
        muted={visibleSemitones !== null && !visibleSemitones.has(semitone)}
      />
    )
  }

  return (
    <g>
      {renderNote(openX, openStringSemitone, 'open')}
      {Array.from({ length: fretCount }, (_, index) => {
        const fret = index + 1
        return renderNote(fretCenterX(fret), getFretSemitone(openStringSemitone, fret), `fret-${fret}`)
      })}
    </g>
  )
}
