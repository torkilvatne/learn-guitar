import type { ReactNode } from 'react'
import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'

export interface GroupPickerSection<T> {
  key: string
  label: string
  items: T[]
}

export interface GroupPickerProps<T> {
  sections: GroupPickerSection<T>[]
  allItems: T[]
  getId: (item: T) => string
  getLabel: (item: T) => ReactNode
  selectedIds: Set<string>
  onChange: (selectedIds: Set<string>) => void
}

export function GroupPicker<T>({
  sections,
  allItems,
  getId,
  getLabel,
  selectedIds,
  onChange,
}: GroupPickerProps<T>) {
  function setItemSelected(id: string, selected: boolean) {
    const next = new Set(selectedIds)
    if (selected) {
      next.add(id)
    } else {
      next.delete(id)
    }
    onChange(next)
  }

  function setSectionSelected(items: T[], selected: boolean) {
    const next = new Set(selectedIds)
    for (const item of items) {
      if (selected) {
        next.add(getId(item))
      } else {
        next.delete(getId(item))
      }
    }
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-sm text-text-muted">
        <span>
          {selectedIds.size} of {allItems.length} selected
        </span>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(new Set(allItems.map(getId)))}
          >
            Select all
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(new Set())}>
            Clear all
          </Button>
        </div>
      </div>
      <div className="flex max-h-96 flex-col gap-4 overflow-y-auto rounded border border-border p-3">
        {sections.map(({ key, label, items }) => {
          const selectedCount = items.filter((item) => selectedIds.has(getId(item))).length
          const groupChecked =
            selectedCount === 0 ? false : selectedCount === items.length ? true : 'indeterminate'

          return (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-text">
                <Checkbox
                  checked={groupChecked}
                  onCheckedChange={(checked) => setSectionSelected(items, checked === true)}
                />
                {label}
                <span className="font-normal text-text-muted">
                  ({selectedCount}/{items.length})
                </span>
              </label>
              <div className="flex flex-col gap-1 pl-6">
                {items.map((item) => {
                  const id = getId(item)
                  return (
                    <label
                      key={id}
                      className="flex cursor-pointer items-center gap-2 text-sm text-text"
                    >
                      <Checkbox
                        checked={selectedIds.has(id)}
                        onCheckedChange={(checked) => setItemSelected(id, checked === true)}
                      />
                      {getLabel(item)}
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
