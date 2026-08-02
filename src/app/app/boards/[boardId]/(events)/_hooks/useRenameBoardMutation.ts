import type {
  RenameBoardMutation,
  RenameBoardMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { RenameBoardDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useRenameBoardMutation() {
  return useMutation<RenameBoardMutation, RenameBoardMutationVariables>(RenameBoardDocument, {
    onError: (error) => {
      appToast.error('Failed rename board', error.message);
    }
  });
}

export { useRenameBoardMutation };
