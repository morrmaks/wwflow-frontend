export default function NotFound() {
  return (
    <div className='h-screen flex flex-col items-center justify-center sm:flex-row'>
      <span className='text-8xl font-bold border-b-2 sm:border-b-0 sm:border-r-2 border-secondary pb-2 mb-4 sm:pb-0 sm:pr-4 sm:mr-6 sm:mb-0 w-max'>
        404
      </span>
      <span className='text-4xl font-bold'>Page Not Found</span>
    </div>
  );
}
