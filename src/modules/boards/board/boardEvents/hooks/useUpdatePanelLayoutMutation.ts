import { useMutation } from '@apollo/client/react';

import type {
  UpdatePanelLayoutMutation,
  UpdatePanelLayoutMutationVariables
} from '@/common/api/graphql/__generated__';

import { UpdatePanelLayoutDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useUpdatePanelLayoutMutation() {
  return useMutation<UpdatePanelLayoutMutation, UpdatePanelLayoutMutationVariables>(
    UpdatePanelLayoutDocument,
    {
      onError: (error) => {
        appToast.error('Failed to update panel layout', error.message);
      }
    }
  );
}

export { useUpdatePanelLayoutMutation };
