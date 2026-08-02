import type { BoardBackground } from '@src/common/api/graphql/__generated__';

import type { BoardStoreState } from '../store/boardStoreState';

import { createOperation } from './createOperation';

interface UpdateInboxBackgroundInput {
  background: BoardBackground;
  clientMutationId: string;
  prevBackground: BoardBackground;
}

const updateInboxBackgroundOptimistic =
  (input: UpdateInboxBackgroundInput) => (state: BoardStoreState) => ({
    ...state,
    inboxBackground: input.background
  });

const updateInboxBackgroundRollback =
  (input: UpdateInboxBackgroundInput) => (state: BoardStoreState) => ({
    ...state,
    inboxBackground: input.prevBackground
  });

const updateInboxBackgroundOperation = createOperation(
  'InboxBackgroundChanged',
  updateInboxBackgroundOptimistic,
  updateInboxBackgroundRollback
);

export { updateInboxBackgroundOperation };
