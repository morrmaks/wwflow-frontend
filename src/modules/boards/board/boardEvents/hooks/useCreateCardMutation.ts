import { useMutation } from '@apollo/client/react';

import type {
  CreateCardMutation,
  CreateCardMutationVariables
} from '@/common/api/graphql/__generated__';

import { CreateCardDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useCreateCardMutation() {
  return useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, {
    onError: (error) => {
      appToast.error('Failed create card', error.message);
    }
  });
}

export { useCreateCardMutation };
