import { cn } from '@src/common/lib/utils';
import { EditableInput } from '@src/common/ui/editable-input';

import { BoardColumnList } from '../(board-column)';
import { boardBackgrounds } from '../../_model/boardBackgrounds';
import { useBoardPanel } from '../_hooks/useBoardPanel';
import { BoardDropdownMenu } from './boardDropdownMenu';

function BoardPanel() {
  const { title, background, handleTitleChange } = useBoardPanel();

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-accent sm:rounded-3xl sm:border-3',
        boardBackgrounds[background].class
      )}
    >
      <div className='p-4 flex justify-between w-full mb-3 items-center bg-background/10'>
        <EditableInput
          className='font-bold text-base'
          name='board-name'
          value={title}
          onSubmit={handleTitleChange}
        />
        <BoardDropdownMenu />
      </div>
      <BoardColumnList />
    </div>
  );
}

export { BoardPanel };
