import { useMutation } from '@apollo/client/react';

import type {
  UpdateCanvasInvitesMutation,
  UpdateCanvasInvitesMutationVariables
} from '@/common/api/graphql/__generated__';

import { updateCanvasInvitesInCache } from '@/common/api/apolloClient/client';
import { UpdateCanvasInvitesDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useUpdateCanvasInvitesMutation() {
  return useMutation<UpdateCanvasInvitesMutation, UpdateCanvasInvitesMutationVariables>(
    UpdateCanvasInvitesDocument,
    {
      onCompleted: (data) => {
        updateCanvasInvitesInCache(data?.updateCanvasInvites);
        appToast.success('Users are invited successfully');
      },
      onError: (error) => appToast.error('Error user Invitation', error.message)
    }
  );
}

export { useUpdateCanvasInvitesMutation };
