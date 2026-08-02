import type {
  UpdateBoardBackgroundMutation,
  UpdateBoardBackgroundMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { UpdateBoardBackgroundDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

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
