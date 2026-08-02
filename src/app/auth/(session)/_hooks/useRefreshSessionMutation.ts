import type {
  RefreshSessionMutation,
  RefreshSessionMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { RefreshSessionDocument } from '@src/common/api/graphql/__generated__';

import { authStore } from '../../_model/store';

function useRefreshSessionMutation() {
  return useMutation<RefreshSessionMutation, RefreshSessionMutationVariables>(
    RefreshSessionDocument,
    {
      onError: () => authStore.get().setGuest()
    }
  );
}

export { useRefreshSessionMutation };
