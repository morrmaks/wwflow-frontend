import { Plus, X } from 'lucide-react';

import { cn } from '@/common/lib/utils';
import { Badge } from '@/common/ui/badge';

import type { InviteEmailStatusType } from '../model/inviteEmailStatus';

import { InviteEmailStatus } from '../model/inviteEmailStatus';

interface InviteExistingEmailsProps {
  emails: string[];
  setRemoveInvites: React.Dispatch<React.SetStateAction<string[]>>;
  getStatus: (email: string) => InviteEmailStatusType;
}

function InviteExistingEmails({ emails, getStatus, setRemoveInvites }: InviteExistingEmailsProps) {
  const sortedEmails = [...emails].sort((a, b) => {
    const aMarked = getStatus(a) === InviteEmailStatus.markedRorRemoval;
    const bMarked = getStatus(b) === InviteEmailStatus.markedRorRemoval;

    if (aMarked === bMarked) return 0;
    return aMarked ? 1 : -1;
  });

  const onMarkForRemoval = (email: string) =>
    setRemoveInvites((prev) => (prev.includes(email) ? prev : [...prev, email]));

  const onUndoRemoval = (email: string) =>
    setRemoveInvites((prev) => prev.filter((e) => e !== email));

  return (
    <div className='space-y-2 mb-4'>
      <p className='text-sm font-medium'>Invited users</p>
      {emails.length === 0 ? (
        <p className='text-xs text-muted-foreground'>No invited users yet</p>
      ) : (
        <>
          <p className='text-xs text-muted-foreground'>Click × to mark for removal</p>
          <div className='flex flex-wrap gap-2 pt-2 mb-4'>
            {sortedEmails.map((email) => {
              const status = getStatus(email);
              const marked = status === InviteEmailStatus.markedRorRemoval;

              return (
                <Badge
                  key={email}
                  className={cn(
                    'flex items-center gap-1 transition',
                    marked && 'opacity-50 line-through'
                  )}
                  variant='secondary'
                >
                  <span className='truncate max-w-[180px]'>{email}</span>

                  {marked ? (
                    <button type='button' onClick={() => onUndoRemoval(email)}>
                      <Plus className='h-3 w-3' />
                    </button>
                  ) : (
                    <button type='button' onClick={() => onMarkForRemoval(email)}>
                      <X className='h-3 w-3' />
                    </button>
                  )}
                </Badge>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export { InviteExistingEmails };
