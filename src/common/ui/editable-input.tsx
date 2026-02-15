'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/common/lib/utils';
import { Input } from '@/common/ui/input';

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
    <Input
      className={cn(
        'border-none w-min bg-transparent dark:bg-transparent shadow-none',
        'transition-all focus:bg-input/30 dark:focus:bg-input/30 hover:bg-primary/10 hover:text-accent-foreground dark:hover:bg-accent/50',
        className
      )}
      size={Math.max(draft.length, 1)}
      value={draft}
      onBlur={submit}
      onChange={handleChange}
      onFocus={beginEdit}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export { EditableInput };
