import type { DisplayMode } from '../domain/scaleEngine'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

const OPTIONS: { value: DisplayMode; label: string }[] = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'notes', label: 'Notes' },
]

export interface ModeToggleProps {
  mode: DisplayMode
  onChange: (mode: DisplayMode) => void
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      spacing={0}
      value={mode}
      onValueChange={(value) => {
        if (value) {
          onChange(value as DisplayMode)
        }
      }}
      className="border border-border p-1"
    >
      {OPTIONS.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className="h-9 px-3 text-base"
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
