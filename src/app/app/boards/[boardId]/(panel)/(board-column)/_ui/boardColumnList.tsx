import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import { CreateColumn } from '../../../(events)';
import { useBoardStore } from '../../../_hooks/useBoardStore';
import { getColumnIds } from '../../../_model/boardSelectors';
import { BoardColumn } from './boardColumn';

function BoardColumnList() {
  const columnIds = useBoardStore(getColumnIds);

  return (
    <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
      <ul className='flex gap-4 p-2 pb-19 sm:pb-11 overflow-x-auto'>
        {columnIds.map((id, index) => (
          <li key={id}>
            <BoardColumn index={index} columnId={id} />
          </li>
        ))}
        <CreateColumn />
      </ul>
    </SortableContext>
  );
}

export { BoardColumnList };
