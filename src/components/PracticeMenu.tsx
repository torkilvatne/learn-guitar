import { Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export interface PracticeMenuItem {
  label: string
  to: string
}

export interface PracticeMenuProps {
  items: PracticeMenuItem[]
}

export function PracticeMenu({ items }: PracticeMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm" aria-label="Practice">
          <Target />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-max min-w-48">
        {items.map((item) => (
          <DropdownMenuItem key={item.to} asChild className="whitespace-nowrap">
            <Link to={item.to}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
