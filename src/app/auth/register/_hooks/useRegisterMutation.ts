import type {
  RegisterMutation,
  RegisterMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { RegisterDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { authStore } from '../../_model/store';

function useRegisterMutation() {
  return useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, {
    onCompleted: (data) => {
      authStore.get().setAuth(data.register);
      appToast.success('Registration successful');
    },
    onError: (error) => {
      appToast.error('Registration error', error.message);
    }
  });
}

export { useRegisterMutation };
