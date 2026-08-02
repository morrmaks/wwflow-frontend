import type {
  RevokeBoardInviteMutation,
  RevokeBoardInviteMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { RevokeBoardInviteDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { removeInviteFromBoardPermissionsCache } from '../../../_model/cache';

function useRevokeBoardInviteMutation() {
  return useMutation<RevokeBoardInviteMutation, RevokeBoardInviteMutationVariables>(
    RevokeBoardInviteDocument,
    {
      onCompleted: (data) => {
        const { resourceId, inviteId } = data.revokeBoardInvite;
        removeInviteFromBoardPermissionsCache(resourceId, inviteId);
        appToast.success('Invite revoked successfully');
      },
      onError: (error) => appToast.error('Error revoking invite', error.message)
    }
  );
}

export { useRevokeBoardInviteMutation };
