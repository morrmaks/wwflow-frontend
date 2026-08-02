import * as React from 'react';

import { cn } from '@src/common/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn(
        'flex field-sizing-content min-h-24 w-full rounded-lg border-[3px] border-brutal-outline bg-card px-3 py-2 text-base text-card-foreground [box-shadow:none] transition-[background-color,border-color,box-shadow,color] duration-150 ease-out outline-none placeholder:text-muted-foreground hover:[box-shadow:var(--shadow-brutal-sm)] focus-visible:border-ring focus-visible:[box-shadow:var(--shadow-brutal)] focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:bg-destructive/10 aria-invalid:[box-shadow:var(--shadow-brutal-sm)] disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:[box-shadow:none] md:text-sm',
        className
      )}
      data-slot='textarea'
      {...props}
    />
  );
}

export { Textarea };
