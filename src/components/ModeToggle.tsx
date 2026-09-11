import type { DisplayMode } from '../domain/scaleEngine'
import { SegmentedControl } from './SegmentedControl'

const OPTIONS = [
  { value: 'numbers' as DisplayMode, label: 'Numbers' },
  { value: 'notes' as DisplayMode, label: 'Notes' },
]

export interface ModeToggleProps {
  mode: DisplayMode
  onChange: (mode: DisplayMode) => void
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <SegmentedControl
      options={OPTIONS}
      value={mode}
      onChange={onChange}
      ariaLabel="Label notes as numbers or note names"
    />
  )
}
