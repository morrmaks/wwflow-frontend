'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ROUTES } from '@/common/constants/routes';
import { Button } from '@/common/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { InputPassword } from '@/common/ui/input-password';

import type { LoginFormValues } from '../model/loginFormSchema';

import { AuthWrapper } from '../../ui/authWrapper';
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

  const onSubmit = (data: LoginFormValues) => {
    login({ variables: data });
  };

  return (
    <AuthWrapper
      heading='Welcome back'
      description='Log in to you account'
      footer={{
        text: "Don't have an account?",
        actionLabel: 'Sign up',
        actionHref: ROUTES.authRegister
      }}
    >
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoComplete='email' placeholder='you@example.com' {...field} />
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
          <Button
            className='w-full'
            disabled={form.formState.isSubmitting || !form.formState.isValid || loading}
            size='lg'
            type='submit'
          >
            Log In
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
