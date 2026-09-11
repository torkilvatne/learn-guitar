import { Search, X } from 'lucide-react'
import { ChromaticGrid } from '../components/ChromaticGrid'
import { Button } from '../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { useSettings } from '../state/settings'

export interface ScaleSearchPanelProps {
  selected: number[]
  onSelectedChange: (semitones: number[]) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Was a bare icon button that expanded a grid inline over the list, pushing content.
 * Now a labelled "Filter by notes" button in the page header that opens a popover,
 * with the active count shown on the trigger.
 */
export function ScaleSearchPanel({
  selected,
  onSelectedChange,
  open,
  onOpenChange,
}: ScaleSearchPanelProps) {
  const { mode, rootSemitone } = useSettings()

  function toggleSemitone(semitone: number) {
    onSelectedChange(
      selected.includes(semitone)
        ? selected.filter((value) => value !== semitone)
        : [...selected, semitone],
    )
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Search strokeWidth={2.75} />
          {selected.length > 0
            ? `${selected.length} note${selected.length === 1 ? '' : 's'}`
            : 'Filter by notes'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(92vw,640px)] rounded-[24px] p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold">Show scales containing…</span>
          {selected.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => onSelectedChange([])}>
              <X strokeWidth={2.75} />
              Clear
            </Button>
          )}
        </div>
        <ChromaticGrid
          mode={mode}
          rootSemitone={rootSemitone}
          selectedSemitones={selected}
          onToggle={toggleSemitone}
        />
      </PopoverContent>
    </Popover>
  )
}
