import type { Metadata } from 'next';

import { Board } from '@src/app/app/boards';

interface Params {
  boardId: string;
}

export const generateMetadata = async ({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> => {
  return {
    title: `Board ${(await params).boardId}`
  };
};

export default async function BoardsIdPage() {
  return (
    <div className='max-h-screen flex flex-col flex-1 page-padding-top pb-0 sm:pb-4 sm:px-6 overflow-hidden'>
      <Board />
    </div>
  );
}
