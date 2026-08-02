import type {
  CanvasListFieldsFragment,
  CanvasMember,
  Invite,
  UpdateCanvasPayload
} from '@src/common/api/graphql/__generated__';

import { apolloClient } from '@src/common/api/apolloClient/client';
import {
  CanvasListFieldsFragmentDoc,
  InviteFieldsFragmentDoc,
  MemberRole
} from '@src/common/api/graphql/__generated__';

function addCanvasToCache(newCanvas: CanvasListFieldsFragment) {
  apolloClient.cache.modify<{ canvasList: CanvasListFieldsFragment[] }>({
    fields: {
      canvasList(existingRefs = [], { readField }) {
        const newRef = apolloClient.cache.writeFragment({
          data: newCanvas,
          fragment: CanvasListFieldsFragmentDoc
        });

        if (existingRefs.some((ref: any) => readField('id', ref) === newCanvas.id)) {
          return existingRefs;
        }

        return [newRef, ...existingRefs];
      }
    }
  });
}

function removeCanvasFromCache(canvasId: string) {
  apolloClient.cache.modify<{ canvasList: CanvasListFieldsFragment[] }>({
    fields: {
      canvasList(existingRefs = [], { readField }) {
        return existingRefs.filter((ref) => readField('id', ref) !== canvasId);
      }
    }
  });

  apolloClient.cache.evict({
    id: apolloClient.cache.identify({
      __typename: 'CanvasListItem',
      id: canvasId
    })
  });

  apolloClient.cache.gc();
}

function updateCanvasInCache(payload: UpdateCanvasPayload) {
  if (!payload) return;

  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'CanvasListItem',
      id: payload.id
    }),
    fields: {
      title: () => payload.title,
      previewUrl(existing) {
        if (payload.previewUrl === undefined) return existing;
        return payload.previewUrl;
      }
    }
  });
}

function updateCanvasPermissionsMyRole(canvasId: string, newRole: MemberRole) {
  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'CanvasPermissionsItem',
      id: canvasId
    }),
    fields: {
      myRole() {
        return newRole;
      }
    }
  });
}

function updateCanvasListRole(canvasId: string, newRole: MemberRole) {
  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'CanvasListItem',
      id: canvasId
    }),
    fields: {
      myRole() {
        return newRole;
      },
      canEdit() {
        return newRole === MemberRole.Owner || newRole === MemberRole.Admin;
      },
      canDelete() {
        return newRole === MemberRole.Owner;
      },
      canManagePermissions() {
        return newRole === MemberRole.Owner || newRole === MemberRole.Admin;
      }
    }
  });
}

function updateChangeMemberRoleCache(canvasId: string, updatedMember: CanvasMember) {
  if (updatedMember.isSelf) {
    updateCanvasPermissionsMyRole(canvasId, updatedMember.role);
    updateCanvasListRole(canvasId, updatedMember.role);
  }
}

function removeMemberFromCanvasPermissionsCache(canvasId: string, removedMemberId: string) {
  apolloClient.cache.modify<{ members: CanvasMember[] }>({
    id: apolloClient.cache.identify({
      __typename: 'CanvasPermissionsItem',
      id: canvasId
    }),
    fields: {
      members(existingMembers = [], { readField }) {
        return existingMembers.filter((ref) => readField('id', ref) !== removedMemberId);
      }
    }
  });

  decrementCanvasMembersCount(canvasId);
}

function decrementCanvasMembersCount(canvasId: string) {
  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'CanvasListItem',
      id: canvasId
    }),
    fields: {
      membersCount(existing: number = 0) {
        return Math.max(0, existing - 1);
      }
    }
  });
}

function addInviteToCanvasPermissionsCache(canvasId: string, invite: Invite) {
  apolloClient.cache.modify<{ invites: Invite[] }>({
    id: apolloClient.cache.identify({
      __typename: 'CanvasPermissionsItem',
      id: canvasId
    }),
    fields: {
      invites(existing = []) {
        const newRef = apolloClient.cache.writeFragment({
          data: invite,
          fragment: InviteFieldsFragmentDoc
        });

        return [newRef, ...existing];
      }
    }
  });
}

function removeInviteFromCanvasPermissionsCache(canvasId: string, inviteId: string) {
  apolloClient.cache.modify<{ invites: Invite[] }>({
    id: apolloClient.cache.identify({
      __typename: 'CanvasPermissionsItem',
      id: canvasId
    }),
    fields: {
      invites(existingInvites = [], { readField }) {
        return existingInvites.filter((ref) => readField('id', ref) !== inviteId);
      }
    }
  });
}

export {
  addCanvasToCache,
  addInviteToCanvasPermissionsCache,
  removeCanvasFromCache,
  removeInviteFromCanvasPermissionsCache,
  removeMemberFromCanvasPermissionsCache,
  updateCanvasInCache,
  updateCanvasListRole,
  updateCanvasPermissionsMyRole,
  updateChangeMemberRoleCache
};
