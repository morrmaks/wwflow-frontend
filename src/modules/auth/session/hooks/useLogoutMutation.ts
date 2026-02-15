import { useMutation } from '@apollo/client/react';

import type { LogoutMutation, LogoutMutationVariables } from '@/common/api/graphql/__generated__';

import { forceLogout } from '@/common/api/apolloClient/client';
import { LogoutDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useLogoutMutation() {
  return useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, {
    onCompleted: () => {
      forceLogout();
      appToast.success('Logout successful');
    },
    onError: (error) => {
      appToast.error('Logout error', error.message);
    }
  });
}

export { useLogoutMutation };
