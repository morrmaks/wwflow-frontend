import type {
  RemoveBoardMemberMutation,
  RemoveBoardMemberMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { RemoveBoardMemberDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { removeBoardFromCache, removeMemberFromBoardPermissionsCache } from '../../../_model/cache';

function useRemoveBoardMemberMutation() {
  return useMutation<RemoveBoardMemberMutation, RemoveBoardMemberMutationVariables>(
    RemoveBoardMemberDocument,
    {
      onCompleted: (data) => {
        const { resourceId, removedMemberId, removedWasSelf } = data?.removeBoardMember;
        removedWasSelf
          ? removeBoardFromCache(resourceId)
          : removeMemberFromBoardPermissionsCache(resourceId, removedMemberId);

        appToast.success('Member removed successfully');
      },
      onError: (error) => appToast.error('Error removing member', error.message)
    }
  );
}

export { useRemoveBoardMemberMutation };
