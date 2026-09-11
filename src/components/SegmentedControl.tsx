import type { ReactNode } from 'react'

export interface SegmentedOption<T extends string> {
  value: T
  label: ReactNode
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel?: string
  size?: 'sm' | 'md'
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  size = 'md',
}: SegmentedControlProps<T>) {
  const pad = size === 'sm' ? 'px-3 py-1.5 text-[13px]' : 'px-4 py-2 text-sm'

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-0.5 rounded-full bg-surface-alt p-1"
    >
      {options.map((option) => {
        const isSelected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={`rounded-full font-semibold transition-colors ${pad} ${
              isSelected
                ? 'bg-bg text-text shadow-elev-sm'
                : 'text-text/60 hover:text-text'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
