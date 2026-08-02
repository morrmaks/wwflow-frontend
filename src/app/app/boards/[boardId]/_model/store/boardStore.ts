import type { BoardSnapshotFragment } from '@src/common/api/graphql/__generated__';
import type { StoreApi } from 'zustand';

import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { BoardStoreState, PendingEntry, PendingType } from './boardStoreState';

import { applyBoardEvent } from '../boardEventReducer';
import { normalizeBoardSnapshot } from './boardNormalizer';

import type { BoardEventEnvelope } from './boardStoreState';

function confirmPendingRollback(state: BoardStoreState, type: PendingType, id: string) {
  const list = state.pendingRollback[type] ?? [];
  const index = list.findIndex((entry) => entry.id === id);
  if (index === -1) return state;

  list[index].cancelOptimistic();

  return {
    ...state,
    pendingRollback: {
      ...state.pendingRollback,
      [type]: [...list.slice(0, index), ...list.slice(index + 1)]
    }
  };
}

function applyConfirmedEnvelope(state: BoardStoreState, envelope: BoardEventEnvelope) {
  const pendingRollback = state.pendingRollback;
  let nextState = {
    ...applyBoardEvent(state, envelope.event),
    pendingRollback
  };

  if (envelope.clientMutationId) {
    nextState = confirmPendingRollback(
      nextState,
      envelope.event.__typename,
      envelope.clientMutationId
    );
  }

  return nextState;
}

function applyEnvelope(state: BoardStoreState, envelope: BoardEventEnvelope): BoardStoreState {
  if (envelope.boardId !== state.boardId) return state;
  if (envelope.revision <= state.revision) return state;

  if (envelope.revision !== state.revision + 1) {
    return {
      ...state,
      revisionGap: true,
      pendingEvents: {
        ...state.pendingEvents,
        [envelope.revision]: envelope
      }
    };
  }

  let nextState = applyConfirmedEnvelope(state, envelope);
  let nextEnvelope = nextState.pendingEvents[nextState.revision + 1];

  while (nextEnvelope) {
    const { [nextEnvelope.revision]: _, ...pendingEvents } = nextState.pendingEvents;
    nextState = applyConfirmedEnvelope({ ...nextState, pendingEvents }, nextEnvelope);
    nextEnvelope = nextState.pendingEvents[nextState.revision + 1];
  }

  return {
    ...nextState,
    revisionGap: Object.keys(nextState.pendingEvents).length > 0
  };
}

function createBoardStore(initialBoard: BoardSnapshotFragment) {
  const normalized = normalizeBoardSnapshot(initialBoard);

  return createStore<BoardStoreState>()(
    devtools((set) => ({
      ...normalized,

      applyEvent: (event) =>
        set((state) => {
          return applyEnvelope(state, event);
        }),

      addPendingRollback: (type: PendingType, entry: PendingEntry) =>
        set((state) => ({
          pendingRollback: {
            ...state.pendingRollback,
            [type]: [...(state.pendingRollback[type] ?? []), entry]
          }
        })),

      confirmPendingRollback: (type: PendingType, id: string) =>
        set((state) => confirmPendingRollback(state, type, id)),

      consumePendingRollback: (type: PendingType, id: string) =>
        set((state) => {
          const list = state.pendingRollback[type] ?? [];
          const index = list.findIndex((e) => e.id === id);
          if (index === -1) return state;

          list[index].cancelOptimistic();
          list[index].rollback();

          return {
            pendingRollback: {
              ...state.pendingRollback,
              [type]: [...list.slice(0, index), ...list.slice(index + 1)]
            }
          };
        })
    }))
  );
}

type BoardStore = StoreApi<BoardStoreState>;

export { type BoardStore, type BoardStoreState, createBoardStore };
