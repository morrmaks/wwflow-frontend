import Link from 'next/link';

import { ROUTES } from '@/common/constants/routes';

export function Logo() {
  return (
    <Link href={ROUTES.main} className='text-xl font-bold pointer-events-auto'>
      WWFlow
    </Link>
  );
}
