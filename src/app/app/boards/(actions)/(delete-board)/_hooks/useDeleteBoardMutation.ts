import type {
  DeleteBoardMutation,
  DeleteBoardMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { DeleteBoardDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { removeBoardFromCache } from '../../../_model/cache';

function useDeleteBoardMutation() {
  return useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument, {
    onCompleted: (data) => {
      removeBoardFromCache(data?.deleteBoard?.id);
      appToast.success('Board deleted successfully');
    },
    onError: (error) => appToast.error('Error deleting board', error.message)
  });
}

export { useDeleteBoardMutation };
