import type { BoardMember, CanvasMember, MemberRole } from '@src/common/api/graphql/__generated__';

import { MemberRow } from './memberRow';

interface MembersListProps {
  members: BoardMember[] | CanvasMember[];
  myRole: MemberRole;
  onChangeRole: (memberId: string, role: MemberRole) => Promise<void>;
  onRemove: (memberId: string) => Promise<void>;
}

function MembersList({ myRole, members, onChangeRole, onRemove }: MembersListProps) {
  return (
    <div>
      {members.map((member) => (
        <MemberRow
          key={member.id}
          member={member}
          myRole={myRole}
          onChangeRole={onChangeRole}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export { MembersList };
