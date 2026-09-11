import type { Chord } from '../../domain/chords'
import { CHORDS } from '../../domain/chords'
import { CHORD_FAMILY_LABELS, groupChords } from '../../domain/chordGrouping'

export interface ChordPickerProps {
  selectedChordId: string | null
  onChange: (chord: Chord) => void
}

export function ChordPicker({ selectedChordId, onChange }: ChordPickerProps) {
  const sections = groupChords(CHORDS)

  return (
    <div className="flex max-h-96 flex-col gap-4 overflow-y-auto rounded border border-border p-3">
      {sections.map(({ family, chords }) => (
        <div key={family} className="flex flex-col gap-1.5">
          <div className="text-sm font-semibold text-text">{CHORD_FAMILY_LABELS[family]}</div>
          <div className="flex flex-col gap-1">
            {chords.map((chord) => {
              const isSelected = chord.id === selectedChordId
              return (
                <button
                  key={chord.id}
                  type="button"
                  onClick={() => onChange(chord)}
                  className={`rounded px-2 py-1.5 text-left text-sm transition-colors ${
                    isSelected
                      ? 'bg-surface-alt font-semibold text-text'
                      : 'text-text-muted hover:bg-surface-alt hover:text-text'
                  }`}
                >
                  {chord.name} ({chord.shorthand}) {chord.formula}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
