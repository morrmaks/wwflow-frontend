import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import type {
  RegisterMutation,
  RegisterMutationVariables
} from '@/common/api/graphql/__generated__';

import { revalidateGetMeQuery } from '@/common/api/client/session';
import { RegisterDocument } from '@/common/api/graphql/__generated__';

function useRegisterMutation() {
  return useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, {
    onCompleted: (data) => revalidateGetMeQuery(data.register.user),
    onError: (error) => {
      toast.error('Registration error:', { description: error.message });
    }
  });
}

export { useRegisterMutation };
