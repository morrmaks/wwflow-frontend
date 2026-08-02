import type {
  DeleteColumnMutation,
  DeleteColumnMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { DeleteColumnDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useDeleteColumnMutation() {
  return useMutation<DeleteColumnMutation, DeleteColumnMutationVariables>(DeleteColumnDocument, {
    onError: (error) => {
      appToast.error('Failed delete column', error.message);
    }
  });
}

export { useDeleteColumnMutation };
