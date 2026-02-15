import { ROUTES } from '@/common/constants/routes';

interface NavigationMenuItem {
  href: string;
  label: string;
}

const navigationMenuConfig: NavigationMenuItem[] = [
  { label: 'Boards', href: ROUTES.appBoards },
  { label: 'Canvas', href: ROUTES.appCanvas }
];

export { navigationMenuConfig };
