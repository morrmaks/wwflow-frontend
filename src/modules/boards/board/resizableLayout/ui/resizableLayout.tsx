import { useIsMobile } from '@/common/hooks/useIsMobile';

import { DesktopResizableLayout } from './desktopResizableLayout';
import { MobileResizableLayout } from './mobileResizableLayout';

function ResizableLayout() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileResizableLayout /> : <DesktopResizableLayout />;
}

export { ResizableLayout };
