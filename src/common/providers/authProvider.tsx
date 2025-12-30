'use client';

import { createContext } from 'react';

import type { GetMeQuery } from '@/common/api/graphql/__generated__';

import { useGetMeQuery } from '@/modules/user';

const AuthStatus = {
  auth: 'auth',
  guest: 'guest',
  loading: 'loading'
} as const;

type AuthStatusType = (typeof AuthStatus)[keyof typeof AuthStatus];

interface AuthContextValue {
  status: AuthStatusType;
  user: GetMeQuery['me'];
}

const initialValue: AuthContextValue = {
  status: AuthStatus.loading,
  user: null
};

function resolveAuth(loading: boolean, error?: unknown, me?: GetMeQuery['me']): AuthContextValue {
  if (loading) return { status: AuthStatus.loading, user: null };
  if (error || !me) return { status: AuthStatus.guest, user: null };
  return { status: AuthStatus.auth, user: me };
}

const AuthContext = createContext<AuthContextValue>(initialValue);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, loading, error } = useGetMeQuery();

  const value = resolveAuth(loading, error, data?.me);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider, AuthStatus };
