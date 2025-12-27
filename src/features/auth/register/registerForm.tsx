'use client';

import type { ChangeEvent } from 'react';

import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type {
  RegisterMutation,
  RegisterMutationVariables
} from '@/shared/api/graphql/__generated__';

import { RegisterDocument } from '@/shared/api/graphql/__generated__';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { InputPassword } from '@/shared/ui/input-password';

import type { RegisterFormValues } from './registerFormSchema';

import { registerFormSchema } from './registerFormSchema';

const initialFormState: RegisterFormValues = {
  email: '',
  password: '',
  confirmPassword: ''
};

export function RegisterForm() {
  const [register, { loading }] = useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );

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
    try {
      register({ variables: data });
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
                    <InputPassword
                      {...field}
                      onChange={(e) => onPasswordChange(e, field.onChange)}
                    />
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
          </CardContent>

          <CardFooter className='flex flex-col gap-4'>
            <Button
              className='w-full rounded-xl'
              disabled={form.formState.isSubmitting || !form.formState.isValid || loading}
              size='lg'
              type='submit'
            >
              Sign up
            </Button>
            <div className='flex items-center justify-center'>
              <p className='text-sm text-muted-foreground'>Already have an account?</p>
              <Button asChild type='button' variant='link'>
                <Link href='/login'>Log in</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
