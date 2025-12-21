import { useEffect, useRef, useState } from 'react';

interface ScrollPayload {
  progressX: number;
  progressY: number;
  x: number;
  y: number;
}

export function useScrollActivity(): boolean;
export function useScrollActivity(delay: number): boolean;
export function useScrollActivity(onScroll: (payload: ScrollPayload) => void): boolean;
export function useScrollActivity(
  delay: number,
  onScroll: (payload: ScrollPayload) => void
): boolean;

export function useScrollActivity(
  arg1?: ((payload: ScrollPayload) => void) | number,
  arg2?: (payload: ScrollPayload) => void
) {
  const [isScrolling, setIsScrolling] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const tickingRef = useRef(false);
  const onScrollRef = useRef<((payload: ScrollPayload) => void) | undefined>(null);

  let delay = 0;

  if (typeof arg1 === 'number') {
    delay = arg1;
    onScrollRef.current = arg2;
  } else if (typeof arg1 === 'function') {
    onScrollRef.current = arg1;
  }

  useEffect(() => {
    const handler = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const x = window.scrollX;
        const y = window.scrollY;

        onScrollRef.current?.({
          x,
          y,
          progressX:
            document.documentElement.scrollWidth > window.innerWidth
              ? x / (document.documentElement.scrollWidth - window.innerWidth)
              : 0,
          progressY:
            document.documentElement.scrollHeight > window.innerHeight
              ? y / (document.documentElement.scrollHeight - window.innerHeight)
              : 0
        });

        if (delay > 0) {
          setIsScrolling(true);

          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = window.setTimeout(() => setIsScrolling(false), delay);
        }

        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handler, { passive: true });

    return () => {
      window.removeEventListener('scroll', handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay]);

  return isScrolling;
}
