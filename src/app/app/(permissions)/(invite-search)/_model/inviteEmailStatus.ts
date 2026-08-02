const InviteEmailStatus = {
  alreadyMember: 'Already a member',
  alreadyInvited: 'Already invited'
};

type InviteEmailStatusType = (typeof InviteEmailStatus)[keyof typeof InviteEmailStatus];

export { InviteEmailStatus, type InviteEmailStatusType };
