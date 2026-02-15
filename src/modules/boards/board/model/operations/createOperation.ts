import { nanoid } from 'nanoid';

import type { BoardEvent } from '@/common/api/graphql/__generated__';

import type { BoardStore, BoardStoreState } from '../boardStore';

function createOperation<Input>(
  type: BoardEvent['__typename'],
  optimistic: (input: Input) => (state: BoardStoreState) => BoardStoreState,
  rollback?: (input: Input) => (state: BoardStoreState) => BoardStoreState
) {
  return (store: BoardStore) =>
    (input: Input, delay: number = 0) => {
      const id = nanoid();

      const optimisticUpdater = optimistic(input);

      let timer: ReturnType<typeof setTimeout> | null = null;

      if (delay > 0) {
        timer = setTimeout(() => store.setState(optimisticUpdater), delay);
      } else {
        store.setState(optimisticUpdater);
      }

      if (!rollback) {
        return {
          cancelOptimistic: () => {
            if (timer) clearTimeout(timer);
          }
        };
      }

      const rollbackUpdater = rollback(input);

      store.getState().addPendingRollback(type, {
        id,
        rollback: () => store.setState(rollbackUpdater)
      });

      return {
        store,
        rollbackId: id,
        rollbackType: type,
        cancelOptimistic: () => {
          if (timer) clearTimeout(timer);
        }
      };
    };
}

export { createOperation };
