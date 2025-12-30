'use client';

import { Monitor, Moon, Sun } from 'lucide-react';

import { useThemeClient } from '@/common/hooks/useThemeClient';
import { Button } from '@/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/common/ui/dropdown-menu';
import { Skeleton } from '@/common/ui/skeleton';

export function ThemeDropdown() {
  const { mounted, theme, setTheme } = useThemeClient();

  const icon = theme === 'dark' ? <Moon /> : theme === 'light' ? <Sun /> : <Monitor />;

  if (!mounted) return <Skeleton className='h-9 w-9' />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label='Toggle theme' size='icon'>
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
