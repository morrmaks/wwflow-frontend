'use client';

import { Tabs, TabsList, TabsTrigger } from '@src/common/ui/tabs';
import { Monitor, Moon, Sun } from 'lucide-react';

import { useTheme } from '../_hooks/useTheme';
import { isTheme } from '../_model/utils';

export function ThemeTabs() {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs
      className='w-fit'
      value={theme ?? 'system'}
      onValueChange={(value) => {
        if (isTheme(value)) setTheme(value);
      }}
    >
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
