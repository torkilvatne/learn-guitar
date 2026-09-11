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
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-9 sm:px-14">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <h2 className="mb-0.5">Fretboard</h2>
          <p className="text-sm text-text/70">
            Six strings, twelve frets. Notes sit where the finger presses.
          </p>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2.5">
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
            <PopoverContent align="end" className="w-80 rounded-[24px]">
              <NoteGroupPicker selectedIds={visibleNoteIds} onChange={setVisibleNoteIds} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="rounded-[32px] bg-surface px-5 py-6 shadow-elev-sm">
        <Fretboard
          tuning={tuning}
          preferFlats={preferFlats}
          visibleSemitones={visibleSemitones}
        />
      </div>

      <p className="max-w-[70ch] text-[13px] text-text/65">
        Round notes mean the physical neck — one spelling at a time, warm for naturals
        and sage for accidentals. The square grid elsewhere in the app is the same music
        on paper, where both spellings are shown at once.
      </p>
    </div>
  )
}
