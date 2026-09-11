import { SegmentedControl } from './SegmentedControl'

type AccidentalStyle = 'sharps' | 'flats'

const OPTIONS = [
  { value: 'sharps' as AccidentalStyle, label: 'Sharps' },
  { value: 'flats' as AccidentalStyle, label: 'Flats' },
]

export interface AccidentalStyleToggleProps {
  preferFlats: boolean
  onChange: (preferFlats: boolean) => void
}

export function AccidentalStyleToggle({ preferFlats, onChange }: AccidentalStyleToggleProps) {
  return (
    <SegmentedControl
      options={OPTIONS}
      value={preferFlats ? 'flats' : 'sharps'}
      onChange={(value) => onChange(value === 'flats')}
      ariaLabel="Spell accidentals as sharps or flats"
    />
  )
}
