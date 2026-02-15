import type { BoardEvent } from '@/common/api/graphql/__generated__';

import { removeEmpty } from '@/common/lib/utils';

import type { BoardStoreState } from '../../model/boardStore';

import { columnContainerId, inboxContainerId } from '../../boardDnd';

function removeCardFromAllContainers(state: BoardStoreState, cardId: string) {
  return {
    inboxCardIds: state.inboxCardIds.filter((id) => id !== cardId),
    columns: state.columns.map((col) => ({
      ...col,
      cardIds: col.cardIds.filter((id) => id !== cardId)
    }))
  };
}

function applyBoardEvent(state: BoardStoreState, event: BoardEvent): BoardStoreState {
  switch (event.__typename) {
    case 'BoardRenamed':
      return {
        ...state,
        revision: event.revision,
        title: event.title,
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };

    case 'BoardBackgroundChanged':
      return {
        ...state,
        revision: event.revision,
        boardBackground: event.background,
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };

    case 'InboxBackgroundChanged':
      return {
        ...state,
        revision: event.revision,
        inboxBackground: event.background,
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };

    case 'ColumnCreated': {
      const { column, clientId, index, revision } = event;

      const exists = state.columns.some((col) => col.id === clientId);

      let columns = state.columns;

      if (exists) {
        columns = state.columns.map((col) =>
          col.id === clientId ? { ...col, id: column.id, title: column.title } : col
        );
      } else {
        columns = [...state.columns];
        columns.splice(index, 0, {
          id: column.id,
          title: column.title,
          cardIds: []
        });
      }

      return {
        ...state,
        revision,
        columns,
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };
    }

    case 'ColumnMoved': {
      const { columnId, toIndex, revision } = event;

      const fromIndex = state.columns.findIndex((c) => c.id === columnId);
      const columns = [...state.columns];

      const [moved] = columns.splice(fromIndex, 1);
      columns.splice(toIndex, 0, moved);

      return {
        ...state,
        revision,
        columns,
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };
    }

    case 'ColumnRenamed': {
      const { columnId, title, revision } = event;
      return {
        ...state,
        revision,
        columns: state.columns.map((col) => (col.id === columnId ? { ...col, title } : col)),
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };
    }

    case 'ColumnDeleted': {
      return {
        ...state,
        revision: event.revision,
        columns: state.columns.filter((col) => col.id !== event.columnId),
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };
    }

    case 'CardCreated': {
      const { clientId, card, container, columnId, index, revision } = event;

      const hasOptimistic = !!state.cards[clientId];

      let cards = state.cards;

      if (hasOptimistic) {
        const { [clientId]: _, ...rest } = state.cards;

        cards = {
          ...rest,
          [card.id]: {
            id: card.id,
            title: card.title,
            completed: card.completed
          }
        };
      } else {
        cards = {
          ...state.cards,
          [card.id]: {
            id: card.id,
            title: card.title,
            completed: card.completed
          }
        };
      }

      if (container === 'INBOX') {
        let inboxCardIds = state.inboxCardIds;

        if (hasOptimistic) {
          inboxCardIds = state.inboxCardIds.map((id) => (id === clientId ? card.id : id));
        } else {
          inboxCardIds = [...state.inboxCardIds];
          inboxCardIds.splice(index, 0, card.id);
        }

        return {
          ...state,
          revision,
          cards,
          inboxCardIds,
          pendingRollback: {
            ...state.pendingRollback,
            [event.__typename]: []
          }
        };
      }

      const columns = state.columns.map((col) => {
        if (col.id !== columnId) return col;

        let cardIds = col.cardIds;

        if (hasOptimistic) {
          cardIds = col.cardIds.map((id) => (id === clientId ? card.id : id));
        } else {
          cardIds = [...col.cardIds];
          cardIds.splice(index, 0, card.id);
        }

        return {
          ...col,
          cardIds
        };
      });

      return {
        ...state,
        revision,
        cards,
        columns,
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };
    }

    case 'CardMoved': {
      const { cardId, to, revision } = event;

      const cleared = removeCardFromAllContainers(state, cardId);

      const inboxCardIds =
        to.container === inboxContainerId
          ? (() => {
              const next = [...cleared.inboxCardIds];
              next.splice(to.index, 0, cardId);
              return next;
            })()
          : cleared.inboxCardIds;

      const columns =
        to.container === columnContainerId
          ? cleared.columns.map((col) => {
              if (col.id !== to.columnId) return col;

              const next = [...col.cardIds];
              next.splice(to.index, 0, cardId);

              return { ...col, cardIds: next };
            })
          : cleared.columns;

      return {
        ...state,
        revision,
        inboxCardIds,
        columns,
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };
    }

    case 'CardUpdated': {
      const { cardId, patch, revision } = event;
      return {
        ...state,
        revision,
        cards: {
          ...state.cards,
          [cardId]: {
            ...state.cards[cardId],
            ...removeEmpty(patch)
          }
        },
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };
    }

    case 'CardDeleted': {
      const { cardId, revision } = event;
      const { [cardId]: card, ...cards } = state.cards;
      const { inboxCardIds, columns } = removeCardFromAllContainers(state, cardId);

      return {
        ...state,
        revision,
        cards,
        columns,
        inboxCardIds,
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };
    }
  }
  const _exhaustive: never = event;
}

export { applyBoardEvent };
