import Link from 'next/link';

import { Button } from '@/common/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/common/ui/card';

interface AuthFooterProps {
  actionHref: string;
  actionLabel: string;
  text: string;
}

interface AuthWrapperProps {
  children: React.ReactNode;
  description?: React.ReactNode;
  footer: AuthFooterProps;
  heading: React.ReactNode;
}

function AuthWrapper({ children, heading, description, footer }: AuthWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl text-center'>{heading}</CardTitle>
        {description && <CardDescription className='text-center'>{description}</CardDescription>}
      </CardHeader>
      <div className='bg-muted h-[1] mx-6'></div>
      <CardContent className='pt-6 space-y-4'>{children}</CardContent>
      <CardFooter className='flex items-center justify-center'>
        <p className='text-sm text-muted-foreground'>{footer.text}</p>
        <Button asChild type='button' variant='link'>
          <Link href={footer.actionHref}>{footer.actionLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { AuthWrapper };
