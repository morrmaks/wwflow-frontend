import type {
  CreateBoardMutation,
  CreateBoardMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { CreateBoardDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { addBoardToCache } from '../../../_model/cache';

function useCreateBoardMutation() {
  return useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, {
    onCompleted: (data) => {
      addBoardToCache(data?.createBoard);
      appToast.success('Board created successfully');
    },
    onError: (error) => {
      appToast.error('Failed to create board', error.message);
    }
  });
}

export { useCreateBoardMutation };
