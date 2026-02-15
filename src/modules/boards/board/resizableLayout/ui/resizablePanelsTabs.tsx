import { cn } from '@/common/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/common/ui/toggle-group';

import type { PanelId } from '../../model';

import { resizablePanelsTabsConfig } from '../model/resizablePanelsTabsConfig';

interface SingleTabsProps {
  mode: 'single';
  value: PanelId;
  onChange: (id: PanelId) => void;
}

interface MultipleTabsProps {
  mode: 'multiple';
  value: PanelId[];
  onChange: (id: PanelId) => void;
}

type ResizablePanelsTabsProps = MultipleTabsProps | SingleTabsProps;

function ResizablePanelsTabs(props: ResizablePanelsTabsProps) {
  const toggleProps =
    props.mode === 'single'
      ? {
          type: 'single' as const,
          value: props.value
        }
      : {
          type: 'multiple' as const,
          value: props.value
        };

  return (
    <ToggleGroup
      {...toggleProps}
      className={cn(
        'bg-card border-0 sm:border rounded-none sm:rounded-xl',
        'grid grid-cols-2 justify-center w-full sm:w-auto p-3 sm:p-1.5 gap-2',
        'absolute bottom-0 sm:bottom-2 sm:left-1/2 sm:-translate-x-1/2'
      )}
      size='sm'
      variant='segmented'
    >
      {resizablePanelsTabsConfig.map(({ id, label, icon: Icon }) => (
        <ToggleGroupItem
          key={id}
          className='h-12 sm:h-auto'
          value={id}
          onClick={() => props.onChange(id)}
        >
          <Icon />
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export { ResizablePanelsTabs };
