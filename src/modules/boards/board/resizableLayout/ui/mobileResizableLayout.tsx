import { useMobileResizableLayout } from '../hooks/useMobileResizableLayout';
import { ResizablePanelsTabs } from './resizablePanelsTabs';

function MobileResizableLayout() {
  const { panel, active, togglePanel } = useMobileResizableLayout();

  if (!panel) return null;

  const PanelComponent = panel.component;

  return (
    <>
      <div className='flex flex-1 overflow-hidden max-w-full'>
        <div className='flex-1 max-w-full'>
          <PanelComponent />
        </div>
      </div>
      <ResizablePanelsTabs value={active} mode='single' onChange={togglePanel} />
    </>
  );
}

export { MobileResizableLayout };
