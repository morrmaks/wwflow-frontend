import { X } from 'lucide-react';

import { Badge } from '@/common/ui/badge';

interface InviteEmailsListProps {
  emails: string[];
  setInvites: React.Dispatch<React.SetStateAction<string[]>>;
}

function InviteEmailsList({ emails, setInvites }: InviteEmailsListProps) {
  if (emails.length === 0) return null;

  const handleRemove = (email: string) => {
    setInvites((prev) => prev.filter((e) => e !== email));
  };

  return (
    <div className='flex flex-wrap gap-2 pt-2'>
      {emails.map((email) => (
        <Badge key={email} className='flex items-center gap-1' variant='secondary'>
          <span className='truncate max-w-45'>{email}</span>
          <button className='ml-1' type='button' onClick={() => handleRemove(email)}>
            <X className='h-3 w-3' />
          </button>
        </Badge>
      ))}
    </div>
  );
}

export { InviteEmailsList };
