import type { Metadata } from 'next';

import { CanvasesSection, CreateCanvasDialog } from '@/modules/canvases';

export const metadata: Metadata = {
  title: 'Canvas'
};

export default function CanvasPage() {
  return (
    <div className='page-padding pt-8'>
      <div className='flex justify-between items-center gap-4'>
        <div>
          <h2 className='text-3xl font-bold'>Canvas</h2>
          <p className='text-md text-muted-foreground mt-1'>
            Create and collaborate on visual ideas
          </p>
        </div>
        <CreateCanvasDialog />
      </div>
      <CanvasesSection />
    </div>
  );
}
