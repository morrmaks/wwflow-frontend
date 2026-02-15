import { useMutation } from '@apollo/client/react';

import type {
  RenameColumnMutation,
  RenameColumnMutationVariables
} from '@/common/api/graphql/__generated__';

import { RenameColumnDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useRenameColumnMutation() {
  return useMutation<RenameColumnMutation, RenameColumnMutationVariables>(RenameColumnDocument, {
    onError: (error) => {
      appToast.error('Failed rename column', error.message);
    }
  });
}

export { useRenameColumnMutation };
