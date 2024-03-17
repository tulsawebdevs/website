import { useSyncExternalStore } from 'react';
import { clerkStore } from './clerk.ts';

export function useClerk() {
  return useSyncExternalStore(
    clerkStore.subscribe.bind(clerkStore),
    clerkStore.get.bind(clerkStore),
  );
}
