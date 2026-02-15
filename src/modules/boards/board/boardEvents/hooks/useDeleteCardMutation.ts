import { useMutation } from '@apollo/client/react';

import type {
  DeleteCardMutation,
  DeleteCardMutationVariables
} from '@/common/api/graphql/__generated__';

import { DeleteCardDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useDeleteCardMutation() {
  return useMutation<DeleteCardMutation, DeleteCardMutationVariables>(DeleteCardDocument, {
    onError: (error) => {
      appToast.error('Failed delete card', error.message);
    }
  });
}

export { useDeleteCardMutation };
