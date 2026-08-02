import type {
  RevokeCanvasInviteMutation,
  RevokeCanvasInviteMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { RevokeCanvasInviteDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { removeInviteFromCanvasPermissionsCache } from '../../../_model/cache';

function useRevokeCanvasInviteMutation() {
  return useMutation<RevokeCanvasInviteMutation, RevokeCanvasInviteMutationVariables>(
    RevokeCanvasInviteDocument,
    {
      onCompleted: (data) => {
        const { resourceId, inviteId } = data.revokeCanvasInvite;
        removeInviteFromCanvasPermissionsCache(resourceId, inviteId);
        appToast.success('Invite revoked successfully');
      },
      onError: (error) => appToast.error('Error revoking invite', error.message)
    }
  );
}

export { useRevokeCanvasInviteMutation };
