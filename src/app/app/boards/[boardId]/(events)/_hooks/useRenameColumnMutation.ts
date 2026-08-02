import type {
  RenameColumnMutation,
  RenameColumnMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { RenameColumnDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useRenameColumnMutation() {
  return useMutation<RenameColumnMutation, RenameColumnMutationVariables>(RenameColumnDocument, {
    onError: (error) => {
      appToast.error('Failed rename column', error.message);
    }
  });
}

export { useRenameColumnMutation };
