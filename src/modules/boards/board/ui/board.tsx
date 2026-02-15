'use client';

import type { BoardSnapshotFragment } from '@/common/api/graphql/__generated__';

import { BoardBackground } from '@/common/api/graphql/__generated__';

import { BoardEvents } from '../boardEvents';
import { ResizableLayout } from '../resizableLayout';
import { BoardProvider } from './boardProvider';

export const mockBoard: BoardSnapshotFragment = {
  __typename: 'Board',
  id: 'board-1',
  title: 'Demo board',

  panelLayout: {
    __typename: 'PanelLayout',
    inbox: 100
  },
  inboxBackground: BoardBackground.GradientSnow,
  boardBackground: BoardBackground.GradientVolcano,

  revision: 1,

  inboxCards: [
    {
      __typename: 'BoardCard',
      id: 'inbox-1',
      title: 'Inbox task one',
      completed: false,
      orderIndex: 0
    },
    {
      __typename: 'BoardCard',
      id: 'inbox-2',
      title: 'Inbox task two',
      completed: true,
      orderIndex: 1
    },
    {
      __typename: 'BoardCard',
      id: 'inbox-3',
      title: 'Inbox task one',
      completed: false,
      orderIndex: 0
    },
    {
      __typename: 'BoardCard',
      id: 'inbox-4',
      title: 'Inbox task one',
      completed: false,
      orderIndex: 0
    }
  ],

  columns: [
    {
      __typename: 'BoardColumn',
      id: 'col-1',
      title: 'Todo',
      orderIndex: 0,
      cards: [
        {
          __typename: 'BoardCard',
          id: 'card-1',
          title: 'Setup project',
          completed: false,
          orderIndex: 0
        },
        {
          __typename: 'BoardCard',
          id: 'card-2',
          title: 'Create layout',
          completed: false,
          orderIndex: 1
        },
        {
          __typename: 'BoardCard',
          id: 'card-3',
          title: 'Create layout',
          completed: false,
          orderIndex: 2
        },
        {
          __typename: 'BoardCard',
          id: 'card-4',
          title: 'Create layout',
          completed: false,
          orderIndex: 3
        },
        {
          __typename: 'BoardCard',
          id: 'card-5',
          title: 'Create layout',
          completed: false,
          orderIndex: 4
        },
        {
          __typename: 'BoardCard',
          id: 'card-6',
          title: 'Create layout',
          completed: false,
          orderIndex: 5
        },
        {
          __typename: 'BoardCard',
          id: 'card-7',
          title: 'Create layout',
          completed: false,
          orderIndex: 6
        },
        {
          __typename: 'BoardCard',
          id: 'card-8',
          title: 'Create layout',
          completed: false,
          orderIndex: 7
        },
        {
          __typename: 'BoardCard',
          id: 'card-9',
          title: 'Create layout',
          completed: false,
          orderIndex: 8
        },
        {
          __typename: 'BoardCard',
          id: 'card-10',
          title: 'Create layout',
          completed: false,
          orderIndex: 9
        }
      ]
    },
    {
      __typename: 'BoardColumn',
      id: 'col-2',
      title: 'In Progress',
      orderIndex: 1,
      cards: [
        {
          __typename: 'BoardCard',
          id: 'card-11',
          title: 'Implement resizable panels',
          completed: false,
          orderIndex: 0
        }
      ]
    },
    {
      __typename: 'BoardColumn',
      id: 'col-3',
      title: 'Done',
      orderIndex: 2,
      cards: [
        {
          __typename: 'BoardCard',
          id: 'card-12',
          title: 'Create board snapshot',
          completed: true,
          orderIndex: 0
        }
      ]
    }
  ]
};

// interface Params {
//   boardId: string;
// }

function Board() {
  // const { boardId } = useParams<Params>();
  // const { data, loading } = useBoardSnapshotQuery(boardId)
  // if (loading) return <BoardSkeleton />;

  // if (!data?.board) return <div>Board not found</div>;

  return (
    <BoardProvider initialBoard={mockBoard}>
      <BoardEvents boardId={mockBoard.id} />
      <ResizableLayout />
    </BoardProvider>
  );
}

export { Board };
