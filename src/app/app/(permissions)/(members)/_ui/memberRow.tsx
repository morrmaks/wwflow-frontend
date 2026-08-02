import type { BoardMember, CanvasMember, MemberRole } from '@src/common/api/graphql/__generated__';

import { MemberActions } from './memberActions';
import { MemberInfo } from './memberInfo';

interface MemberRowProps {
  member: BoardMember | CanvasMember;
  myRole: MemberRole;
  onChangeRole: (memberId: string, role: MemberRole) => Promise<void>;
  onRemove: (memberId: string) => Promise<void>;
}

function MemberRow({ member, onChangeRole, onRemove }: MemberRowProps) {
  return (
    <div className='flex items-center justify-between py-2'>
      <MemberInfo member={member} />
      <MemberActions member={member} onChangeRole={onChangeRole} onRemove={onRemove} />
    </div>
  );
}

export { MemberRow };
