import { cn } from '@src/common/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@src/common/ui/toggle-group';

import type { PanelId } from '../../_model/store/boardStoreState';

import { resizablePanelsTabsConfig } from '../_model/resizablePanelsTabsConfig';

interface SingleTabsProps {
  mode: 'single';
  value: PanelId;
  onChange: (value: PanelId) => void;
}

interface MultipleTabsProps {
  mode: 'multiple';
  value: PanelId[];
  onChange: (value: PanelId[]) => void;
}

type ResizablePanelsTabsProps = MultipleTabsProps | SingleTabsProps;

function ResizablePanelsTabs(props: ResizablePanelsTabsProps) {
  const toggleProps =
    props.mode === 'single'
      ? {
          type: 'single' as const,
          value: props.value,
          onValueChange: (value: string) => {
            if (value) props.onChange(value as PanelId);
          }
        }
      : {
          type: 'multiple' as const,
          value: props.value,
          onValueChange: (value: string[]) => {
            if (value.length > 0) props.onChange(value as PanelId[]);
          }
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
          className={cn(
            'h-12 sm:h-auto data-[state=on]:[box-shadow:none]'
          )}
          value={id}
        >
          <Icon />
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export { ResizablePanelsTabs };
