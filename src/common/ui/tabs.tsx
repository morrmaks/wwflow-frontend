'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@src/common/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      className={cn('flex flex-col gap-2', className)}
      data-slot='tabs'
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex h-10 w-fit items-center justify-center rounded-xl border-[3px] border-brutal-outline bg-muted p-1 text-muted-foreground',
        className
      )}
      data-slot='tabs-list'
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex h-7 items-center justify-center rounded-lg border-[3px] border-transparent px-3 text-sm font-bold transition-[background-color,border-color,color,box-shadow] duration-150 ease-out',
        'hover:text-accent-foreground',
        'data-[state=active]:border-brutal-outline data-[state=active]:bg-background data-[state=active]:text-foreground',
        'focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className
      )}
      data-slot='tabs-trigger'
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'flex-1 rounded-xl border-[3px] border-brutal-outline bg-card p-4 text-card-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className
      )}
      data-slot='tabs-content'
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
