import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CardContainer } from '@src/common/api/graphql/__generated__';
import { cn } from '@src/common/lib/utils';
import { EditableInput } from '@src/common/ui/editable-input';

import { BoardCardList } from '../../../(board-card)';
import { getColumnContainerId } from '../../../(board-dnd)';
import { CreateCard } from '../../../(events)';
import { useBoardColumn } from '../_hooks/useBoardColumn';
import { BoardColumnDropdownMenu } from './boardColumnDropdownMenu';

interface BoardColumnProps {
  columnId: string;
  index: number;
}

function BoardColumn({ columnId, index }: BoardColumnProps) {
  const {
    column,
    cardIds,
    handleDelete,
    handleTitleChange,
    setNodeRef,
    setDropRef,
    isOver,
    attributes,
    listeners,
    isDragging,
    style
  } = useBoardColumn(columnId, index);

  if (!column) return null;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col max-h-full rounded-2xl min-w-64 max-w-90 py-2 border-2 bg-background',
        isDragging && 'dark:opacity-20 opacity-50'
      )}
      style={style}
      {...attributes}
    >
      {isDragging && <div className='absolute inset-0 rounded-2xl bg-chart-2 z-10' />}
      <div className='flex justify-between w-full items-center px-3' {...listeners}>
        <EditableInput
          className='font-bold text-sm max-w-75 text-ellipsis'
          name='column-name'
          value={column.title}
          onSubmit={handleTitleChange}
        />
        <BoardColumnDropdownMenu onDelete={handleDelete} />
      </div>

      <div ref={setDropRef} className='px-1 flex flex-col flex-1 min-h-0 w-full' data-droppable>
        <SortableContext
          id={getColumnContainerId(columnId)}
          items={cardIds}
          strategy={verticalListSortingStrategy}
        >
          <BoardCardList
            cardIds={cardIds}
            isOver={isOver}
            columnId={columnId}
            container={CardContainer.Column}
          />
        </SortableContext>
      </div>

      <div className='shrink-0 px-2'>
        <CreateCard
          className='dark:bg-transparent bg-transparent border-none'
          buttonText='Add card'
          columnId={columnId}
          container={CardContainer.Column}
        />
      </div>
    </div>
  );
}

export { BoardColumn };
