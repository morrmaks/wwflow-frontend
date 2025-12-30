import Link from 'next/link';

import { ROUTES } from '@/common/constants/routes';
import { Button } from '@/common/ui/button';
import { SheetClose } from '@/common/ui/sheet';

const sideMenuItems = [
  { label: 'Boards', href: ROUTES.appBoards },
  { label: 'Canvas', href: ROUTES.appCanvas }
];

function NavigationMenu() {
  return (
    <nav>
      <ul className='flex flex-col items-start'>
        {sideMenuItems.map((item) => (
          <li key={item.href} className='w-full'>
            <SheetClose asChild>
              <Button asChild className='w-full justify-start rounded-none' variant='ghost'>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            </SheetClose>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { NavigationMenu };
