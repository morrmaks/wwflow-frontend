import { useMutation } from '@apollo/client/react';

import type {
  CreateBoardMutation,
  CreateBoardMutationVariables
} from '@/common/api/graphql/__generated__';

import { CreateBoardDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useCreateBoardMutation() {
  return useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, {
    onCompleted: () => {
      appToast.success('Board created successfully');
    },
    onError: (error) => {
      appToast.error('Failed to create board', error.message);
    }
  });
}

export { useCreateBoardMutation };
