import { Button } from '@src/common/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@src/common/ui/card';
import { Separator } from '@src/common/ui/separator';
import Link from 'next/link';

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
        {description && <CardDescription className='text-center text-card-foreground/60'>{description}</CardDescription>}
      </CardHeader>
      <div className='mx-6'>
        <Separator />
      </div>
      <CardContent className='pt-6 space-y-4'>{children}</CardContent>
      <CardFooter className='flex items-center justify-center'>
        <p className='text-sm text-card-foreground/60'>{footer.text}</p>
        <Button asChild type='button' variant='link'>
          <Link href={footer.actionHref}>{footer.actionLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { AuthWrapper };
