'use client';

import { ROUTES } from '@src/common/constants/routes';
import { Button } from '@src/common/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@src/common/ui/form';
import { Input } from '@src/common/ui/input';
import { InputPassword } from '@src/common/ui/input-password';

import type { LoginFormValues } from '../_model/loginFormSchema';

import { AuthWrapper } from '../../_ui/authWrapper';
import { useLoginForm } from '../_hooks/useLoginForm';

const initialFormState: LoginFormValues = {
  email: '',
  password: ''
};

export function LoginForm() {
  const { form, loading, onSubmit } = useLoginForm(initialFormState);

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
                <FormLabel className='text-card-foreground'>Email</FormLabel>
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
                <FormLabel className='text-card-foreground'>Password</FormLabel>
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
