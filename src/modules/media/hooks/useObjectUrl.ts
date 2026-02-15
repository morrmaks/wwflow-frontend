import { useMemo, useRef } from 'react';

export function useObjectUrl(file?: File | null) {
  const urlRef = useRef<string | null>(null);
  const fileRef = useRef<File | null>(null);

  return useMemo(() => {
    if (file === fileRef.current) {
      return urlRef.current;
    }

    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }

    fileRef.current = file ?? null;

    if (!file) return null;

    const url = URL.createObjectURL(file);
    urlRef.current = url;

    return url;
  }, [file]);
}
