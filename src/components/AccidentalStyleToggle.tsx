import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

const OPTIONS: { value: 'sharps' | 'flats'; label: string }[] = [
  { value: 'sharps', label: 'Sharps' },
  { value: 'flats', label: 'Flats' },
]

export interface AccidentalStyleToggleProps {
  preferFlats: boolean
  onChange: (preferFlats: boolean) => void
}

export function AccidentalStyleToggle({ preferFlats, onChange }: AccidentalStyleToggleProps) {
  return (
    <ToggleGroup
      type="single"
      spacing={0}
      value={preferFlats ? 'flats' : 'sharps'}
      onValueChange={(value) => {
        if (value) {
          onChange(value === 'flats')
        }
      }}
      className="border border-border p-1"
    >
      {OPTIONS.map((option) => (
        <ToggleGroupItem key={option.value} value={option.value} className="h-9 px-3 text-base">
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
