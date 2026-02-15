import type { BoardBackground, BoardEvent, PanelLayout } from '@/common/api/graphql/__generated__';

type CardId = string;
type ColumnId = string;

interface Card {
  completed: boolean;
  id: string;
  title: string;
}

interface Column {
  cardIds: CardId[];
  id: ColumnId;
  title: string;
}

type PanelId = Exclude<keyof PanelLayout, '__typename'>;

type PanelLayoutModel = Partial<Record<PanelId, number>>;

interface PendingEntry {
  id: string;
  rollback: () => void;
}

type PendingType = BoardEvent['__typename'];

interface BoardStoreState {
  boardBackground: BoardBackground;
  boardId: string;
  cards: Record<CardId, Card>;
  columns: Column[];
  inboxBackground: BoardBackground;
  inboxCardIds: CardId[];
  panelLayout: PanelLayoutModel;
  pendingRollback: Record<PendingType, PendingEntry[]>;
  revision: number;
  title: string;
  addPendingRollback: (type: PendingType, entry: PendingEntry) => void;
  applyEvent: (event: BoardEvent) => void;

  consumePendingRollback: (type: PendingType, id: string) => void;
  reset: () => void;
}

export type {
  BoardStoreState,
  Card,
  CardId,
  Column,
  ColumnId,
  PanelId,
  PanelLayoutModel,
  PendingEntry,
  PendingType
};
