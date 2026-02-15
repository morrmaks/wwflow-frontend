import { useMutation } from '@apollo/client/react';

import type {
  CreateColumnMutation,
  CreateColumnMutationVariables
} from '@/common/api/graphql/__generated__';

import { CreateColumnDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useCreateColumnMutation() {
  return useMutation<CreateColumnMutation, CreateColumnMutationVariables>(CreateColumnDocument, {
    onError: (error) => {
      appToast.error('Failed create column', error.message);
    }
  });
}

export { useCreateColumnMutation };
