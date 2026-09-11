import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

const OPTIONS: { value: number; label: string }[] = [
  { value: 1, label: 'Major key' },
  { value: 6, label: 'Minor key' },
]

export interface ProgressionToggleProps {
  rootDegree: number
  onChange: (rootDegree: number) => void
}

export function ProgressionToggle({ rootDegree, onChange }: ProgressionToggleProps) {
  return (
    <ToggleGroup
      type="single"
      spacing={0}
      value={String(rootDegree)}
      onValueChange={(value) => {
        if (value) {
          onChange(Number(value))
        }
      }}
      className="border border-border p-1"
    >
      {OPTIONS.map((option) => (
        <ToggleGroupItem key={option.value} value={String(option.value)}>
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
