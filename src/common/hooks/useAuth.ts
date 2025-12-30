import { useContext } from 'react';

import { AuthContext, AuthStatus } from '../providers/authProvider';

function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error('useAuth must be used within AuthProvider');

  const { status, user } = ctx;

  return {
    status,
    user,
    isAuth: status === AuthStatus.auth,
    isGuest: status === AuthStatus.guest,
    isLoading: status === AuthStatus.loading
  };
}

export { useAuth };
