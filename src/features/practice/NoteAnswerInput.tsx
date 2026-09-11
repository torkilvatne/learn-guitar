import { useEffect } from 'react'
import { ChromaticGrid } from '../../components/ChromaticGrid'
import { Button } from '../../components/ui/button'
import {
  NATURAL_ABSOLUTE_SEMITONE_FOR_LETTER_CODE,
  SHARP_ABSOLUTE_SEMITONE_FOR_LETTER_CODE,
} from '../../domain/constants'
import type { DisplayMode } from '../../domain/scaleEngine'

const NATURAL_SEMITONE_FOR_CODE: Record<string, number> = {
  Digit1: 0,
  Digit2: 2,
  Digit3: 4,
  Digit4: 5,
  Digit5: 7,
  Digit6: 9,
  Digit7: 11,
  Digit8: 12,
}

const SHARP_SEMITONE_FOR_CODE: Record<string, number> = {
  Digit1: 1,
  Digit2: 3,
  Digit4: 6,
  Digit5: 8,
  Digit6: 10,
}

export interface NoteAnswerInputProps {
  mode: DisplayMode
  rootSemitone: number
  value: number[]
  onChange: (semitones: number[]) => void
  onSubmit: () => void
  disabled?: boolean
}

export function NoteAnswerInput({
  mode,
  rootSemitone,
  value,
  onChange,
  onSubmit,
  disabled = false,
}: NoteAnswerInputProps) {
  useEffect(() => {
    if (disabled) {
      return
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault()
        onSubmit()
        return
      }
      const digitSemitone = event.shiftKey
        ? (SHARP_SEMITONE_FOR_CODE[event.code] ?? NATURAL_SEMITONE_FOR_CODE[event.code])
        : NATURAL_SEMITONE_FOR_CODE[event.code]

      let semitone = digitSemitone
      if (semitone === undefined && mode === 'notes') {
        const absoluteSemitone = event.shiftKey
          ? (SHARP_ABSOLUTE_SEMITONE_FOR_LETTER_CODE[event.code] ??
            NATURAL_ABSOLUTE_SEMITONE_FOR_LETTER_CODE[event.code])
          : NATURAL_ABSOLUTE_SEMITONE_FOR_LETTER_CODE[event.code]
        if (absoluteSemitone !== undefined) {
          semitone = (absoluteSemitone - rootSemitone + 12) % 12
        }
      }
      if (semitone === undefined) {
        return
      }
      event.preventDefault()
      onChange(
        value.includes(semitone)
          ? value.filter((selected) => selected !== semitone)
          : [...value, semitone],
      )
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [disabled, mode, rootSemitone, value, onChange, onSubmit])

  function toggleSemitone(semitone: number) {
    onChange(
      value.includes(semitone)
        ? value.filter((selected) => selected !== semitone)
        : [...value, semitone],
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <ChromaticGrid
        mode={mode}
        rootSemitone={rootSemitone}
        selectedSemitones={value}
        onToggle={disabled ? undefined : toggleSemitone}
        variant="outline"
      />
      <p className="text-center text-xs text-text-muted">
        {mode === 'numbers'
          ? 'Type 1-8, hold Shift for the sharp, Enter to submit — or click the grid above.'
          : 'Type the note letters (A-G), hold Shift for the sharp, Enter to submit — or click the grid above.'}
      </p>
      <Button type="button" onClick={onSubmit} disabled={disabled}>
        Complete
      </Button>
    </div>
  )
}
