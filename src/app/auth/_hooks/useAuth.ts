import { authStore } from '../_model/store';

function useAuth() {
  const status = authStore.use((s) => s.status);
  const user = authStore.use((s) => s.user);

  return {
    status,
    user,
    isAuth: status === 'auth',
    isGuest: status === 'guest',
    isLoading: status === 'loading'
  };
}

export { useAuth };
