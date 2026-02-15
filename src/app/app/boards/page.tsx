import type { Metadata } from 'next';

import { BoardsList } from '@/modules/boards';
import { CreateBoardDialog } from '@/modules/boards/createBoard';

export const metadata: Metadata = {
  title: 'Boards'
};

export default function BoardsPage() {
  return (
    <div className='page-padding pt-8'>
      <div className='flex justify-between items-center gap-4'>
        <div>
          <h2 className='text-3xl font-bold'>Boards</h2>
          <p className='text-md text-muted-foreground mt-1'>Organize and manage your projects</p>
        </div>
        <CreateBoardDialog />
      </div>
      <BoardsList />
    </div>
  );
}
