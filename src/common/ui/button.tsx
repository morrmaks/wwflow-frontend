import type { VariantProps } from 'class-variance-authority';

import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@src/common/lib/utils';

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-lg border-[3px] border-brutal-outline text-sm font-bold [box-shadow:var(--shadow-brutal-sm)] transition-[background-color,color,box-shadow,translate,opacity] duration-150 ease-out outline-none disabled:pointer-events-none disabled:translate-x-0 disabled:translate-y-0 disabled:opacity-50 disabled:[box-shadow:none] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-current focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary hover:[box-shadow:var(--shadow-brutal)] active:translate-x-0 active:translate-y-0 active:[box-shadow:var(--shadow-brutal-sm)]',
        destructive:
          'bg-destructive text-primary-foreground [box-shadow:none] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-destructive hover:[box-shadow:var(--shadow-brutal)] active:translate-x-0 active:translate-y-0 active:[box-shadow:none] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [&_svg]:text-current',
        outline:
          'bg-card text-card-foreground [box-shadow:none] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:[box-shadow:var(--shadow-brutal)] active:translate-x-0 active:translate-y-0 active:[box-shadow:var(--shadow-brutal-sm)]',
        secondary:
          'bg-secondary text-secondary-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-secondary hover:[box-shadow:var(--shadow-brutal)] active:translate-x-0 active:translate-y-0 active:[box-shadow:var(--shadow-brutal-sm)]',
        ghost:
          'border-transparent bg-transparent text-foreground [box-shadow:none] hover:opacity-70 active:opacity-60',
        link: 'border-transparent bg-transparent text-primary [box-shadow:none] underline-offset-4 hover:translate-x-0 hover:translate-y-0 hover:bg-transparent hover:underline active:translate-x-0 active:translate-y-0'
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-9 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 px-6 text-base has-[>svg]:px-4',
        icon: 'size-10',
        'icon-sm': 'size-9',
        'icon-lg': 'size-12'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  type = 'button',
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-size={size}
      data-variant={variant}
      type={type}
      data-slot='button'
      {...props}
    />
  );
}

export { Button, buttonVariants };
