import type { BoardMember, CanvasMember, MemberRole } from '@src/common/api/graphql/__generated__';

import { Button } from '@src/common/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/common/ui/select';
import { LockIcon, TrashIcon } from 'lucide-react';

import { memberRoleLabels } from '../../_model/memberRoleLabels';

interface MemberActionsProps {
  member: BoardMember | CanvasMember;
  onChangeRole: (id: string, role: MemberRole) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

function MemberActions({ member, onChangeRole, onRemove }: MemberActionsProps) {
  const { id, role, isSelf, canChangeRole, canRemove, availableRoles } = member;

  const roleLabel = memberRoleLabels[role];
  const hasControls = canChangeRole || canRemove;

  if (isSelf) {
    return <span className='text-sm text-muted-foreground mr-2.5'>{roleLabel}</span>;
  }

  if (!hasControls) {
    return (
      <div className='flex items-center gap-7.5 text-muted-foreground mr-2.5'>
        <span className='text-sm'>{roleLabel}</span>
        <LockIcon className='h-4 w-4' />
      </div>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      {canChangeRole && (
        <Select value={role} onValueChange={(value) => onChangeRole(id, value as MemberRole)}>
          <SelectTrigger appearance='ghost' withoutIcon>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {availableRoles.map((role) => (
              <SelectItem key={role} value={role}>
                {memberRoleLabels[role]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {!canChangeRole && <span className='text-sm text-muted-foreground'>{roleLabel}</span>}

      {canRemove && (
        <Button
          className='group relative gap-0 overflow-hidden transition-all duration-200 px-2 hover:px-3'
          size='sm'
          variant='destructive'
          onClick={() => onRemove(id)}
        >
          <TrashIcon className='w-4 h-4 shrink-0' />
          <span className='max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-20 group-hover:opacity-100 group-hover:ml-2'>
            Remove
          </span>
        </Button>
      )}
    </div>
  );
}

export { MemberActions };
