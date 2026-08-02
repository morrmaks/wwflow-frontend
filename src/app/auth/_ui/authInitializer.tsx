'use client';

import { useGetMeQuery } from '../(user)';

export function AuthInitializer() {
  useGetMeQuery();
  return null;
}
