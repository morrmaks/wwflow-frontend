'use client';

import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { LoginMutation, LoginMutationVariables } from '@/shared/api/graphql/__generated__';

import { LoginDocument } from '@/shared/api/graphql/__generated__';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { InputPassword } from '@/shared/ui/input-password';

import type { LoginFormValues } from './loginFormSchema';

import { loginFormSchema } from './loginFormSchema';

const initialFormState: LoginFormValues = {
  email: '',
  password: ''
};

export function LoginForm() {
  const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: initialFormState,
    mode: 'onChange'
  });

  function onSubmit(data: LoginFormValues) {
    try {
      toast.error('Something went wrong');
      login({ variables: data });
    } catch {
      toast.error('Something went wrong');
    }
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
                <Link href='/register'>Sign up</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
