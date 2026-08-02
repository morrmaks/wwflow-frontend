'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@src/common/lib/utils';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'peer size-5 shrink-0 rounded-md border-[3px] border-brutal-outline bg-card text-card-foreground [box-shadow:none] transition-[background-color,border-color,box-shadow,color] duration-150 ease-out outline-none hover:bg-muted focus-visible:[box-shadow:var(--shadow-brutal-sm)] data-[state=checked]:border-brutal-outline data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground aria-invalid:border-destructive aria-invalid:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:[box-shadow:none]',
        className
      )}
      data-slot='checkbox'
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className='grid place-content-center text-current transition-none'
        data-slot='checkbox-indicator'
      >
        <CheckIcon className='size-4 stroke-[3]' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
