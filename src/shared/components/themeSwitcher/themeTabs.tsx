'use client';

import { Monitor, Moon, Sun } from 'lucide-react';

import { useThemeClient } from '@/shared/hooks/useThemeClient';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

export function ThemeTabs() {
  const { mounted, theme, setTheme } = useThemeClient();

  if (!mounted) return null;

  return (
    <Tabs className='w-fit' value={theme ?? 'system'} onValueChange={(value) => setTheme(value)}>
      <TabsList>
        <TabsTrigger aria-label='System theme' value='system'>
          <Monitor className='h-4 w-4' />
        </TabsTrigger>
        <TabsTrigger aria-label='Light theme' value='light'>
          <Sun className='h-4 w-4' />
        </TabsTrigger>
        <TabsTrigger aria-label='Dark theme' value='dark'>
          <Moon className='h-4 w-4' />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
