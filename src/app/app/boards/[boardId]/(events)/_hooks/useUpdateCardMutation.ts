import type {
  UpdateCardMutation,
  UpdateCardMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { UpdateCardDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useUpdateCardMutation() {
  return useMutation<UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument, {
    onError: (error) => {
      appToast.error('Failed to update card', error.message);
    }
  });
}

export { useUpdateCardMutation };
