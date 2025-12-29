'use client';

import { createContext } from 'react';

import type { GetMeQuery } from '@/common/api/graphql/__generated__';

import { useGetMeQuery } from '@/modules/user';

type AuthStatus = 'auth' | 'guest' | 'loading';

interface AuthContextValue {
  status: AuthStatus;
  user: GetMeQuery['me'];
}

const initialValue: AuthContextValue = {
  status: 'loading',
  user: null
};

function resolveAuth(loading: boolean, error?: unknown, me?: GetMeQuery['me']): AuthContextValue {
  if (loading) return { status: 'loading', user: null };
  if (error || !me) return { status: 'guest', user: null };
  return { status: 'auth', user: me };
}

const AuthContext = createContext<AuthContextValue>(initialValue);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, loading, error } = useGetMeQuery();

  const value = resolveAuth(loading, error, data?.me);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
