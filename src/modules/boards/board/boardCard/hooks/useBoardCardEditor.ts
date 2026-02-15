import { useLayoutEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { CardPatchInput } from '@/common/api/graphql/__generated__';

function useBoardCardEditor(
  title: string,
  anchorRect: DOMRect,
  onClose: () => void,
  update: (patch: CardPatchInput, prevPatch: CardPatchInput) => void
) {
  const editorRef = useRef<HTMLFormElement>(null);
  const [top, setTop] = useState(anchorRect.top);

  const form = useForm({
    defaultValues: { title }
  });

  useLayoutEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const { height } = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const padding = 40;

    const nextTop =
      anchorRect.top + height <= viewportHeight - padding
        ? anchorRect.top
        : viewportHeight - padding - height;

    setTop(nextTop);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [anchorRect]);

  const onSubmit = form.handleSubmit(({ title: nextTitle }) => {
    const next = nextTitle.trim();
    const prev = title.trim();

    if (next === '' || next === prev) {
      onClose();
      return;
    }

    update({ title: next }, { title: prev });
    onClose();
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter') onSubmit();
  };

  function onPointerMove(e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  return {
    form,
    onSubmit,
    editorRef,
    style: {
      top,
      left: anchorRect.left,
      width: anchorRect.width
    },
    handleKeyDown,
    onPointerMove
  };
}

export { useBoardCardEditor };
