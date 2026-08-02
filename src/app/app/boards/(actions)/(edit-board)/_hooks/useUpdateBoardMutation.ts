import type {
  UpdateBoardMutation,
  UpdateBoardMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { UpdateBoardDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { updateBoardInCache } from '../../../_model/cache';

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
