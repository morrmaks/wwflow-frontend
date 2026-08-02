import { Spinner } from '@src/common/ui/spinner';

export default function MainPageLoading() {
  return (
    <div className='fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center'>
      <Spinner className='h-8 w-8' height={32} width={32} />
    </div>
  );
}
