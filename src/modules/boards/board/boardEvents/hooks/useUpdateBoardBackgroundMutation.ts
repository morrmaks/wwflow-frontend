import { useMutation } from '@apollo/client/react';

import type {
  UpdateBoardBackgroundMutation,
  UpdateBoardBackgroundMutationVariables
} from '@/common/api/graphql/__generated__';

import { UpdateBoardBackgroundDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useUpdateBoardBackgroundMutation() {
  return useMutation<UpdateBoardBackgroundMutation, UpdateBoardBackgroundMutationVariables>(
    UpdateBoardBackgroundDocument,
    {
      onError: (error) => {
        appToast.error('Failed to update board background', error.message);
      }
    }
  );
}

export { useUpdateBoardBackgroundMutation };
