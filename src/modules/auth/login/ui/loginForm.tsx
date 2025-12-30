'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { ROUTES } from '@/common/constants/routes';
import { Button } from '@/common/ui/button';
import { Card, CardContent, CardFooter } from '@/common/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { InputPassword } from '@/common/ui/input-password';

import type { LoginFormValues } from '../model/loginFormSchema';

import { useLoginMutation } from '../hooks/useLoginMutation';
import { loginFormSchema } from '../model/loginFormSchema';

const initialFormState: LoginFormValues = {
  email: '',
  password: ''
};

export function LoginForm() {
  const [login, { loading }] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: initialFormState,
    mode: 'onChange'
  });

  function onSubmit(data: LoginFormValues) {
    login({ variables: data });
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className='pt-6 space-y-4'>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className='rounded-xl'
                      autoComplete='email'
                      placeholder='you@example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='email'
              control={form.control}
            />

            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='password'
              control={form.control}
            />
          </CardContent>

          <CardFooter className='flex flex-col gap-4'>
            <Button
              className='w-full rounded-xl'
              disabled={form.formState.isSubmitting || !form.formState.isValid || loading}
              size='lg'
              type='submit'
            >
              Log In
            </Button>
            <div className='flex items-center justify-center'>
              <p className='text-sm text-muted-foreground'>Don't have an account?</p>
              <Button asChild type='button' variant='link'>
                <Link href={ROUTES.authRegister}>Sign up</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
