import type { UserFieldsFragment } from '@src/common/api/graphql/__generated__';

import { createStore } from '@siberiacancode/reactuse';
import { apolloClient } from '@src/common/api/apolloClient/client';

const AuthStatus = {
  auth: 'auth',
  guest: 'guest',
  loading: 'loading'
} as const;

type AuthStatusType = (typeof AuthStatus)[keyof typeof AuthStatus];

interface AuthState {
  status: AuthStatusType;
  user: UserFieldsFragment | null;
  setAuth: (user: UserFieldsFragment) => void;
  setGuest: () => void;
}

const authStore = createStore<AuthState>((set) => ({
  status: AuthStatus.loading,
  user: null,

  setAuth: (user) => {
    set({ status: AuthStatus.auth, user });
  },

  setGuest: () => {
    set({ status: AuthStatus.guest, user: null });
    setTimeout(() => apolloClient.cache.reset(), 200);
  }
}));

export { AuthStatus, type AuthStatusType, authStore };
