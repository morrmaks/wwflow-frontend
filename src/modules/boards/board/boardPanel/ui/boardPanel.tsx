import { cn } from '@/common/lib/utils';
import { EditableInput } from '@/common/ui/editable-input';

import { boardBackgrounds } from '../../model';
import { BoardColumnList } from '../boardColumn';
import { useBoardPanel } from '../hooks/useBoardPanel';
import { BoardDropdownMenu } from './boardDropdownMenu';

function BoardPanel() {
  const { title, background, handleTitleChange } = useBoardPanel();

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-accent sm:rounded-3xl sm:border',
        boardBackgrounds[background].class
      )}
    >
      <div className='p-4 flex justify-between w-full mb-3 items-center bg-background/10'>
        <EditableInput className='font-bold text-base' value={title} onSubmit={handleTitleChange} />
        <BoardDropdownMenu />
      </div>
      <BoardColumnList />
    </div>
  );
}

export { BoardPanel };
