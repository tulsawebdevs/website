import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useDebounceFn<A extends any[], R = void>(
  callback: (...args: A) => R,
  delay = 300,
) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const debouncedCallback = useCallback(
    (...args: A) => {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
}
