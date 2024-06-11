import type { SignInProps } from '@clerk/clerk-js/dist/types/ui/types';
import { toast } from 'sonner';
import { useSyncExternalStore } from 'react';
import { clerkStore } from './clerk.ts';
import type { AuthConditions, Clerk, User } from './clerk.ts';

export function useClerk() {
  return useSyncExternalStore(
    clerkStore.subscribe.bind(clerkStore),
    clerkStore.get.bind(clerkStore) as () => Clerk | null,
    () => null,
  );
}

export function useUser() {
  const { user } = useClerk() ?? {};
  return user as null | undefined | User;
}

export function useSession() {
  const { session } = useClerk() ?? {};
  return session;
}

type ProtectedOptions = {
  conditions?: AuthConditions;
  unauthorizedMessage?: string;
} & SignInProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useIfAuthorized<A extends (...args: any[]) => any>(
  fn: A,
  options: ProtectedOptions = {},
) {
  const {
    conditions,
    unauthorizedMessage = 'You are not authorized to perform this action.',
    fallbackRedirectUrl = window.location.href,
    ...signInOptions
  } = options;

  const { session, openSignIn } = useClerk() ?? {};

  if (!session)
    return () => void openSignIn?.({ fallbackRedirectUrl, ...signInOptions });
  if (!conditions || session.checkAuthorization(conditions)) return fn;
  return () => void toast.error(unauthorizedMessage);
}
