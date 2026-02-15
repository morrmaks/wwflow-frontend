'use client';

import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';
import { Toggle as TogglePrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/common/lib/utils';

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      size: {
        default: 'h-9 px-2 min-w-9',
        sm: 'h-8 px-1.5 min-w-8',
        lg: 'h-10 px-2.5 min-w-10'
      },
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
        segmented: `flex items-center gap-2 px-4 py-2 rounded-lg font-bold 
          hover:bg-muted-foreground/30 hover:text-primary transition-all
          data-[state=on]:bg-chart-6/20 data-[state=on]:text-chart-6
          data-[state=on]:hover:bg-chart-6/30 data-[state=on]:hover:text-chart-6
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
