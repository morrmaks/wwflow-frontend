import { useContext } from 'react';

import { AuthContext } from '../providers/authProvider';

function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error('useAuth must be used within AuthProvider');

  const { status, user } = ctx;

  return {
    status,
    user,
    isAuth: status === 'auth',
    isGuest: status === 'guest',
    isLoading: status === 'loading'
  };
}

export { useAuth };
