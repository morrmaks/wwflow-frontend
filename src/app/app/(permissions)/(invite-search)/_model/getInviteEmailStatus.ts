import type {
  BoardMember,
  CanvasMember,
  Invite
} from '@src/common/api/graphql/__generated__';

import { InviteEmailStatus } from './inviteEmailStatus';

function getInviteEmailStatus(
  email: string,
  invites: Invite[],
  members: BoardMember[] | CanvasMember[]
) {
  const isMember = members.some((m) => m.user.email.toLowerCase() === email.toLowerCase());

  if (isMember) return InviteEmailStatus.alreadyMember;

  const isInvited = invites.some((i) => i.email.toLowerCase() === email.toLowerCase());

  if (isInvited) return InviteEmailStatus.alreadyInvited;

  return null;
}

export { getInviteEmailStatus };
