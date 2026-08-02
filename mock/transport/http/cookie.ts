import type { ResponseInterceptorParams } from 'mock-config-server';

import { COOKIE_TOKEN_KEYS } from '@src/common/constants/storage';

const setAuthCookies = (params: ResponseInterceptorParams): void => {
  const { request, setCookie } = params;

  const accessToken = request.tokens?.accessToken;
  const refreshToken = request.tokens?.refreshToken;

  if (!accessToken || !refreshToken) return;

  setCookie(COOKIE_TOKEN_KEYS.accessToken, accessToken, {
    maxAge: 1000 * 60 * 15,
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });

  setCookie(COOKIE_TOKEN_KEYS.refreshToken, refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });
};

const clearAuthCookies = (params: ResponseInterceptorParams): void => {
  const { clearCookie } = params;

  clearCookie(COOKIE_TOKEN_KEYS.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });

  clearCookie(COOKIE_TOKEN_KEYS.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });
};

export { clearAuthCookies, setAuthCookies };
