import type { BoardMember, CanvasMember } from '@src/common/api/graphql/__generated__';

import { getInitials } from '@src/common/lib/string';
import { Avatar, AvatarFallback, AvatarImage } from '@src/common/ui/avatar';

interface MemberInfoProps {
  member: BoardMember | CanvasMember;
}

function MemberInfo({ member }: MemberInfoProps) {
  return (
    <div className='flex items-center gap-3'>
      <Avatar className='h-8 w-8'>
        <AvatarImage src={member.user.avatarUrl ?? undefined} />
        <AvatarFallback>{getInitials(member.user.name)}</AvatarFallback>
      </Avatar>

      <div className='flex flex-col'>
        <span className='text-sm font-medium'>
          {member.user.name}
          {member.isSelf && <span className='ml-2 text-xs text-muted-foreground'>(You)</span>}
        </span>

        <span className='text-xs text-muted-foreground'>{member.user.email}</span>
      </div>
    </div>
  );
}

export { MemberInfo };
