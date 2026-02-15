import { useMutation } from '@apollo/client/react';

import type { LoginMutation, LoginMutationVariables } from '@/common/api/graphql/__generated__';

import { revalidateGetMeQuery } from '@/common/api/apolloClient/client';
import { LoginDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useLoginMutation() {
  return useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
    onCompleted: (data) => {
      revalidateGetMeQuery(data.login.user);
      appToast.success('Login successful');
    },
    onError: (error) => {
      appToast.error('Login error', error.message);
    }
  });
}

export { useLoginMutation };
