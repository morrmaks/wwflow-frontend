import type {
  MoveCardMutation,
  MoveCardMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { MoveCardDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useMoveCardMutation() {
  return useMutation<MoveCardMutation, MoveCardMutationVariables>(MoveCardDocument, {
    onError: (error) => {
      appToast.error('Failed move card', error.message);
    }
  });
}

export { useMoveCardMutation };
