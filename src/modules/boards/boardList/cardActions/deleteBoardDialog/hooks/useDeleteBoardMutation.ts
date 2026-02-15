import { useMutation } from '@apollo/client/react';

import type {
  DeleteBoardMutation,
  DeleteBoardMutationVariables
} from '@/common/api/graphql/__generated__';

import { removeBoardFromCache } from '@/common/api/apolloClient/client';
import { DeleteBoardDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useDeleteBoardMutation() {
  return useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument, {
    onCompleted: (data) => {
      if (data?.deleteBoard?.id) removeBoardFromCache(data.deleteBoard.id);
      appToast.success('Board deleted successfully');
    },
    onError: (error) => appToast.error('Error deleting board', error.message)
  });
}

export { useDeleteBoardMutation };
