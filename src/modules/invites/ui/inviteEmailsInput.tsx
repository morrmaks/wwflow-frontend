import { InfoIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/common/lib/utils';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/common/ui/command';
import { Label } from '@/common/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/common/ui/tooltip';

import type { InviteEmailStatusType } from '../model/inviteEmailStatus';

import { InviteEmailStatus } from '../model/inviteEmailStatus';

interface InviteEmailsInputProps {
  invites: string[];
  label?: string;
  getStatus: (email: string) => InviteEmailStatusType;
  setInvites: (invites: string[]) => void;
}

const emails = [
  'alex.ivanov@gmail.com',
  'maria.peterson@yahoo.com',
  'john_smith@outlook.com',
  'kate.miller@proton.me',
  'dev.maxim@company.io',
  'support@myapp.dev',
  'nikita.volkov@mail.ru',
  'anna.kim@icloud.com',
  'frontend.lead@startup.ai',
  'pavel1995@gmail.com',
  'team@collab.tools',
  'user-test_01@demo.app',
  'design.ops@figma.team',
  'qa.engineer@testing.dev',
  'hello@personal.site'
];

function InviteEmailsInput({
  label = 'Invite users',
  invites,
  setInvites,
  getStatus
}: InviteEmailsInputProps) {
  const [query, setQuery] = useState('');

  // const { search, emails } = useSearchUserEmailsQuery();
  // const searchDebounced = useDebounceCallback(search, 500);

  const onQueryChange = (value: string) => {
    setQuery(value);
    // searchDebounced({ variables: { query: value } });
  };

  const addInvite = (email: string) => {
    setInvites([...invites, email]);
    setQuery('');
  };

  const onSelect = (disabled: boolean, email: string) => {
    if (disabled) return;
    addInvite(email);
  };

  return (
    <div className='space-y-2'>
      <Label htmlFor='invite-email'>{label}</Label>
      <Command className='h-max'>
        <CommandInput
          id='invite-email'
          value={query}
          onValueChange={onQueryChange}
          placeholder='Type email'
        />
        <CommandList>
          {query && emails.length === 0 && <CommandEmpty>No results</CommandEmpty>}
          {query &&
            emails.map((email) => {
              const status = getStatus?.(email) ?? InviteEmailStatus.available;
              const disabled = status !== InviteEmailStatus.available;

              return (
                <CommandItem
                  key={email}
                  className={cn(disabled && 'opacity-50')}
                  value={email}
                  onSelect={() => onSelect(disabled, email)}
                >
                  {email}
                  {disabled && (
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className='h-3 w-3' />
                      </TooltipTrigger>
                      <TooltipContent>
                        {status === InviteEmailStatus.alreadtInvited && 'Already invited'}
                        {status === InviteEmailStatus.markedRorRemoval && 'Already invited'}
                        {status === InviteEmailStatus.alreadyAdded && 'Already added'}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </CommandItem>
              );
            })}
        </CommandList>
      </Command>
    </div>
  );
}

export { InviteEmailsInput };
