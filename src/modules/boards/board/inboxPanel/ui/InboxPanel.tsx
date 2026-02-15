'use client';

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { CardContainer } from '@/common/api/graphql/__generated__';
import { cn } from '@/common/lib/utils';

import { BoardCardList } from '../../boardCard';
import { inboxContainerId } from '../../boardDnd';
import { CreateCard } from '../../boardEvents';
import { boardBackgrounds } from '../../model';
import { useInboxPanel } from '../hooks/useInboxPanel';
import { InboxDropdownMenu } from './inboxDropdownMenu';

function InboxPanel() {
  const { cardIds, background, setNodeRef } = useInboxPanel();

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'h-full sm:rounded-3xl flex flex-col pb-18 sm:pb-10 sm:border',
        boardBackgrounds[background].class
      )}
    >
      <div className='p-4 flex justify-between w-full mb-3 items-center bg-background/10'>
        <h3 className='font-bold text-base'>Inbox</h3>
        <InboxDropdownMenu />
      </div>

      <div className='p-1 flex flex-col flex-1 min-h-0'>
        <div className='p-1 pb-0'>
          <CreateCard buttonText='Add card' container={CardContainer.Inbox} />
        </div>

        <SortableContext
          id={inboxContainerId}
          items={cardIds}
          strategy={verticalListSortingStrategy}
        >
          <BoardCardList cardIds={cardIds} container={CardContainer.Inbox} />
        </SortableContext>
      </div>
    </div>
  );
}

export { InboxPanel };
