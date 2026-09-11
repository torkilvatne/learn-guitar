import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

/**
 * Woodshed button. Changes from the shadcn default:
 *   - rounded-full everywhere (was rounded-lg against --radius: 0rem, i.e. square)
 *   - default/primary is the terracotta accent, not the ink colour
 *   - min-height 44px on default and lg so mobile hit targets are legal
 *   - hover/pressed come from the accent ramp (600/700), not opacity fades
 *   - focus is the 2px accent outline, not a 3px translucent ring
 *   - success/destructive use the dedicated -fill / -foreground tokens so text on a
 *     tinted fill always clears 4.5:1 (the old /10 + /100 pairing did not)
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent bg-clip-padding font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground hover:bg-accent-600 active:bg-accent-700',
        outline:
          'border-border bg-transparent text-text hover:bg-surface-alt active:bg-neutral-300 aria-expanded:bg-surface-alt',
        secondary:
          'bg-surface text-text hover:bg-surface-alt active:bg-neutral-300',
        ghost:
          'text-accent-700 hover:bg-accent-100 active:bg-accent-200 aria-expanded:bg-accent-100',
        destructive:
          'bg-destructive-fill text-destructive-foreground hover:brightness-[0.97] focus-visible:outline-destructive',
        success:
          'bg-accent-2-200 text-accent-2-800 border-accent-2-600 hover:bg-accent-2-300 focus-visible:outline-accent-2',
        link: 'text-accent-700 underline-offset-4 hover:underline',
      },
      size: {
        default: 'min-h-11 px-5 py-2.5 text-sm',
        xs: 'min-h-7 rounded-full px-3 text-xs',
        sm: 'min-h-9 px-4 text-[13px]',
        lg: 'min-h-12 px-6 text-base',
        icon: 'size-11',
        'icon-xs': 'size-7',
        'icon-sm': 'size-9',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
