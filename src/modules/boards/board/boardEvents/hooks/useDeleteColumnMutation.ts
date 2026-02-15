import { useMutation } from '@apollo/client/react';

import type {
  DeleteColumnMutation,
  DeleteColumnMutationVariables
} from '@/common/api/graphql/__generated__';

import { DeleteColumnDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useDeleteColumnMutation() {
  return useMutation<DeleteColumnMutation, DeleteColumnMutationVariables>(DeleteColumnDocument, {
    onError: (error) => {
      appToast.error('Failed delete column', error.message);
    }
  });
}

export { useDeleteColumnMutation };
