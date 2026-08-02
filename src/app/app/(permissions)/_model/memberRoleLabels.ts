import { MemberRole } from '@src/common/api/graphql/__generated__';

const memberRoleLabels: Record<MemberRole, string> = {
  [MemberRole.Owner]: 'Owner',
  [MemberRole.Admin]: 'Administrator',
  [MemberRole.Member]: 'Member'
};

export { memberRoleLabels };
