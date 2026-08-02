import type { BoardSnapshotFragment } from '@src/common/api/graphql/__generated__';

import { removeEmpty } from '@src/common/lib/object';

import type { BoardStoreState, CardId } from './boardStoreState';

function normalizeBoardSnapshot(snapshot: BoardSnapshotFragment) {
  const cards: BoardStoreState['cards'] = {};
  const inboxCardIds: CardId[] = [];

  snapshot.inboxCards.forEach((card) => {
    cards[card.id] = {
      id: card.id,
      title: card.title,
      position: card.position,
      completed: card.completed
    };
    inboxCardIds.push(card.id);
  });

  const columns = snapshot.columns.map((col) => {
    const cardIds: CardId[] = [];

    col.cards.forEach((card) => {
      cards[card.id] = {
        id: card.id,
        title: card.title,
        position: card.position,
        completed: card.completed
      };
      cardIds.push(card.id);
    });

    return {
      id: col.id,
      title: col.title,
      position: col.position,
      cardIds
    };
  });

  const { __typename, ...rest } = snapshot.panelLayout;
  const panelLayout = removeEmpty(rest);

  return {
    boardId: snapshot.id,
    title: snapshot.title,
    revision: snapshot.revision,
    boardBackground: snapshot.boardBackground,
    inboxBackground: snapshot.inboxBackground,
    panelLayout,
    cards,
    inboxCardIds,
    columns,
    pendingEvents: {},
    revisionGap: false,
    pendingRollback: {}
  };
}

export { normalizeBoardSnapshot };
