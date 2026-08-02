import type {
  LogoutMutation,
  LogoutMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { LogoutDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { authStore } from '../../_model/store';

function useLogoutMutation() {
  return useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, {
    onCompleted: () => {
      authStore.get().setGuest();
      appToast.success('Logout successful');
    },
    onError: (error) => {
      appToast.error('Logout error', error.message);
    }
  });
}

export { useLogoutMutation };
