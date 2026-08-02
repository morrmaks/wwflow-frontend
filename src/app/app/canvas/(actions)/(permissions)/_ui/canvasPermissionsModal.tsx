import type { CanvasListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { InviteSearchInput, InvitesList, MembersList } from '@src/app/app/(permissions)';
import { Button } from '@src/common/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogSeparator,
  DialogTitle,
  DialogTrigger
} from '@src/common/ui/dialog';
import { UserIcon } from 'lucide-react';

import { useCanvasPermissionsModal } from '../_hooks/useCanvasPermissionsModal';

interface CanvasPermissionsModalProps {
  canvas: CanvasListFieldsFragment;
}

function CanvasPermissionsModal({ canvas }: CanvasPermissionsModalProps) {
  const { members, invites, onChangeRole, onRemoveMember, onInvite, onRevokeInvite } =
    useCanvasPermissionsModal(canvas);

  if (!canvas.canManagePermissions) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-sm gap-2 p-0 justify-start w-full' size='sm' variant='ghost'>
          <UserIcon className='text-muted-foreground' />
          Permissions
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Canvas permissions</DialogTitle>
        </DialogHeader>
        <DialogSeparator className='mt-2' />
        <div>
          <h3 className='text-base mb-3 mt-4'>Invites</h3>
          <InvitesList invites={invites} onRevoke={onRevokeInvite} />
          <InviteSearchInput invites={invites} members={members} onInvite={onInvite} />
        </div>
        <div className='mt-6'>
          <h3 className='text-base mb-2'>Members</h3>
          <MembersList
            members={members}
            myRole={canvas.myRole}
            onChangeRole={onChangeRole}
            onRemove={onRemoveMember}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { CanvasPermissionsModal };
