import type React from 'react';
import { useRef, useEffect } from 'react';
import { useClerk, useSession, useUser } from './hooks.ts';

import { signInButton } from './components.css.ts';

type User = NonNullable<ReturnType<typeof useUser>>;
type Session = NonNullable<ReturnType<typeof useSession>>;

type AuthConditions = Parameters<Session['checkAuthorization']>[0];
type Maybe<T> = T | null | undefined;

type RenderIfAuthorizedProps = {
  conditions?: Maybe<AuthConditions>;
  children: (props: { user: User; session: Session }) => React.ReactNode;
  renderFallback: (props: {
    user?: Maybe<User>;
    session?: Maybe<Session>;
  }) => React.ReactNode;
};

/**
 * **IMPORTANT!!** Anything hidden by this component is still accessible to a user with the right tools.
 * @param props
 * @param props.conditions - The conditions to check for authorization. If not provided, the user must only be signed in.
 * @param props.fallback - The component to render if the user is not authorized according to the conditions.
 * @param props.children - The component to render if the user is signed in and authorized.
 * @returns The component to render based on the user's authorization status.
 */
export function RenderIfAuthorized({
  conditions,
  renderFallback,
  children,
}: RenderIfAuthorizedProps) {
  const session = useSession();
  const user = useUser();

  const isSignedIn = session && user;
  const isAuthorized = !conditions || session?.checkAuthorization(conditions);

  return isSignedIn && isAuthorized ?
      children({ user, session })
    : renderFallback({ user, session });
}

export function RenderWhenLoggedOut({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useClerk() ?? {};
  return user ? null : children;
}

export function SignInButton(props: {
  children?: React.ReactNode;
  className?: string;
}) {
  const clerk = useClerk();

  return (
    <button
      type="button"
      className={props.className ?? signInButton}
      onClick={() => clerk?.openSignIn()}
    >
      {props.children ?? 'Sign In'}
    </button>
  );
}

export function UserButton() {
  const userButtonRef = useRef<HTMLDivElement>(null);
  const clerk = useClerk();

  useEffect(() => {
    const userButton = userButtonRef.current;

    if (!clerk?.isReady() || !userButton) return;

    if (clerk.user) clerk.mountUserButton(userButton, { afterSignOutUrl: '/' });
    else clerk.unmountUserButton(userButton);

    return () => clerk.unmountUserButton(userButton);
  }, [clerk]);

  return <div ref={userButtonRef} />;
}
