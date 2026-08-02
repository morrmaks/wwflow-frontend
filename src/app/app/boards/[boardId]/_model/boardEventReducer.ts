import { CardContainer } from '@src/common/api/graphql/__generated__';
import { removeEmpty } from '@src/common/lib/object';

import type { BoardStoreState } from './store/boardStore';
import type { BoardEvent } from './store/boardStoreState';

import { insertCardIntoContainer, removeCardFromAllContainers } from './boardStructure';

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
      const { column, clientId, revision } = event;

      const exists = state.columns.some((col) => col.id === clientId);

      let columns;

      if (exists) {
        columns = state.columns.map((col) =>
          col.id === clientId
            ? {
                ...col,
                id: column.id,
                title: column.title,
                position: column.position
              }
            : col
        );
      } else {
        columns = [
          ...state.columns,
          {
            id: column.id,
            title: column.title,
            position: column.position,
            cardIds: []
          }
        ];
      }

      columns.sort((a, b) => a.position - b.position);

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
      const { columnId, position, revision } = event;

      const columns = state.columns.map((col) =>
        col.id === columnId ? { ...col, position } : col
      );

      columns.sort((a, b) => a.position - b.position);

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
      const { clientId, card, container, columnId, revision } = event;

      const { inboxCardIds, columns } = removeCardFromAllContainers(state, clientId);

      const cards = {
        ...state.cards,
        [card.id]: {
          id: card.id,
          title: card.title,
          completed: card.completed,
          position: card.position
        }
      };

      const next = insertCardIntoContainer(
        { ...state, inboxCardIds, columns },
        card.id,
        container,
        columnId ?? null,
        cards
      );

      return {
        ...state,
        revision,
        cards,
        ...next,
        pendingRollback: {
          ...state.pendingRollback,
          [event.__typename]: []
        }
      };
    }

    case 'CardMoved': {
      const { cardId, to, revision } = event;
      const { inboxCardIds, columns } = removeCardFromAllContainers(state, cardId);

      const cards = {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          position: to.position
        }
      };

      let nextInbox = inboxCardIds;
      let nextColumns = columns;

      if (to.container === CardContainer.Inbox) {
        nextInbox = [...inboxCardIds, cardId].sort((a, b) => cards[a].position - cards[b].position);
      }

      if (to.container === CardContainer.Column) {
        nextColumns = columns.map((col) =>
          col.id === to.columnId
            ? {
                ...col,
                cardIds: [...col.cardIds, cardId].sort(
                  (a, b) => cards[a].position - cards[b].position
                )
              }
            : col
        );
      }

      return {
        ...state,
        revision,
        cards,
        inboxCardIds: nextInbox,
        columns: nextColumns,
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
  event satisfies never;
}

export { applyBoardEvent };
