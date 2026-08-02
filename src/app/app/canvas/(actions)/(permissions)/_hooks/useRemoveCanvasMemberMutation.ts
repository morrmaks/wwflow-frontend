import type {
  RemoveCanvasMemberMutation,
  RemoveCanvasMemberMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { RemoveCanvasMemberDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import {
  removeCanvasFromCache,
  removeMemberFromCanvasPermissionsCache
} from '../../../_model/cache';

function useRemoveCanvasMemberMutation() {
  return useMutation<RemoveCanvasMemberMutation, RemoveCanvasMemberMutationVariables>(
    RemoveCanvasMemberDocument,
    {
      onCompleted: (data) => {
        const { resourceId, removedMemberId, removedWasSelf } = data?.removeCanvasMember;
        removedWasSelf
          ? removeCanvasFromCache(resourceId)
          : removeMemberFromCanvasPermissionsCache(resourceId, removedMemberId);

        appToast.success('Member removed successfully');
      },
      onError: (error) => appToast.error('Error removing member', error.message)
    }
  );
}

export { useRemoveCanvasMemberMutation };
