import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import type { LoginMutation, LoginMutationVariables } from '@/common/api/graphql/__generated__';

import { revalidateGetMeQuery } from '@/common/api/client/session';
import { LoginDocument } from '@/common/api/graphql/__generated__';

function useLoginMutation() {
  return useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
    onCompleted: (data) => revalidateGetMeQuery(data.login.user),
    onError: (error) => {
      toast.error('Login error:', { description: error.message });
    }
  });
}

export { useLoginMutation };
