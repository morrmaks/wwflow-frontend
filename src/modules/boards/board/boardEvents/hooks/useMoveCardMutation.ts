import { useMutation } from '@apollo/client/react';

import type {
  MoveCardMutation,
  MoveCardMutationVariables
} from '@/common/api/graphql/__generated__';

import { MoveCardDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useMoveCardMutation() {
  return useMutation<MoveCardMutation, MoveCardMutationVariables>(MoveCardDocument, {
    onError: (error) => {
      appToast.error('Failed move card', error.message);
    }
  });
}

export { useMoveCardMutation };
