import type {
  UpdateInboxBackgroundMutation,
  UpdateInboxBackgroundMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { UpdateInboxBackgroundDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useUpdateInboxBackgroundMutation() {
  return useMutation<UpdateInboxBackgroundMutation, UpdateInboxBackgroundMutationVariables>(
    UpdateInboxBackgroundDocument,
    {
      onError: (error) => {
        appToast.error('Failed to update inbox background', error.message);
      }
    }
  );
}

export { useUpdateInboxBackgroundMutation };
