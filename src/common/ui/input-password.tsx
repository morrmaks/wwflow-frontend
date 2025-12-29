'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from './button';
import { Input } from './input';

interface InputPasswordProps extends React.ComponentProps<typeof Input> {}

function InputPassword({ ...props }: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <Input
        className='rounded-xl'
        type={showPassword ? 'text' : 'password'}
        autoComplete='current-password'
        placeholder={props.placeholder || 'you password'}
        {...props}
      />
      <Button
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        className='absolute right-3 top-1/2 -translate-y-1/2'
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  );
}

export { InputPassword };
