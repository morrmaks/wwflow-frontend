'use client';

import { useHover } from '@siberiacancode/reactuse';

import { Button } from '@src/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@src/common/ui/dropdown-menu';
import { Monitor } from 'lucide-react';
import { MoonIcon } from '@src/common/ui/moon';
import { SunMediumIcon } from '@src/common/ui/sun-medium';

import { useThemeChange } from '../_hooks/useThemeChange';
import { AnimatedThemeIcon } from './animatedThemeIcon';

export function ThemeDropdown() {
  const { setTheme, resolvedTheme } = useThemeChange();
  const { ref: triggerRef, value: isTriggerHovered } = useHover<HTMLButtonElement>();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button ref={triggerRef} aria-label='Toggle theme' size='icon' variant='ghost'>
          <AnimatedThemeIcon isAnimating={isTriggerHovered} theme={resolvedTheme} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <SunMediumIcon size={18} />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <MoonIcon size={18} />
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
