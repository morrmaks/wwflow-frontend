import type { BoardBackground } from '@src/common/api/graphql/__generated__';

import { cn } from '@src/common/lib/utils';
import { Button } from '@src/common/ui/button';
import { Separator } from '@src/common/ui/separator';
import { CheckIcon } from 'lucide-react';

import { boardBackgroundGradients, boardBackgroundSolids } from '../../_model/boardBackgrounds';

interface BackgroundListProps {
  selected: BoardBackground;
  onSelect: (bg: BoardBackground) => void;
}

function BackgroundList({ selected, onSelect }: BackgroundListProps) {
  return (
    <>
      <ul className='grid grid-cols-2 gap-2'>
        {boardBackgroundGradients.map(([key, value]) => (
          <li key={key}>
            <Button
              className={cn(
                value.class,
                'relative flex items-end justify-start',
                'w-full h-24 rounded-sm hover:opacity-70'
              )}
              variant='ghost'
              onClick={() => onSelect(key)}
            >
              {selected === key && (
                <CheckIcon
                  className='absolute text-accent dark:text-accent-foreground inset-0 m-auto'
                  viewBox='0 0 20 20'
                />
              )}
              <p className='text-sm'>{value.emoji}</p>
            </Button>
          </li>
        ))}
      </ul>
      <Separator className='w-full my-4' />
      <ul className='grid grid-cols-3 gap-2'>
        {boardBackgroundSolids.map(([key, value]) => (
          <li key={key}>
            <Button
              className={cn(
                value.class,
                'flex items-center justify-center w-24 h-24 rounded-sm'
              )}
              variant='ghost'
              onClick={() => onSelect(key)}
            >
              {selected === key && (
                <CheckIcon
                  className='text-accent dark:text-accent-foreground'
                  viewBox='0 0 20 20'
                />
              )}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}

export { BackgroundList };
