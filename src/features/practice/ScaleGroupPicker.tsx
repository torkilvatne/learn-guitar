import { groupScales, SCALE_GROUP_LABELS } from '../../domain/grouping'
import { SCALES } from '../../domain/scales'
import { GroupPicker } from './GroupPicker'

export interface ScaleGroupPickerProps {
  selectedIds: Set<string>
  onChange: (selectedIds: Set<string>) => void
}

export function ScaleGroupPicker({ selectedIds, onChange }: ScaleGroupPickerProps) {
  const sections = groupScales(SCALES).map((section) => ({
    key: section.group,
    label: SCALE_GROUP_LABELS[section.group],
    items: section.scales,
  }))

  return (
    <GroupPicker
      sections={sections}
      allItems={SCALES}
      getId={(scale) => scale.id}
      getLabel={(scale) => scale.name}
      selectedIds={selectedIds}
      onChange={onChange}
    />
  )
}
