import { Button } from '@/common/ui/button';
import { CopyAction } from '@/common/ui/copy-action';
import { HoverMenu } from '@/common/ui/hover-menu';
import { Separator } from '@/common/ui/separator';

import type { BoardActionHandlers } from '../../cardActions';

import { boardHoverMenuItems } from '../model/boardHoverMenuItems';

interface BoardListItemHoverMenuProps {
  canvasUrl: string;
  handlers: BoardActionHandlers;
}

function BoardListItemHoverMenu({ canvasUrl, handlers }: BoardListItemHoverMenuProps) {
  return (
    <HoverMenu>
      <CopyAction className='rounded-sm' value={canvasUrl}>
        Copy link
      </CopyAction>
      <ul className='flex flex-col'>
        <Separator className='my-1' />
        {boardHoverMenuItems.map(({ key, label, variant, icon: Icon }) => (
          <li key={key}>
            <Button
              className='rounded-sm gap-2 p-0 justify-start w-full'
              size='sm'
              variant={variant || 'ghost'}
              onClick={handlers[key]}
            >
              <Icon className='text-muted-foreground' />
              {label}
            </Button>
          </li>
        ))}
      </ul>
    </HoverMenu>
  );
}

export { BoardListItemHoverMenu };
