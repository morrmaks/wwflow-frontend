import type { LoginMutation, LoginMutationVariables } from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { LoginDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { authStore } from '../../_model/store';

function useLoginMutation() {
  return useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
    onCompleted: (data) => {
      authStore.get().setAuth(data.login);
      appToast.success('Login successful');
    },
    onError: (error) => {
      appToast.error('Login error', error.message);
    }
  });
}

export { useLoginMutation };
