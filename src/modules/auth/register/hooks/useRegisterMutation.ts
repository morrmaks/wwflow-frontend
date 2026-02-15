import { useMutation } from '@apollo/client/react';

import type {
  RegisterMutation,
  RegisterMutationVariables
} from '@/common/api/graphql/__generated__';

import { revalidateGetMeQuery } from '@/common/api/apolloClient/client';
import { RegisterDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useRegisterMutation() {
  return useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, {
    onCompleted: (data) => {
      revalidateGetMeQuery(data.register.user);
      appToast.success('Registration successful');
    },
    onError: (error) => {
      appToast.error('Registration error', error.message);
    }
  });
}

export { useRegisterMutation };
