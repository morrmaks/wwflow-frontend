import { cn } from '@src/common/lib/utils';
import { Button } from '@src/common/ui/button';
import {
  DrilldownMenu,
  DrilldownMenuRoot,
  DrilldownMenuTrigger,
  DrilldownMenuView,
  DrilldownMenuViews
} from '@src/common/ui/drilldown-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@src/common/ui/dropdown-menu';
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

import { BackgroundList } from '../../(background-picker)';
import { boardBackgrounds } from '../../_model/boardBackgrounds';
import { useInboxDropdownMenu } from '../_hooks/useInboxDropdownMenu';

function InboxDropdownMenu() {
  const { background, handleSelect } = useInboxDropdownMenu();

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

export { InboxDropdownMenu };
