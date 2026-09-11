import { RotateCcw, Settings } from 'lucide-react'
import { ChordHighlightSelector } from '../components/ChordHighlightSelector'
import { RootNoteSelector } from '../components/RootNoteSelector'
import { Button } from '../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { useSettings } from '../state/settings'
import { ThemeSelector } from './ThemeSelector'

export function SettingsPopover() {
  const {
    mode,
    rootSemitone,
    setRootSemitone,
    highlightedChordId,
    setHighlightedChordId,
    resetSettings,
  } = useSettings()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Settings">
          <Settings strokeWidth={2.75} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-80 flex-col gap-5 rounded-[24px] p-5">
        {mode === 'notes' && (
          <RootNoteSelector rootSemitone={rootSemitone} onSelect={setRootSemitone} />
        )}
        <ChordHighlightSelector
          chordId={highlightedChordId}
          onSelect={setHighlightedChordId}
        />
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-text/55">
            Theme
          </span>
          <ThemeSelector />
        </div>
        <div className="h-px bg-divider" />
        <Button variant="outline" size="sm" onClick={resetSettings} className="self-start">
          <RotateCcw strokeWidth={2.75} />
          Reset to defaults
        </Button>
      </PopoverContent>
    </Popover>
  )
}
