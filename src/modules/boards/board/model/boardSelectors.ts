import type { BoardStoreState } from './boardStoreState';

const getBoardId = (s: BoardStoreState) => s.boardId;
const getBoardTitle = (s: BoardStoreState) => s.title;
const getBoardRevision = (s: BoardStoreState) => s.revision;

const getBoardBackground = (s: BoardStoreState) => s.boardBackground;
const getInboxBackground = (s: BoardStoreState) => s.inboxBackground;
const getPanelLayout = (s: BoardStoreState) => s.panelLayout;

const getColumns = (s: BoardStoreState) => s.columns;
const getColumnIds = (s: BoardStoreState) => s.columns.map((c) => c.id);
const getInboxCardIds = (s: BoardStoreState) => s.inboxCardIds;
const getCardsMap = (s: BoardStoreState) => s.cards;

const getCardById = (id: string) => (s: BoardStoreState) => s.cards[id];

const getColumnById = (columnId: string) => (s: BoardStoreState) =>
  s.columns.find((c) => c.id === columnId);

const getCardIdsByColumnId = (columnId: string) => (s: BoardStoreState) => {
  const column = s.columns.find((c) => c.id === columnId);
  if (!column) return [];
  return column.cardIds;
};

const getCardsByColumnId = (columnId: string) => (s: BoardStoreState) => {
  const column = s.columns.find((c) => c.id === columnId);
  if (!column) return [];
  return column.cardIds.map((id) => s.cards[id]).filter(Boolean);
};

export {
  getBoardBackground,
  getBoardId,
  getBoardRevision,
  getBoardTitle,
  getCardById,
  getCardIdsByColumnId,
  getCardsByColumnId,
  getCardsMap,
  getColumnById,
  getColumnIds,
  getColumns,
  getInboxBackground,
  getInboxCardIds,
  getPanelLayout
};
