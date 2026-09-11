import { CHORDS } from '../../domain/chords'
import { CHORD_FAMILY_LABELS, groupChords } from '../../domain/chordGrouping'
import { GroupPicker } from './GroupPicker'

export interface ChordGroupPickerProps {
  selectedIds: Set<string>
  onChange: (selectedIds: Set<string>) => void
}

export function ChordGroupPicker({ selectedIds, onChange }: ChordGroupPickerProps) {
  const sections = groupChords(CHORDS).map((section) => ({
    key: section.family,
    label: CHORD_FAMILY_LABELS[section.family],
    items: section.chords,
  }))

  return (
    <GroupPicker
      sections={sections}
      allItems={CHORDS}
      getId={(chord) => chord.id}
      getLabel={(chord) => `${chord.name} (${chord.shorthand}) ${chord.formula}`}
      selectedIds={selectedIds}
      onChange={onChange}
    />
  )
}
