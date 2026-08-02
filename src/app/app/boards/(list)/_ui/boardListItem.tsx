import type { BoardListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { memberRoleLabels } from '@src/app/app/(permissions)';
import { ROUTES } from '@src/common/constants/routes';
import { formatRelativeDate } from '@src/common/lib/date';
import { Badge } from '@src/common/ui/badge';
import { Card, CardFooter, CardTitle } from '@src/common/ui/card';
import { PencilIcon, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { BoardListItemDropdownMenu } from './boardListItemDropdownMenu';

interface BoardListItemProps {
  board: BoardListFieldsFragment;
}

function BoardListItem({ board }: BoardListItemProps) {
  const { updatedAt, id, previewUrl, title, membersCount, myRole } = board;

  return (
    <Card className='transition-colors hover:border-primary pt-0 overflow-hidden'>
      <Link href={ROUTES.appBoardsId(id)}>
        <div className='flex justify-center items-center aspect-video w-full overflow-hidden bg-muted'>
          {previewUrl ? (
            <Image
              alt={title}
              className='border-none w-full h-full object-cover'
              height={180}
              src={previewUrl}
              width={320}
            />
          ) : (
            <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center'>
              <PencilIcon className='w-8 h-8 text-muted-foreground' />
            </div>
          )}
        </div>
      </Link>
      <CardFooter className='flex flex-col gap-3'>
        <div className='flex items-center justify-between w-full gap-2'>
          <Link href={ROUTES.appBoardsId(id)}>
            <CardTitle>{title}</CardTitle>
          </Link>
          <BoardListItemDropdownMenu board={board} />
        </div>

        <div className='flex items-end justify-between gap-2 w-full text-sm text-muted-foreground'>
          <div className='flex flex-wrap items-center gap-3'>
            <Badge className='flex items-center gap-1' variant='outline'>
              <UsersIcon className='w-4 h-4' />
              <span>{membersCount}</span>
            </Badge>

            <Badge variant='outline'>{memberRoleLabels[myRole]}</Badge>
          </div>
          <span>{formatRelativeDate(updatedAt)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export { BoardListItem };
