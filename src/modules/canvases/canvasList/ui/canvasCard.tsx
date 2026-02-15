import { PencilIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { CanvasCardFragment } from '@/common/api/graphql/__generated__';

import { ROUTES } from '@/common/constants/routes';
import { Card, CardDescription, CardFooter, CardTitle } from '@/common/ui/card';

import { CanvasCardActions } from '../cardActions';

interface CanvasCardProps {
  card: CanvasCardFragment;
}

function CanvasCard({ card }: CanvasCardProps) {
  const { updatedAt, id, previewSrc, name } = card;

  return (
    <Card className='transition-colors hover:border-primary pt-0 overflow-hidden'>
      <Link href={ROUTES.appCanvasId(id)}>
        <div className='flex justify-center items-center aspect-video w-full overflow-hidden bg-muted'>
          {previewSrc ? (
            <Image
              alt={name}
              className='border-none w-full h-full object-cover'
              height={180}
              src={previewSrc}
              width={320}
            />
          ) : (
            <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center'>
              <PencilIcon className='w-8 h-8 text-muted-foreground' />
            </div>
          )}
        </div>
      </Link>
      <CardFooter className='flex flex-col items-start gap-4'>
        <div className='flex items-center justify-between w-full gap-2'>
          <Link href={ROUTES.appCanvasId(id)}>
            <CardTitle>{name}</CardTitle>
          </Link>
          <CanvasCardActions card={card} />
        </div>
        <CardDescription className='text-muted-foreground'>
          <p>{updatedAt}</p>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export { CanvasCard };
