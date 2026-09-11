import { isDualLabel, NOTE_STEPS, type StepLabel } from '../domain/constants'
import { Combobox } from './Combobox'

function noteLabelText(label: StepLabel): string {
  return isDualLabel(label) ? `${label.sharp} / ${label.flat}` : label
}

export interface RootNoteSelectorProps {
  rootSemitone: number
  onSelect: (semitone: number) => void
}

export function RootNoteSelector({ rootSemitone, onSelect }: RootNoteSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0 text-sm font-medium text-text">Root note is:</span>
      <Combobox
        options={NOTE_STEPS}
        getKey={(step) => String(step.semitone)}
        getLabel={(step) => noteLabelText(step.label)}
        getSearchValue={(step) => noteLabelText(step.label)}
        selectedKey={String(rootSemitone)}
        onSelect={(step) => onSelect(step.semitone)}
        placeholder="Select root note"
        searchPlaceholder="Search notes..."
        emptyText="No note found."
        className="flex-1"
      />
    </div>
  )
}
