import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/common/constants/routes';
import { Button } from '@/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/common/ui/dropdown-menu';
import { useLogoutMutation } from '@/modules/auth/session';
import { ThemeTabs } from '@/modules/theme';

function UserMenu() {
  const [logout, { loading }] = useLogoutMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label='Toggle theme' className='rounded-full' size='icon'>
          фи
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <Link href={ROUTES.appProfile}>
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href={ROUTES.appSettings}>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <div className='flex items-center gap-2'>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <ThemeTabs />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={loading} variant='destructive' onClick={() => logout()}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserMenu };
