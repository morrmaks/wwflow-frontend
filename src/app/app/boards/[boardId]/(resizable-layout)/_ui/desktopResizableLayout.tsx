import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@src/common/ui/resizable';
import { Fragment } from 'react';

import { useDesktopResizableLayout } from '../_hooks/useDesktopResizableLayout';
import { ResizablePanelsTabs } from './resizablePanelsTabs';

function DesktopResizableLayout() {
  const {
    activePanelIds,
    visiblePanels,
    panelLayout,
    onPointerUp,
    onPointerDown,
    handleLayoutChange,
    setPanels
  } = useDesktopResizableLayout();

  return (
    <>
      <ResizablePanelGroup
        className='flex-1 min-h-0'
        onLayoutChange={handleLayoutChange}
        orientation='horizontal'
      >
        {visiblePanels.map(({ component: Panel, id, minSize }, index) => {
          const size = panelLayout[id];

          return (
            <Fragment key={id}>
              <ResizablePanel defaultSize={size} id={id} minSize={minSize}>
                <Panel />
              </ResizablePanel>

              {index < visiblePanels.length - 1 && (
                <ResizableHandle
                  withHandle
                  className='mx-2 bg-transparent hidden sm:flex'
                  onPointerDown={onPointerDown}
                  onPointerUp={onPointerUp}
                />
              )}
            </Fragment>
          );
        })}
      </ResizablePanelGroup>

      <ResizablePanelsTabs value={activePanelIds} mode='multiple' onChange={setPanels} />
    </>
  );
}

export { DesktopResizableLayout };
