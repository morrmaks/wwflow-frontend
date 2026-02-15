import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

import { cn } from '@/common/lib/utils';
import { Button } from '@/common/ui/button';
import {
  DrilldownMenu,
  DrilldownMenuRoot,
  DrilldownMenuTrigger,
  DrilldownMenuView,
  DrilldownMenuViews
} from '@/common/ui/drilldown-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/common/ui/dropdown-menu';

import { BackgroundList } from '../../backgroundPicker';
import { boardBackgrounds } from '../../model/boardBackgrounds';
import { useBoardDropdownMenu } from '../hooks/useBoardDropdownMenu';

function BoardDropdownMenu() {
  const { background, handleSelect } = useBoardDropdownMenu();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='p-2 hover:bg-primary/10' size='icon' variant='ghost'>
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DrilldownMenu>
          <DrilldownMenuRoot>
            <DrilldownMenuTrigger to='backgrounds'>
              <span className={cn(boardBackgrounds[background].class, 'rounded-sm p-3')} />
              Change background
              <ChevronRightIcon />
            </DrilldownMenuTrigger>
          </DrilldownMenuRoot>

          <DrilldownMenuViews>
            <DrilldownMenuView
              className='overflow-y-auto p-1 pt-0'
              id='backgrounds'
              title='Background'
            >
              <BackgroundList selected={background} onSelect={handleSelect} />
            </DrilldownMenuView>
          </DrilldownMenuViews>
        </DrilldownMenu>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { BoardDropdownMenu };
