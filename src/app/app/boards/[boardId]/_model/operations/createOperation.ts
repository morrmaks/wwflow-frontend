import { nanoid } from 'nanoid';

import type { BoardStore, BoardStoreState } from '../store/boardStore';
import type { PendingType } from '../store/boardStoreState';

interface OperationInputWithClientMutationId {
  clientMutationId?: string;
}

function createOperation<Input>(
  type: PendingType,
  optimistic: (input: Input) => (state: BoardStoreState) => BoardStoreState,
  rollback?: (input: Input) => (state: BoardStoreState) => BoardStoreState
) {
  return (store: BoardStore) =>
    (input: Input, delay: number = 0) => {
      const id = (input as OperationInputWithClientMutationId).clientMutationId ?? nanoid();

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
        cancelOptimistic: () => {
          if (timer) clearTimeout(timer);
        },
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
