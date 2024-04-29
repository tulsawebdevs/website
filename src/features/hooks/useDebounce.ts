import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionArgs<Args extends any[] = any[], Return = void> = (
  ...args: Args
) => Return;

export default function useDebounceFn<T extends FunctionArgs>(
  callback: T,
  delay = 300,
) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
}
