import * as React from 'react';

import { cn } from '@src/common/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        'h-10 w-full min-w-0 rounded-lg border-[3px] border-brutal-outline bg-card px-3 py-1 text-sm text-card-foreground [box-shadow:none] transition-[background-color,border-color,box-shadow,color] duration-150 ease-out outline-none',
        'placeholder:text-card-foreground/60 selection:bg-primary selection:text-primary-foreground',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
        'hover:[box-shadow:var(--shadow-brutal-sm)]',
        'focus-visible:border-ring focus-visible:[box-shadow:var(--shadow-brutal)]',
        'aria-invalid:border-destructive aria-invalid:bg-destructive/10 aria-invalid:[box-shadow:var(--shadow-brutal-sm)]',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:[box-shadow:none]',
        className
      )}
      type={type}
      data-slot='input'
      {...props}
    />
  );
}

export { Input };
