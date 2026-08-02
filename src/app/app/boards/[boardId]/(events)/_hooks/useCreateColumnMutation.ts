import type {
  CreateColumnMutation,
  CreateColumnMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { CreateColumnDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useCreateColumnMutation() {
  return useMutation<CreateColumnMutation, CreateColumnMutationVariables>(CreateColumnDocument, {
    onError: (error) => {
      appToast.error('Failed create column', error.message);
    }
  });
}

export { useCreateColumnMutation };
