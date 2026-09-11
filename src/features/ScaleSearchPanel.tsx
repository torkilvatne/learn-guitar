import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { ChromaticGrid } from '../components/ChromaticGrid'
import { PracticeMenu } from '../components/PracticeMenu'
import { Button } from '../components/ui/button'
import { useSettings } from '../state/settings'

export interface ScaleSearchPanelProps {
  selected: number[]
  onSelectedChange: (semitones: number[]) => void
}

const PRACTICE_ITEMS = [{ label: 'Guess which scale', to: '/practice/guess-scale' }]

export function ScaleSearchPanel({ selected, onSelectedChange }: ScaleSearchPanelProps) {
  const { mode, rootSemitone } = useSettings()
  const [isOpen, setIsOpen] = useState(false)

  function toggleSemitone(semitone: number) {
    onSelectedChange(
      selected.includes(semitone)
        ? selected.filter((value) => value !== semitone)
        : [...selected, semitone],
    )
  }

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="flex w-full max-w-2xl items-center justify-end gap-2">
        {selected.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => onSelectedChange([])}>
            Clear
          </Button>
        )}
        <Button
          variant="outline"
          size="icon-sm"
          aria-label={isOpen ? 'Close search' : 'Search'}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X /> : <Search />}
        </Button>
        <PracticeMenu items={PRACTICE_ITEMS} />
      </div>
      {isOpen && (
        <div className="w-full max-w-2xl">
          <ChromaticGrid
            mode={mode}
            rootSemitone={rootSemitone}
            selectedSemitones={selected}
            onToggle={toggleSemitone}
          />
        </div>
      )}
    </div>
  )
}
