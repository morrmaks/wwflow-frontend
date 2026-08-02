import { SoundMenuItem } from '@src/app/(sound)';
import { ThemeTabs } from '@src/app/(theme)';
import { useLogoutMutation } from '@src/app/auth/(session)';
import { useAuth } from '@src/app/auth/_hooks/useAuth';
import { ROUTES } from '@src/common/constants/routes';
import { getInitials } from '@src/common/lib/string';
import { Avatar, AvatarFallback, AvatarImage } from '@src/common/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@src/common/ui/dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';

function UserMenu() {
  const [logout, { loading }] = useLogoutMutation();
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <Avatar>
          <AvatarImage src={user?.avatarUrl ?? undefined} />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
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
        <div className='md:hidden'>
          <DropdownMenuSeparator />
          <SoundMenuItem />
          <DropdownMenuSeparator />
          <div className='flex items-center gap-2 px-2 py-1'>
            <DropdownMenuLabel className='px-0'>Theme</DropdownMenuLabel>
            <ThemeTabs />
          </div>
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
