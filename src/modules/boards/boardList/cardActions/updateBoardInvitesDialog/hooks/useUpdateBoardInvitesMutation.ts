import { useMutation } from '@apollo/client/react';

import type {
  UpdateBoardInvitesMutation,
  UpdateBoardInvitesMutationVariables
} from '@/common/api/graphql/__generated__';

import { updateBoardInvitesInCache } from '@/common/api/apolloClient/client';
import { UpdateBoardInvitesDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useUpdateBoardInvitesMutation() {
  return useMutation<UpdateBoardInvitesMutation, UpdateBoardInvitesMutationVariables>(
    UpdateBoardInvitesDocument,
    {
      onCompleted: (data) => {
        updateBoardInvitesInCache(data?.updateBoardInvites);
        appToast.success('Users are invited successfully');
      },
      onError: (error) => appToast.error('Error user Invitation', error.message)
    }
  );
}

export { useUpdateBoardInvitesMutation };
