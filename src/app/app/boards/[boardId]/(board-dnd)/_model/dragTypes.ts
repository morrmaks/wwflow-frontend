import type { CardContainer } from '@src/common/api/graphql/__generated__';

interface BoardCardSortableData {
  boardId: string;
  cardId: string;
  columnId?: string;
  container: CardContainer;
  index: number;
  type: 'card';
}

interface BoardColumnSortableData {
  boardId: string;
  columnId: string;
  index: number;
  type: 'column';
}

interface BoardColumnDroppableData {
  columnId: string;
  container: CardContainer;
  type: 'container';
}

type BoardDragData = BoardCardSortableData | BoardColumnSortableData;

export type {
  BoardCardSortableData,
  BoardColumnDroppableData,
  BoardColumnSortableData,
  BoardDragData
};
