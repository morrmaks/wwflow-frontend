import { MoreHorizontalIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/common/ui/dropdown-menu';

interface BoardColumnDropdownMenuProps {
  onDelete: () => void;
}

function BoardColumnDropdownMenu({ onDelete }: BoardColumnDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='p-2 hover:bg-primary/10' size='icon' variant='ghost'>
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem variant='destructive' onClick={onDelete}>
          <Trash2Icon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { BoardColumnDropdownMenu };
