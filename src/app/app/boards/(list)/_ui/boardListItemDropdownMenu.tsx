import type { BoardListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { ROUTES } from '@src/common/constants/routes';
import { getAppUrl } from '@src/common/lib/url';
import { Button } from '@src/common/ui/button';
import { CopyAction } from '@src/common/ui/copy-action';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@src/common/ui/dropdown-menu';
import { Separator } from '@src/common/ui/separator';
import { MoreVerticalIcon } from 'lucide-react';

import {
  BoardPermissionsModal,
  DeleteBoardModal,
  EditBoardModal,
  LeaveBoardModal
} from '../../(actions)';

interface BoardCardHoverMenuProps {
  board: BoardListFieldsFragment;
}

function BoardListItemDropdownMenu({ board }: BoardCardHoverMenuProps) {
  const url = getAppUrl(ROUTES.appBoardsId(board.id));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='p-2' size='icon' variant='ghost'>
          <MoreVerticalIcon className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='relative z-20'>
        <CopyAction className='rounded-sm w-full' value={url}>
          Copy link
        </CopyAction>
        <div className='flex flex-col'>
          <Separator className='my-1' />
          <EditBoardModal board={board} />
          <BoardPermissionsModal board={board} />
          <LeaveBoardModal board={board} />
          <DeleteBoardModal board={board} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { BoardListItemDropdownMenu };
