import type {
  DeleteCardMutation,
  DeleteCardMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { DeleteCardDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useDeleteCardMutation() {
  return useMutation<DeleteCardMutation, DeleteCardMutationVariables>(DeleteCardDocument, {
    onError: (error) => {
      appToast.error('Failed delete card', error.message);
    }
  });
}

export { useDeleteCardMutation };
