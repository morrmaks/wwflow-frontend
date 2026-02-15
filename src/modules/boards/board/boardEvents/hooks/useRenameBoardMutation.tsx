import { useMutation } from '@apollo/client/react';

import type {
  RenameBoardMutation,
  RenameBoardMutationVariables
} from '@/common/api/graphql/__generated__';

import { RenameBoardDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useRenameBoardMutation() {
  return useMutation<RenameBoardMutation, RenameBoardMutationVariables>(RenameBoardDocument, {
    onError: (error) => {
      appToast.error('Failed rename board', error.message);
    }
  });
}

export { useRenameBoardMutation };
