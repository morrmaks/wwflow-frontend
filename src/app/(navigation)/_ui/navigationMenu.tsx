import { Button } from '@src/common/ui/button';
import { SheetClose } from '@src/common/ui/sheet';
import Link from 'next/link';

import { navigationMenuConfig } from '../_model/navigationMenuConfig';

function NavigationMenu() {
  return (
    <nav>
      <ul className='flex flex-col items-start'>
        {navigationMenuConfig.map((item) => (
          <li key={item.href} className='w-full'>
            <SheetClose asChild>
              <Button asChild className='w-full rounded-none' size='lg' variant='link'>
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
