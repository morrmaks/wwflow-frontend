import { Button } from '@src/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@src/common/ui/dropdown-menu';
import { MoreHorizontalIcon, Trash2Icon } from 'lucide-react';

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
