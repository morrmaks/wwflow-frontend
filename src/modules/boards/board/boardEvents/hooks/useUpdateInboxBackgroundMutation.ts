import { useMutation } from '@apollo/client/react';

import type {
  UpdateInboxBackgroundMutation,
  UpdateInboxBackgroundMutationVariables
} from '@/common/api/graphql/__generated__';

import { UpdateInboxBackgroundDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

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
