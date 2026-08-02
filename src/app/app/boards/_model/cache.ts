import type {
  BoardListFieldsFragment,
  BoardMember,
  Invite,
  UpdateBoardPayload
} from '@src/common/api/graphql/__generated__';

import { apolloClient } from '@src/common/api/apolloClient/client';
import {
  BoardListFieldsFragmentDoc,
  InviteFieldsFragmentDoc,
  MemberRole
} from '@src/common/api/graphql/__generated__';

function addBoardToCache(newBoard: BoardListFieldsFragment) {
  apolloClient.cache.modify<{ boardList: BoardListFieldsFragment[] }>({
    fields: {
      boardList(existingRefs = [], { readField }) {
        const newRef = apolloClient.cache.writeFragment({
          data: newBoard,
          fragment: BoardListFieldsFragmentDoc
        });

        if (existingRefs.some((ref) => readField('id', ref) === newBoard.id)) {
          return existingRefs;
        }

        return [newRef, ...existingRefs];
      }
    }
  });
}

function removeBoardFromCache(boardId: string) {
  apolloClient.cache.modify<{ boardList: BoardListFieldsFragment[] }>({
    fields: {
      boardList(existingRefs = [], { readField }) {
        return existingRefs.filter((ref) => readField('id', ref) !== boardId);
      }
    }
  });

  apolloClient.cache.evict({
    id: apolloClient.cache.identify({
      __typename: 'BoardListItem',
      id: boardId
    })
  });

  apolloClient.cache.gc();
}

function updateBoardInCache(payload: UpdateBoardPayload) {
  if (!payload) return;

  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'BoardListItem',
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

function updateBoardPermissionsMyRole(boardId: string, newRole: MemberRole) {
  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'BoardPermissionsItem',
      id: boardId
    }),
    fields: {
      myRole() {
        return newRole;
      }
    }
  });
}

function updateBoardListRole(boardId: string, newRole: MemberRole) {
  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'BoardListItem',
      id: boardId
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

function updateChangeMemberRoleCache(boardId: string, updatedMember: BoardMember) {
  if (updatedMember.isSelf) {
    updateBoardPermissionsMyRole(boardId, updatedMember.role);
    updateBoardListRole(boardId, updatedMember.role);
  }
}

function removeMemberFromBoardPermissionsCache(boardId: string, removedMemberId: string) {
  apolloClient.cache.modify<{ members: BoardMember[] }>({
    id: apolloClient.cache.identify({
      __typename: 'BoardPermissionsItem',
      id: boardId
    }),
    fields: {
      members(existingMembers = [], { readField }) {
        return existingMembers.filter((ref) => readField('id', ref) !== removedMemberId);
      }
    }
  });

  decrementBoardMembersCount(boardId);
}

function decrementBoardMembersCount(boardId: string) {
  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'BoardListItem',
      id: boardId
    }),
    fields: {
      membersCount(existing: number = 0) {
        return Math.max(0, existing - 1);
      }
    }
  });
}

function addInviteToBoardPermissionsCache(boardId: string, invite: Invite) {
  apolloClient.cache.modify<{ invites: Invite[] }>({
    id: apolloClient.cache.identify({
      __typename: 'BoardPermissionsItem',
      id: boardId
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

function removeInviteFromBoardPermissionsCache(boardId: string, inviteId: string) {
  apolloClient.cache.modify<{ invites: Invite[] }>({
    id: apolloClient.cache.identify({
      __typename: 'BoardPermissionsItem',
      id: boardId
    }),
    fields: {
      invites(existingInvites = [], { readField }) {
        return existingInvites.filter((ref) => readField('id', ref) !== inviteId);
      }
    }
  });
}

export {
  addBoardToCache,
  addInviteToBoardPermissionsCache,
  removeBoardFromCache,
  removeInviteFromBoardPermissionsCache,
  removeMemberFromBoardPermissionsCache,
  updateBoardInCache,
  updateBoardListRole,
  updateBoardPermissionsMyRole,
  updateChangeMemberRoleCache
};
