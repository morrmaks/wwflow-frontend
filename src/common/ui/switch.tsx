'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@src/common/lib/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'peer inline-flex h-7 w-12 shrink-0 items-center rounded-full border-[3px] border-brutal-outline p-0.5 transition-[background-color,box-shadow] duration-150 ease-out outline-none data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted hover:bg-secondary focus-visible:border-ring focus-visible:[box-shadow:var(--shadow-brutal-sm)] focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:[box-shadow:none]',
        className
      )}
      data-slot='switch'
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block size-4.5 rounded-full border-[3px] border-brutal-outline bg-background transition-transform duration-150 ease-out data-[state=checked]:translate-x-5 data-[state=checked]:bg-primary-foreground data-[state=unchecked]:translate-x-0'
        )}
        data-slot='switch-thumb'
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
