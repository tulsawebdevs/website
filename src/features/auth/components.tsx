import type React from 'react';
import { useRef, useEffect, forwardRef } from 'react';
import { useClerk, useSession, useUser } from './hooks.ts';

import { signInButton } from './components.css.ts';

type User = NonNullable<ReturnType<typeof useUser>>;
type Session = NonNullable<ReturnType<typeof useSession>>;

type AuthConditions = Parameters<Session['checkAuthorization']>[0];
type Maybe<T> = T | null | undefined;
type AuthorizedRenderFunction = (props: {
  user: User;
  session: Session;
}) => React.ReactNode;
type UnauthorizedRenderFunction = (props: {
  user?: Maybe<User>;
  session?: Maybe<Session>;
}) => React.ReactNode;

type IfAuthorizedProps = {
  conditions?: Maybe<AuthConditions>;
  children: [
    render: AuthorizedRenderFunction,
    fallback?: UnauthorizedRenderFunction,
  ];
};

/**
 * **IMPORTANT!!** Anything hidden by this component is still accessible to a user with the right tools.
 * @param props
 * @param props.conditions - The conditions to check for authorization. If not provided, the user must only be signed in.
 * @param props.fallback - The component to render if the user is not authorized according to the conditions.
 * @param props.children - The component to render if the user is signed in and authorized.
 * @returns The component to render based on the user's authorization status.
 */
export function IfAuthorized({ conditions, children }: IfAuthorizedProps) {
  const session = useSession();
  const user = useUser();

  const isSignedIn = session && user;
  const isAuthorized = !conditions || session?.checkAuthorization(conditions);

  return isSignedIn && isAuthorized ?
      children[0]({ user, session })
    : children[1]?.({ user, session }) ?? null;
}

export const SignInButton = forwardRef<
  HTMLButtonElement,
  {
  children?: React.ReactNode;
  className?: string;
  }
>((props, ref) => {
  const clerk = useClerk();

  return (
    <button
      type="button"
      className={props.className ?? signInButton}
      onClick={() => clerk?.openSignIn()}
      ref={ref}
    >
      {props.children ?? 'Sign In'}
    </button>
  );
});

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
