import { RotateCcw, Settings } from 'lucide-react'
import { ChordHighlightSelector } from '../components/ChordHighlightSelector'
import { RootNoteSelector } from '../components/RootNoteSelector'
import { Button } from '../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { Separator } from '../components/ui/separator'
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
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-72 flex-col gap-4">
        {mode === 'notes' && (
          <RootNoteSelector rootSemitone={rootSemitone} onSelect={setRootSemitone} />
        )}
        <ChordHighlightSelector
          chordId={highlightedChordId}
          onSelect={setHighlightedChordId}
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Theme
          </span>
          <ThemeSelector />
        </div>
        <Separator />
        <Button variant="outline" size="sm" onClick={resetSettings} className="self-start">
          <RotateCcw />
          Reset to defaults
        </Button>
      </PopoverContent>
    </Popover>
  )
}
