import { isDualLabel, NOTE_STEPS, noteLabelText } from '../../domain/constants'
import { GroupPicker } from './GroupPicker'

export interface NoteGroupPickerProps {
  selectedIds: Set<string>
  onChange: (selectedIds: Set<string>) => void
}

const NATURAL_STEPS = NOTE_STEPS.filter((step) => !isDualLabel(step.label))
const ACCIDENTAL_STEPS = NOTE_STEPS.filter((step) => isDualLabel(step.label))

export function NoteGroupPicker({ selectedIds, onChange }: NoteGroupPickerProps) {
  const sections = [
    { key: 'natural', label: 'Natural notes', items: NATURAL_STEPS },
    { key: 'accidental', label: 'Sharps / flats', items: ACCIDENTAL_STEPS },
  ]

  return (
    <GroupPicker
      sections={sections}
      allItems={NOTE_STEPS}
      getId={(step) => String(step.semitone)}
      getLabel={(step) => noteLabelText(step.label)}
      selectedIds={selectedIds}
      onChange={onChange}
    />
  )
}
