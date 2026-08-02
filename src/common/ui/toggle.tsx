'use client';

import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';
import { Toggle as TogglePrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@src/common/lib/utils';

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border-[3px] border-transparent text-sm font-bold transition-[background-color,border-color,color,box-shadow] duration-150 ease-out outline-none hover:bg-accent/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-50 disabled:[box-shadow:none] data-[state=on]:hover:text-accent-foreground/70 data-[state=on]:border-brutal-outline data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:[box-shadow:var(--shadow-brutal-sm)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:bg-destructive/10",
  {
    variants: {
      size: {
        default: 'h-9 px-2 min-w-9',
        sm: 'h-8 px-1.5 min-w-8',
        lg: 'h-10 px-2.5 min-w-10'
      },
      variant: {
        default: 'bg-transparent hover:bg-accent/60',
        outline:
          'border-brutal-outline bg-card text-card-foreground hover:bg-accent/30 hover:text-accent-foreground',
        segmented: `flex items-center gap-2 px-4 py-2 rounded-lg font-bold 
          hover:bg-muted hover:text-foreground
          data-[state=on]:bg-primary data-[state=on]:text-primary-foreground
          data-[state=on]:hover:bg-accent/30 data-[state=on]:hover:text-primary-foreground
          data-[state=on]:rounded-lg data-[spacing=0]:rounded-lg 
          data-[spacing=0]:first:rounded-lg data-[spacing=0]:last:rounded-lg`
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'default'
    }
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      className={cn(toggleVariants({ variant, size, className }))}
      data-slot='toggle'
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
