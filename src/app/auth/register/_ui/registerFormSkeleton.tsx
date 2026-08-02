import { Card, CardContent, CardFooter, CardHeader } from '@src/common/ui/card';
import { Separator } from '@src/common/ui/separator';
import { Skeleton } from '@src/common/ui/skeleton';

function RegisterFormSkeleton() {
  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='space-y-3'>
        <Skeleton className='h-6 w-2/3 mx-auto' />
        <Skeleton className='h-4 w-1/2 mx-auto' />
      </CardHeader>

      <div className='mx-6'>
        <Separator />
      </div>

      <CardContent className='pt-6 space-y-6'>
        <FieldSkeleton labelWidth='w-16' />
        <FieldSkeleton labelWidth='w-20' />
        <FieldSkeleton labelWidth='w-20' />
        <FieldSkeleton labelWidth='w-36' />
        <Skeleton className='h-11 w-full rounded-md' />
      </CardContent>

      <CardFooter className='flex items-center justify-center gap-2'>
        <Skeleton className='h-4 w-36' />
        <Skeleton className='h-4 w-16' />
      </CardFooter>
    </Card>
  );
}

function FieldSkeleton({ labelWidth }: { labelWidth: string }) {
  return (
    <div className='space-y-2'>
      <Skeleton className={`h-4 ${labelWidth}`} />
      <Skeleton className='h-10 w-full rounded-md' />
    </div>
  );
}

export { RegisterFormSkeleton };
