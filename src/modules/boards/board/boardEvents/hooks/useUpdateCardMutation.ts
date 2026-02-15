import { useMutation } from '@apollo/client/react';

import type {
  UpdateCardMutation,
  UpdateCardMutationVariables
} from '@/common/api/graphql/__generated__';

import { UpdateCardDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useUpdateCardMutation() {
  return useMutation<UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument, {
    onError: (error) => {
      appToast.error('Failed to update card', error.message);
    }
  });
}

export { useUpdateCardMutation };
