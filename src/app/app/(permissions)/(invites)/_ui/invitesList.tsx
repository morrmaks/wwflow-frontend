import type { Invite } from '@src/common/api/graphql/__generated__';

import { Button } from '@src/common/ui/button';
import { Undo2 } from 'lucide-react';

function InvitesList({
  invites,
  onRevoke
}: {
  invites: Invite[];
  onRevoke: (id: string) => Promise<void>;
}) {
  if (!invites.length) return null;

  return (
    <div className='space-y-2 mt-6'>
      <p className='text-sm font-medium'>Pending invites</p>
      {invites.map((invite) => (
        <div
          key={invite.id}
          className='flex items-center justify-between border rounded-lg px-3 py-2'
        >
          <span className='text-sm'>{invite.email}</span>

          <Button
            className='group relative overflow-hidden transition-all duration-200 px-2 hover:px-3'
            size='sm'
            variant='destructive'
            onClick={() => onRevoke(invite.id)}
          >
            <Undo2 className='w-4 h-4 shrink-0' />
            <span className='ml-1 max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-20 group-hover:opacity-100'>
              Revoke
            </span>
          </Button>
        </div>
      ))}
    </div>
  );
}

export { InvitesList };
