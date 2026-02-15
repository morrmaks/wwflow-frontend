'use client';

import type { CanvasCardFragment } from '@/common/api/graphql/__generated__';

import { CanvasCard } from './canvasCard';

function CanvasesSection() {
  // const { data, loading, error } = useCanvasListQuery();

  const datas: { canvasList: CanvasCardFragment[] } = {
    canvasList: [
      {
        id: '1',
        name: 'Canvas 1',
        updatedAt: '2022-01-01',
        previewSrc:
          'https://images.unsplash.com/photo-1767865654598-430f977d28f4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        invitedEmails: ['dfsf', 'sdfsdfsdf', 'fdsfsd']
      },
      {
        id: '2',
        name: 'Canvas 1',
        updatedAt: '2022-01-01',
        previewSrc: '',
        invitedEmails: []
      }
    ]
  };
  // if (loading) return <CanvasCardSkeleton />;

  // if (error) return <p>Something went wrong</p>;

  return (
    <ul className='grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {datas?.canvasList?.map((card) => (
        <li key={card.id}>
          <CanvasCard card={card} />
        </li>
      ))}
    </ul>
  );
}

export { CanvasesSection };
