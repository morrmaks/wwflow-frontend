import type {
  BoardMember,
  CanvasMember,
  Invite,
  MemberRole
} from '@src/common/api/graphql/__generated__';

import { cn } from '@src/common/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from '@src/common/ui/command';
import { Tooltip, TooltipContent, TooltipTrigger } from '@src/common/ui/tooltip';
import { InfoIcon } from 'lucide-react';

import { useInviteSearchInput } from '../_hooks/useInviteSearchInput';

interface InviteSearchInputProps {
  invites: Invite[];
  members: BoardMember[] | CanvasMember[];
  onInvite: (email: string, role: MemberRole) => Promise<void>;
}

function InviteSearchInput({ onInvite, invites, members }: InviteSearchInputProps) {
  const { query, emails, loading, onQueryChange, handleInvite } = useInviteSearchInput({
    onInvite,
    invites,
    members
  });

  return (
    <div className='mt-2 space-y-2'>
      <Command className='h-max'>
        <CommandInput
          id='invite-user'
          value={query}
          onValueChange={onQueryChange}
          placeholder='Invite user'
        />
        <div
          className={cn(
            'overflow-hidden transition-all duration-200',
            query ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <CommandList>
            {!loading && query && emails.length === 0 && <CommandEmpty>No results</CommandEmpty>}
            {!loading &&
              query &&
              emails.map(({ email, status, disabled }) => (
                <CommandItem
                  key={email}
                  className={cn(disabled && 'opacity-50')}
                  disabled={disabled}
                  value={email}
                  onSelect={() => !disabled && handleInvite(email)}
                >
                  {email}
                  {status && (
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className='ml-2 h-3 w-3' />
                      </TooltipTrigger>
                      <TooltipContent>{status}</TooltipContent>
                    </Tooltip>
                  )}
                </CommandItem>
              ))}
          </CommandList>
        </div>
      </Command>
    </div>
  );
}

export { InviteSearchInput };
