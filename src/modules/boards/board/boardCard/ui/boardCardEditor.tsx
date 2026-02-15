'use client';

import type { CardPatchInput } from '@/common/api/graphql/__generated__';

import { Button } from '@/common/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/common/ui/form';
import { Textarea } from '@/common/ui/textarea';

import { useBoardCardEditor } from '../hooks/useBoardCardEditor';

interface BoardCardEditorProps {
  anchorRect: DOMRect;
  title: string;
  handleDeleteCard: () => void;
  onClose: () => void;
  update: (patch: CardPatchInput, prevPatch: CardPatchInput) => void;
}

function BoardCardEditor({
  title,
  anchorRect,
  onClose,
  update,
  handleDeleteCard
}: BoardCardEditorProps) {
  const { form, editorRef, style, handleKeyDown, onSubmit, onPointerMove } = useBoardCardEditor(
    title,
    anchorRect,
    onClose,
    update
  );

  return (
    <>
      <div
        className='fixed inset-0 bg-black/50 z-100 pointer-events-auto'
        onClick={onClose}
        onPointerMove={onPointerMove}
      />
      <Form {...form}>
        <form
          ref={editorRef}
          className='fixed z-110 rounded-lg'
          style={style}
          onPointerMove={onPointerMove}
          onSubmit={onSubmit}
        >
          <FormField
            render={({ field }) => (
              <FormItem className='mb-1'>
                <FormControl>
                  <Textarea
                    {...field}
                    className='resize-none text-sm bg-card dark:bg-card'
                    autoFocus
                    onKeyDown={handleKeyDown}
                    rows={3}
                  />
                </FormControl>
              </FormItem>
            )}
            name='title'
            control={form.control}
          />

          <div className='absolute w-full flex justify-between'>
            <Button className='' size='sm' type='submit'>
              Save
            </Button>
            <Button size='sm' variant='destructive' onClick={handleDeleteCard}>
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export { BoardCardEditor };
