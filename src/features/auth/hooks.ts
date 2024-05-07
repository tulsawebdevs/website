import { toast } from 'sonner';
import { useCallback, useSyncExternalStore } from 'react';
import { clerkStore } from './clerk.ts';

type ClerkValue = NonNullable<(typeof clerkStore)['value']>;
type UserResource = NonNullable<ClerkValue['user']>;

export type User = UserResource & {
  firstName: string;
  lastName: string;
  primaryEmailAddress: NonNullable<UserResource['primaryEmailAddress']>;
};

export type Session = NonNullable<ClerkValue['session']> & {
  user: User;
};

type Clerk = ClerkValue & {
  user: User | null | undefined;
  session: Session | null | undefined;
};

type AuthConditions = Parameters<Session['checkAuthorization']>[0];

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
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useProtectedFunction<A extends any[]>(
  function_: (...params: A) => void,
  options: ProtectedOptions = {},
) {
  const {
    conditions,
    unauthorizedMessage = 'You are not authorized to perform this action.',
  } = options;
  const session = useSession();
  const user = useUser();
  const clerk = useClerk();
  const isSignedIn = session && user;
  const isAuthorized = !conditions || session?.checkAuthorization(conditions);

  function protectedFunction(...params: A) {
    if (!isSignedIn) return clerk?.openSignIn();

    if (isAuthorized) return function_(...params);

    toast.error(unauthorizedMessage, { duration: 3000 });
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
