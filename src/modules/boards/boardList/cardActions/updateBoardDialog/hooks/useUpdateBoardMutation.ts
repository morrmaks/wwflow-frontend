import { useMutation } from '@apollo/client/react';

import type {
  UpdateBoardMutation,
  UpdateBoardMutationVariables
} from '@/common/api/graphql/__generated__';

import { updateBoardInCache } from '@/common/api/apolloClient/client';
import { UpdateBoardDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useUpdateBoardMutation() {
  return useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument, {
    onCompleted: (data) => {
      updateBoardInCache(data?.updateBoard);
      appToast.success('Board updated successfully');
    },
    onError: (error) => appToast.error('Error updating board', error.message)
  });
}

export { useUpdateBoardMutation };
