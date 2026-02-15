import type { BoardBackground } from '@/common/api/graphql/__generated__';

import type { BoardStoreState } from '../boardStoreState';

import { createOperation } from './createOperation';

interface UpdateInboxBackgroundInput {
  background: BoardBackground;
}

const updateInboxBackgroundOptimistic =
  (input: UpdateInboxBackgroundInput) => (state: BoardStoreState) => ({
    ...state,
    inboxBackground: input.background
  });

const updateInboxBackgroundOperation = createOperation(
  'InboxBackgroundChanged',
  updateInboxBackgroundOptimistic
);

export { updateInboxBackgroundOperation };
