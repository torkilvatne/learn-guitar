import { useState } from 'react'
import { AccidentalStyleToggle } from '../components/AccidentalStyleToggle'
import { Combobox } from '../components/Combobox'
import { Fretboard } from '../components/Fretboard'
import { Button } from '../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { NOTE_STEPS } from '../domain/constants'
import { STANDARD_TUNING, TUNINGS, getTuningById } from '../domain/fretboard'
import { NoteGroupPicker } from './practice/NoteGroupPicker'

const ALL_NOTE_IDS = new Set(NOTE_STEPS.map((step) => String(step.semitone)))

export function FretboardView() {
  const [preferFlats, setPreferFlats] = useState(false)
  const [tuningId, setTuningId] = useState('standard')
  const [visibleNoteIds, setVisibleNoteIds] = useState<Set<string>>(ALL_NOTE_IDS)

  const tuning = getTuningById(tuningId)?.semitones ?? STANDARD_TUNING
  const visibleSemitones = new Set([...visibleNoteIds].map(Number))
  const noteFilterLabel =
    visibleNoteIds.size === ALL_NOTE_IDS.size
      ? 'All notes'
      : `${visibleNoteIds.size} note${visibleNoteIds.size === 1 ? '' : 's'}`

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
      <div>
        <h1 className="text-xl font-semibold text-text">Fretboard</h1>
        <p className="text-sm text-text-muted">Standard tuning, one octave per string.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <AccidentalStyleToggle preferFlats={preferFlats} onChange={setPreferFlats} />

        <Combobox
          options={TUNINGS}
          getKey={(item) => item.id}
          getLabel={(item) => item.name}
          getSearchValue={(item) => item.name}
          selectedKey={tuningId}
          onSelect={(item) => setTuningId(item.id)}
          placeholder="Select tuning"
          searchPlaceholder="Search tunings..."
          emptyText="No tuning found."
          className="w-56"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">{noteFilterLabel}</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80">
            <NoteGroupPicker selectedIds={visibleNoteIds} onChange={setVisibleNoteIds} />
          </PopoverContent>
        </Popover>
      </div>

      <Fretboard tuning={tuning} preferFlats={preferFlats} visibleSemitones={visibleSemitones} />
    </div>
  )
}
