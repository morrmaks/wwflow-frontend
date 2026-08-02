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

import type { RegisterFormValues } from '../_model/registerFormSchema';

import { AuthWrapper } from '../../_ui/authWrapper';
import { useRegisterForm } from '../_hooks/useRegisterForm';

const initialFormState: RegisterFormValues = {
  email: '',
  name: '',
  password: '',
  confirmPassword: ''
};

function RegisterForm() {
  const { form, onSubmit, loading, onPasswordChange } = useRegisterForm(initialFormState);

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
                <FormLabel className='text-card-foreground'>Name</FormLabel>
                <FormControl>
                  <Input autoComplete='name' placeholder='you name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='name'
            control={form.control}
          />

          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-card-foreground'>Password</FormLabel>
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
                <FormLabel className='text-card-foreground'>Confirm password</FormLabel>
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

export { RegisterForm };
