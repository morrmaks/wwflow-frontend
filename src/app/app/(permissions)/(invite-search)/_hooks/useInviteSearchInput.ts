'use client';

import type { BoardMember, CanvasMember, Invite } from '@src/common/api/graphql/__generated__';

import { useDebounceCallback } from '@siberiacancode/reactuse';
import { MemberRole } from '@src/common/api/graphql/__generated__';
import { useState } from 'react';

import { getInviteEmailStatus } from '../_model/getInviteEmailStatus';
import { useSearchUserEmailsQuery } from './useSearchUserEmailsQuery';

interface UseInviteSearchInputProps {
  invites: Invite[];
  members: BoardMember[] | CanvasMember[];
  onInvite: (email: string, role: MemberRole) => Promise<void>;
}

function useInviteSearchInput({ onInvite, invites, members }: UseInviteSearchInputProps) {
  const [role, _setRole] = useState<MemberRole>(MemberRole.Member); // Role selection is not exposed yet.
  const [query, setQuery] = useState('');

  const { search, emails, loading } = useSearchUserEmailsQuery();
  const searchDebounced = useDebounceCallback(search, 500);

  const processedEmails = emails.map((email) => {
    const status = getInviteEmailStatus(email, invites, members);
    return {
      email,
      status,
      disabled: Boolean(status)
    };
  });

  const onQueryChange = (value: string) => {
    setQuery(value);
    searchDebounced({ variables: { query: value } });
  };

  const handleInvite = async (email: string) => {
    await onInvite(email, role);
    setQuery('');
  };

  return {
    onQueryChange,
    handleInvite,
    emails: processedEmails,
    loading,
    query
  };
}

export { useInviteSearchInput };
