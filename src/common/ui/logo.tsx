import Link from 'next/link';

import { ROUTES } from '@src/common/constants/routes';
import { cn } from '@src/common/lib/utils';

export function Logo() {
  return (
    <Link
      href={ROUTES.main}
      className={cn(
        'pointer-events-auto relative inline-flex h-10 items-center overflow-hidden rounded-lg border-[3px] border-transparent px-3 font-logo text-lg font-black text-secondary-foreground dark:border-brutal-outline dark:bg-[radial-gradient(circle_at_28%_24%,#f4f1e8_0%,#c9c4b7_33%,#89877f_68%,#5f5e58_100%)]',
        "dark:before:absolute dark:before:inset-0 dark:before:bg-[radial-gradient(circle_at_22%_38%,rgba(72,72,68,0.42)_0_9%,transparent_10%),radial-gradient(circle_at_68%_30%,rgba(72,72,68,0.35)_0_7%,transparent_8%),radial-gradient(circle_at_55%_70%,rgba(72,72,68,0.32)_0_11%,transparent_12%),radial-gradient(circle_at_84%_62%,rgba(72,72,68,0.28)_0_5%,transparent_6%)] dark:before:content-['']",
        'dark:after:absolute dark:after:inset-0 dark:after:bg-[linear-gradient(180deg,rgba(255,255,255,0.36)_0%,transparent_48%,rgba(42,42,39,0.38)_100%)] dark:after:content-[""]',
        '[box-shadow:none] transition-[background-color,box-shadow,translate,border] duration-150 ease-out dark:[box-shadow:0_14px_24px_-16px_rgba(210,210,200,0.45)]',
        'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-brutal-outline hover:bg-secondary dark:hover:bg-[radial-gradient(circle_at_28%_24%,#fff9dc_0%,#f6e9a6_28%,#d8c46b_63%,#a99745_100%)] hover:text-accent-foreground hover:[box-shadow:var(--shadow-brutal)] dark:hover:[box-shadow:0_16px_28px_-14px_rgba(255,229,0,0.95),var(--shadow-brutal)]',
        'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
        'active:translate-x-0 active:translate-y-0 active:[box-shadow:none]'
      )}
    >
      <span className='relative z-10 leading-none'>WWFlow</span>
    </Link>
  );
}
