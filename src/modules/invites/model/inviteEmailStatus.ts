const InviteEmailStatus = {
  markedRorRemoval: 'marked-for-removal',
  alreadyAdded: 'already-added',
  alreadtInvited: 'already-invited',
  available: 'available'
};

type InviteEmailStatusType = (typeof InviteEmailStatus)[keyof typeof InviteEmailStatus];

export { InviteEmailStatus, type InviteEmailStatusType };
