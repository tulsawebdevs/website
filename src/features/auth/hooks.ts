import { toast } from 'sonner';
import { useCallback, useSyncExternalStore } from 'react';
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
  fallbackRedirectUrl?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useIfAuthorized<A extends (...args: any[]) => any>(
  fn: A,
  options: ProtectedOptions = {},
) {
  const {
    conditions,
    unauthorizedMessage = 'You are not authorized to perform this action.',
    fallbackRedirectUrl = global.location.href,
  } = options;
  const { session, openSignIn } = useClerk() ?? {};

  if (!session) return () => void openSignIn?.({ fallbackRedirectUrl });
  if (!conditions || session.checkAuthorization(conditions)) return fn;
  return () => void toast.error(unauthorizedMessage);
}

export function useFetchPost(url: string) {
  const session = useSession();

  const postRequest = useCallback(
    async (body: object) => {
      const authToken = (await session?.getToken()) ?? '';

      return fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((response) => {
        if (response.status === 400) throw new Error('Bad request');
        if (response.status === 401) throw new Error('Unauthorized');
        if (response.status === 404) throw new Error('Not Found');
        if (response.status === 500) throw new Error('Server error');
        if (!response.ok) throw new Error('Unknown error');

        return response.json();
      });
    },
    [url, session],
  );

  return postRequest;
}
