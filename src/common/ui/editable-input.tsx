'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@src/common/lib/utils';
import { Input } from '@src/common/ui/input';

type NativeInputProps = Omit<
  React.ComponentProps<'input'>,
  'defaultValue' | 'onBlur' | 'onChange' | 'onKeyDown' | 'onSubmit' | 'value'
>;

interface EditableInputProps extends NativeInputProps {
  allowEmpty?: boolean;
  value: string;
  onCancel?: () => void;
  onSubmit: (nextValue: string) => void;
}

function EditableInput({
  value,
  onSubmit,
  onCancel,
  className,
  allowEmpty = false,
  ...props
}: EditableInputProps) {
  const [draft, setDraft] = useState(value);
  const intentRef = useRef<'cancel' | 'submit' | null>(null);
  const snapshotRef = useRef(value);

  useEffect(() => {
    if (intentRef.current === null) setDraft(value);
  }, [value]);

  const beginEdit = () => (snapshotRef.current = draft);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setDraft(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      intentRef.current = 'submit';
      e.preventDefault();
      e.currentTarget.blur();
    }

    if (e.key === 'Escape') {
      intentRef.current = 'cancel';
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const cancel = () => {
    setDraft(snapshotRef.current);
    onCancel?.();
    intentRef.current = null;
  };

  const submit = () => {
    if (intentRef.current === 'cancel') {
      cancel();
      return;
    }

    const next = draft.trim();

    if (!allowEmpty && next === '') {
      cancel();
      return;
    }

    if (next !== snapshotRef.current) onSubmit(next);
    intentRef.current = null;
  };

  return (
    <div
      className={cn(
        'relative inline-grid h-10 min-w-10 max-w-70 rounded-lg border-[3px] border-transparent bg-transparent text-foreground [box-shadow:none]',
        'transition-[background-color,border-color,box-shadow,color] duration-150 ease-out',
        'hover:border-brutal-outline hover:bg-card hover:text-card-foreground',
        'focus-within:border-brutal-outline focus-within:bg-card focus-within:text-card-foreground focus-within:[box-shadow:var(--shadow-brutal-sm)]',
        className
      )}
    >
      <span aria-hidden className='invisible whitespace-pre px-4'>
        {draft || ' '}
      </span>
      <Input
        className={cn(
          'absolute inset-0 h-full w-full border-0 bg-transparent px-4 py-0 text-current [box-shadow:none] hover:[box-shadow:none] focus-visible:[box-shadow:none] disabled:[box-shadow:none]',
          'typography-inherit'
        )}
        value={draft}
        onBlur={submit}
        onChange={handleChange}
        onFocus={beginEdit}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
}

export { EditableInput };
