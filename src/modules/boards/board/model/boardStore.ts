import type { StoreApi } from 'zustand';

import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { BoardSnapshotFragment } from '@/common/api/graphql/__generated__';

import type { BoardStoreState, PendingEntry, PendingType } from './boardStoreState';

import { applyBoardEvent } from '../boardEvents';
import { normalizeBoardSnapshot } from './boardNormalizer';

function createBoardStore(initialBoard: BoardSnapshotFragment) {
  const normalized = normalizeBoardSnapshot(initialBoard);

  return createStore<BoardStoreState>()(
    devtools((set) => ({
      ...normalized,

      applyEvent: (event) =>
        set((state) => {
          if (event.revision <= state.revision) return state;
          return applyBoardEvent(state, event);
        }),

      addPendingRollback: (type: PendingType, entry: PendingEntry) =>
        set((state) => ({
          pendingRollback: {
            ...state.pendingRollback,
            [type]: [...(state.pendingRollback[type] ?? []), entry]
          }
        })),

      consumePendingRollback: (type: PendingType, id: string) =>
        set((state) => {
          const list = state.pendingRollback[type] ?? [];
          const index = list.findIndex((e) => e.id === id);
          if (index === -1) return state;

          list[index].rollback();

          return {
            pendingRollback: {
              ...state.pendingRollback,
              [type]: list.slice(0, index)
            }
          };
        }),

      reset: () => {}
    }))
  );
}

type BoardStore = StoreApi<BoardStoreState>;

export { type BoardStore, type BoardStoreState, createBoardStore };
