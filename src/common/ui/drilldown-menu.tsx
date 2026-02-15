import { ChevronLeftIcon } from 'lucide-react';
import { createContext, useContext, useState } from 'react';

import { Button } from './button';

interface MenuContextValue {
  stack: string[];
  pop: () => void;
  push: (view: string) => void;
  reset: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('Menu components must be inside <DrilldownMenu>');
  return ctx;
};

interface DrilldownMenuProps {
  children: React.ReactNode;
  defaultView?: string;
}

function DrilldownMenu({ defaultView = 'root', children }: DrilldownMenuProps) {
  const [stack, setStack] = useState<string[]>([defaultView]);

  const push = (view: string) => setStack((s) => [...s, view]);

  const pop = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));

  const reset = () => setStack([defaultView]);

  return (
    <MenuContext.Provider value={{ stack, push, pop, reset }}>{children}</MenuContext.Provider>
  );
}

function DrilldownMenuRoot({ children }: { children: React.ReactNode }) {
  const { stack } = useMenu();
  if (stack.at(-1) !== 'root') return null;
  return <div className='flex flex-col gap-1'>{children}</div>;
}

interface DrilldownMenuTriggerProps {
  children: React.ReactNode;
  to: string;
}

function DrilldownMenuTrigger({ to, children }: DrilldownMenuTriggerProps) {
  const { push } = useMenu();

  return (
    <Button
      className='flex items-center justify-between px-2 py-1'
      variant='ghost'
      onClick={() => push(to)}
    >
      {children}
    </Button>
  );
}

interface DrilldownMenuViewsProps {
  children: React.ReactNode;
}

function DrilldownMenuViews({ children }: DrilldownMenuViewsProps) {
  return <>{children}</>;
}

interface DrilldownMenuViewProps {
  children: React.ReactNode;
  className?: string;
  id: string;
  title?: string;
}

function DrilldownMenuView({ id, title, children, className }: DrilldownMenuViewProps) {
  const { stack, pop } = useMenu();
  const active = stack.at(-1);

  if (active !== id) return null;

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-1'>
        <Button size='icon' variant='ghost' onClick={pop}>
          <ChevronLeftIcon />
        </Button>

        {title && <p className='font-bold mr-3 text-sm'>{title}</p>}
      </div>

      <div className={className}>{children}</div>
    </div>
  );
}

export {
  DrilldownMenu,
  DrilldownMenuRoot,
  DrilldownMenuTrigger,
  DrilldownMenuView,
  DrilldownMenuViews
};
