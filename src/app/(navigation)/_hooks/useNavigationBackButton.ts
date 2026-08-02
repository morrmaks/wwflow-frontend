'use client';

import { ROUTES } from '@src/common/constants/routes';
import { usePathname } from 'next/navigation';

function getNavigationBackHref(pathname: string) {
  if (/^\/app\/boards\/[^/]+$/.test(pathname)) return ROUTES.appBoards;
  if (/^\/app\/canvas\/[^/]+$/.test(pathname)) return ROUTES.appCanvas;

  return null;
}

function useNavigationBackButton() {
  const pathname = usePathname();

  return {
    href: getNavigationBackHref(pathname)
  };
}

export { useNavigationBackButton };
