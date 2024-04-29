import { useCallback, useSyncExternalStore } from 'react';
import { clerkStore } from './clerk.ts';
import { useErrorToast } from '../errors.tsx';

type Session = NonNullable<ReturnType<typeof useSession>>;
type AuthConditions = Parameters<Session['checkAuthorization']>[0];

export function useClerk() {
  return useSyncExternalStore(
    clerkStore.subscribe.bind(clerkStore),
    clerkStore.get.bind(clerkStore),
    () => null,
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

type ProtectedOptions = {
  conditions?: AuthConditions;
  unauthorizedMessage?: string;
};

export function useProtectedFunction(
  function_: (...params: unknown[]) => void,
  options: ProtectedOptions = {},
) {
  const {
    conditions,
    unauthorizedMessage = 'You are not authorized to perform this action.',
  } = options;
  const errorToast = useErrorToast();
  const session = useSession();
  const user = useUser();
  const clerk = useClerk();
  const isSignedIn = session && user;
  const isAuthorized = !conditions || session?.checkAuthorization(conditions);

  function protectedFunction(...params: unknown[]) {
    if (!isSignedIn) return clerk?.openSignIn();
    if (isAuthorized) return function_(...params);

    errorToast({ title: unauthorizedMessage });
  }

  return protectedFunction;
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
