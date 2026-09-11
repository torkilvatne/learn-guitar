import { XIcon } from 'lucide-react'
import { CHORDS, type Chord } from '../domain/chords'
import { Combobox } from './Combobox'
import { Button } from './ui/button'

export interface ChordHighlightSelectorProps {
  chordId: string | null
  onSelect: (chordId: string | null) => void
}

function chordLabel(chord: Chord) {
  return `${chord.name} (${chord.shorthand})`
}

export function ChordHighlightSelector({
  chordId,
  onSelect,
}: ChordHighlightSelectorProps) {
  return (
    <div className="flex items-center gap-1">
      <Combobox
        options={CHORDS}
        getKey={(chord) => chord.id}
        getLabel={chordLabel}
        getSearchValue={(chord) => `${chord.name} ${chord.shorthand} ${chord.formula}`}
        selectedKey={chordId}
        onSelect={(chord) => onSelect(chord.id)}
        placeholder="Highlight a chord"
        searchPlaceholder="Search chords..."
        emptyText="No chord found."
        className="flex-1"
      />
      {chordId !== null && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => onSelect(null)}
          aria-label="Clear chord highlight"
        >
          <XIcon />
        </Button>
      )}
    </div>
  )
}
