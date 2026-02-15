import { useState } from 'react';

import type { InviteEmailStatusType } from '../model/inviteEmailStatus';

import { InviteEmailStatus } from '../model/inviteEmailStatus';

export function useInviteState(initialInvited?: string[]) {
  const [addedInvites, setAddedInvites] = useState<string[]>([]);
  const [removedInvites, setRemovedInvites] = useState<string[]>([]);

  const getStatus = (email: string): InviteEmailStatusType => {
    if (removedInvites.includes(email)) return InviteEmailStatus.markedRorRemoval;
    if (addedInvites.includes(email)) return InviteEmailStatus.alreadyAdded;
    if (initialInvited?.includes(email)) return InviteEmailStatus.alreadtInvited;
    return InviteEmailStatus.available;
  };

  return {
    initialInvited: initialInvited ?? [],

    addedInvites,
    setAddedInvites,

    removedInvites,
    setRemovedInvites,

    getStatus
  };
}
