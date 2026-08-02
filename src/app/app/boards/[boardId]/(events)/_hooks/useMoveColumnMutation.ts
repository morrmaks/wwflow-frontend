import type {
  MoveColumnMutation,
  MoveColumnMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { MoveColumnDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useMoveColumnMutation() {
  return useMutation<MoveColumnMutation, MoveColumnMutationVariables>(MoveColumnDocument, {
    onError: (error) => {
      appToast.error('Failed move column', error.message);
    }
  });
}

export { useMoveColumnMutation };
