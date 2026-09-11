import { SCALES } from '../domain/scales'
import type { Scale } from '../domain/types'
import { Combobox } from './Combobox'

export interface ScaleSwitcherProps {
  scale: Scale
  onSelect: (scale: Scale) => void
}

export function ScaleSwitcher({ scale, onSelect }: ScaleSwitcherProps) {
  return (
    <Combobox
      options={SCALES}
      getKey={(option) => option.id}
      getLabel={(option) => option.name}
      getSearchValue={(option) => option.name}
      selectedKey={scale.id}
      onSelect={onSelect}
      searchPlaceholder="Search scales..."
      emptyText="No scale found."
      className="w-auto"
    />
  )
}
