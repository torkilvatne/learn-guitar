import { ChevronsUpDownIcon } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export interface ComboboxProps<T> {
  options: T[]
  getKey: (option: T) => string
  getLabel: (option: T) => ReactNode
  getSearchValue: (option: T) => string
  selectedKey: string | null
  onSelect: (option: T) => void
  placeholder?: ReactNode
  searchPlaceholder: string
  emptyText?: string
  className?: string
}

export function Combobox<T>({
  options,
  getKey,
  getLabel,
  getSearchValue,
  selectedKey,
  onSelect,
  placeholder,
  searchPlaceholder,
  emptyText = 'No results found.',
  className,
}: ComboboxProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find((option) => getKey(option) === selectedKey)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('w-full justify-between', className)}>
          {selected ? getLabel(selected) : placeholder}
          <ChevronsUpDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const key = getKey(option)
                return (
                  <CommandItem
                    key={key}
                    value={getSearchValue(option)}
                    data-checked={key === selectedKey}
                    onSelect={() => {
                      onSelect(option)
                      setIsOpen(false)
                    }}
                  >
                    {getLabel(option)}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
