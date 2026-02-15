import { CardContainer } from '@/common/api/graphql/__generated__';

import { CreateCard } from '../../boardEvents';
import { BoardCard } from './boardCard';
import { BoardCardListEmpty } from './boardCardListEmpty';

interface BoardCardListProps {
  cardIds: string[];
  columnId?: string;
  container: CardContainer;
  isOver?: boolean;
}

function BoardCardList({ cardIds, container, columnId, isOver }: BoardCardListProps) {
  if (!cardIds.length) return <BoardCardListEmpty isOver={isOver} />;

  return (
    <ul className='flex flex-col flex-1 min-h-0 overflow-y-auto px-1 py-3'>
      {cardIds.map((id, index) => (
        <li key={id}>
          {container === CardContainer.Column && (
            <CreateCard index={index} variant='inline' columnId={columnId} container={container} />
          )}

          <BoardCard cardId={id} index={index} columnId={columnId} container={container} />

          {container === CardContainer.Inbox && (
            <CreateCard
              index={index + 1}
              variant='inline'
              columnId={columnId}
              container={container}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export { BoardCardList };
