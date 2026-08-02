import { CardContainer } from '@src/common/api/graphql/__generated__';

import type { BoardStoreState } from './store/boardStoreState';

function removeCardFromAllContainers(state: BoardStoreState, cardId: string) {
  return {
    inboxCardIds: state.inboxCardIds.filter((id) => id !== cardId),
    columns: state.columns.map((col) =>
      col.cardIds.includes(cardId)
        ? { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) }
        : col
    )
  };
}

function computeCardPosition(ids: string[], cards: BoardStoreState['cards'], index?: number) {
  const safeIndex = Math.max(0, Math.min(index ?? ids.length, ids.length));
  const prev = ids[safeIndex - 1] ? cards[ids[safeIndex - 1]] : undefined;
  const next = ids[safeIndex] ? cards[ids[safeIndex]] : undefined;

  if (!prev && !next) return 1000;
  if (!prev) return next!.position / 2;
  if (!next) return prev.position + 1000;

  return (prev.position + next.position) / 2;
}

function insertCardIntoContainer(
  state: BoardStoreState,
  cardId: string,
  container: CardContainer,
  columnId: string | null,
  cards: BoardStoreState['cards']
) {
  if (container === CardContainer.Inbox) {
    return {
      inboxCardIds: [...state.inboxCardIds, cardId].sort(
        (a, b) => cards[a].position - cards[b].position
      ),
      columns: state.columns
    };
  }

  return {
    inboxCardIds: state.inboxCardIds,
    columns: state.columns.map((col) =>
      col.id === columnId
        ? {
            ...col,
            cardIds: [...col.cardIds, cardId].sort((a, b) => cards[a].position - cards[b].position)
          }
        : col
    )
  };
}

function computeColumnPosition(
  columns: BoardStoreState['columns'],
  fromIndex: number,
  toIndex: number
) {
  const without = columns.filter((_, i) => i !== fromIndex);

  const prev = without[toIndex - 1];
  const next = without[toIndex];

  if (!prev && !next) return 1000;
  if (!prev) return next.position / 2;
  if (!next) return prev.position + 1000;

  return (prev.position + next.position) / 2;
}

export {
  computeCardPosition,
  computeColumnPosition,
  insertCardIntoContainer,
  removeCardFromAllContainers
};
