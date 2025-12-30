'use client';

import { Monitor, Moon, Sun } from 'lucide-react';

import { useThemeClient } from '@/common/hooks/useThemeClient';
import { Skeleton } from '@/common/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/common/ui/tabs';

export function ThemeTabs() {
  const { mounted, theme, setTheme } = useThemeClient();

  if (!mounted) return <Skeleton className='h-9 w-31.5' />;

  return (
    <Tabs className='w-fit' value={theme ?? 'system'} onValueChange={(value) => setTheme(value)}>
      <TabsList className='h-7 p-0 rounded-full'>
        <TabsTrigger aria-label='System theme' className='h-7 w-7 p-0 rounded-full' value='system'>
          <Monitor className='h-3 w-3' />
        </TabsTrigger>
        <TabsTrigger aria-label='Light theme' className='h-7 w-7 p-0 rounded-full' value='light'>
          <Sun className='h-3 w-3' />
        </TabsTrigger>
        <TabsTrigger aria-label='Dark theme' className='h-7 w-7 p-0 rounded-full' value='dark'>
          <Moon className='h-3 w-3' />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
