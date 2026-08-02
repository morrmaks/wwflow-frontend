import type { Metadata } from 'next';

import { TldrawCanvas } from './(tldraw)';

interface Params {
  canvasId: string;
}

export const generateMetadata = async ({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> => {
  return {
    title: `Canvas ${(await params).canvasId}`
  };
};

export default async function CanvasIdPage() {
  return (
    <div className='h-screen w-full'>
      <TldrawCanvas />
    </div>
  );
}
