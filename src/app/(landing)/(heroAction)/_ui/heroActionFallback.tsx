import { ROUTES } from '@src/common/constants/routes';
import { Button } from '@src/common/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

function HeroActionFallback() {
  return (
    <Button asChild className='py-4' size='lg' variant='default'>
      <Link href={ROUTES.authLogin}>
        Get started
        <ArrowRightIcon className='ml-1 h-4 w-4' />
      </Link>
    </Button>
  );
}

export { HeroActionFallback };
