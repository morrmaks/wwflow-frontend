import { useMutation } from '@apollo/client/react';

import type {
  MoveColumnMutation,
  MoveColumnMutationVariables
} from '@/common/api/graphql/__generated__';

import { MoveColumnDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useMoveColumnMutation() {
  return useMutation<MoveColumnMutation, MoveColumnMutationVariables>(MoveColumnDocument, {
    onError: (error) => {
      appToast.error('Failed move column', error.message);
    }
  });
}

export { useMoveColumnMutation };
