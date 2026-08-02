'use client';

import { useCopy } from '@siberiacancode/reactuse';
import { CheckIcon, CopyIcon } from 'lucide-react';

import { cn } from '@src/common/lib/utils';

import { Button } from './button';

interface CopyActionProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  value: string;
}

function CopyAction({ value, children, delay = 1500, className }: CopyActionProps) {
  const { copied, copy } = useCopy(delay);

  return (
    <Button
      className={cn('justify-start gap-2', className)}
      size='sm'
      type='button'
      variant='ghost'
      onClick={() => copy(value)}
    >
      {copied ? (
        <CheckIcon className='h-4 w-4 text-chart-2 stroke-[3]' />
      ) : (
        <CopyIcon className='h-4 w-4 text-muted-foreground' />
      )}
      {children}
    </Button>
  );
}

export { CopyAction };
