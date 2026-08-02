import type {
  CreateCardMutation,
  CreateCardMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { CreateCardDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useCreateCardMutation() {
  return useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, {
    onError: (error) => {
      appToast.error('Failed create card', error.message);
    }
  });
}

export { useCreateCardMutation };
