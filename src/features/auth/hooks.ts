import { useSyncExternalStore } from 'react';
import { clerkStore } from './clerk.ts';

export function useClerk() {
  return useSyncExternalStore(
    clerkStore.subscribe.bind(clerkStore),
    clerkStore.get.bind(clerkStore),
  );
}

export function useUser() {
  const { user } = useClerk() ?? {};
  return user;
}

export function useSession() {
  const { session } = useClerk() ?? {};
  return session;
}
