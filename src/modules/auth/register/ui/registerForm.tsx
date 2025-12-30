'use client';

import type { ChangeEvent } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ROUTES } from '@/common/constants/routes';
import { Button } from '@/common/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { InputPassword } from '@/common/ui/input-password';

import type { RegisterFormValues } from '../model/registerFormSchema';

import { AuthWrapper } from '../../ui/authWrapper';
import { useRegisterMutation } from '../hooks/useRegisterMutation';
import { registerFormSchema } from '../model/registerFormSchema';

const initialFormState: RegisterFormValues = {
  email: '',
  password: '',
  confirmPassword: ''
};

export function RegisterForm() {
  const [register, { loading }] = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: initialFormState,
    mode: 'onChange'
  });

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) {
    onChange(e.target.value);

    if (!form.getValues('confirmPassword')) return;
    form.trigger('confirmPassword');
  }

  function onSubmit(data: RegisterFormValues) {
    register({ variables: data });
  }

  return (
    <AuthWrapper
      heading='Create your account'
      description='Get started in seconds'
      footer={{
        text: 'Already have an account?',
        actionLabel: 'Log in',
        actionHref: ROUTES.authLogin
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
                  <InputPassword {...field} onChange={(e) => onPasswordChange(e, field.onChange)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='password'
            control={form.control}
          />

          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <InputPassword {...field} placeholder='repeat you password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='confirmPassword'
            control={form.control}
          />
          <Button
            className='w-full'
            disabled={form.formState.isSubmitting || !form.formState.isValid || loading}
            size='lg'
            type='submit'
          >
            Sign up
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
