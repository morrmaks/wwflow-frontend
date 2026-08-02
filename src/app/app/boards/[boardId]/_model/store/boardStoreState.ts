import type {
  BoardBackground,
  BoardEventsSubscription,
  PanelLayout
} from '@src/common/api/graphql/__generated__';

type BoardEventEnvelope = BoardEventsSubscription['boardEvents'];
type BoardEvent = BoardEventEnvelope['event'];

type CardId = string;
type ColumnId = string;

interface Card {
  completed: boolean;
  id: string;
  position: number;
  title: string;
}

interface Column {
  cardIds: CardId[];
  id: ColumnId;
  position: number;
  title: string;
}

type PanelId = Exclude<keyof PanelLayout, '__typename'>;

type PanelLayoutModel = Partial<Record<PanelId, number>>;

interface PendingEntry {
  cancelOptimistic: () => void;
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
  pendingEvents: Record<number, BoardEventEnvelope>;
  pendingRollback: Record<PendingType, PendingEntry[]>;
  revision: number;
  revisionGap: boolean;
  title: string;
  addPendingRollback: (type: PendingType, entry: PendingEntry) => void;

  applyEvent: (event: BoardEventEnvelope) => void;
  confirmPendingRollback: (type: PendingType, id: string) => void;
  consumePendingRollback: (type: PendingType, id: string) => void;
}

export type {
  BoardEvent,
  BoardEventEnvelope,
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
