import { useMutation } from '@apollo/client/react';

import type {
  RefreshSessionMutation,
  RefreshSessionMutationVariables
} from '@/common/api/graphql/__generated__';

import { forceLogout } from '@/common/api/client/session';
import { RefreshSessionDocument } from '@/common/api/graphql/__generated__';

function useRefreshSessionMutation() {
  return useMutation<RefreshSessionMutation, RefreshSessionMutationVariables>(
    RefreshSessionDocument,
    {
      onError: () => forceLogout()
    }
  );
}

export { useRefreshSessionMutation };
