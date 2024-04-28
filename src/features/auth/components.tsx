import type React from 'react';
import { useRef, useEffect, forwardRef } from 'react';
import { useClerk, useSession, useUser } from './hooks.ts';

import { signInButton } from './components.css.ts';

type Maybe<T> = T | null | undefined;

type User = NonNullable<ReturnType<typeof useUser>>;
type Session = NonNullable<ReturnType<typeof useSession>>;
type AuthConditions = Parameters<Session['checkAuthorization']>[0];

type AuthorizedRenderFunction = (props: {
  user: User;
  session: Session;
  conditions?: Maybe<AuthConditions>;
}) => React.ReactNode;

type UnauthorizedRenderFunction = (props: {
  user?: Maybe<User>;
  session?: Maybe<Session>;
  conditions?: Maybe<AuthConditions>;
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
  const [render, fallback = () => null] = children;

  const isSignedIn = session && user;
  const isAuthorized = !conditions || session?.checkAuthorization(conditions);

  return isSignedIn && isAuthorized ?
      render({ user, session, conditions })
    : fallback({ user, session, conditions });
}

export const SignInButton = forwardRef<
  HTMLButtonElement,
  {
    children?: React.ReactNode;
    className?: string;
  } & Parameters<NonNullable<ReturnType<typeof useClerk>>['openSignIn']>[0]
>((props, ref) => {
  const clerk = useClerk();
  const { className, children, ...signInProps } = props;

  return (
    <button
      type="button"
      className={className ?? signInButton}
      onClick={() => clerk?.openSignIn(signInProps)}
      ref={ref}
    >
      {children ?? 'Sign In'}
    </button>
  );
});

export function UserButton(
  props: Parameters<
    NonNullable<ReturnType<typeof useClerk>>['mountUserButton']
  >[1],
) {
  const userButtonRef = useRef<HTMLDivElement>(null);
  const clerk = useClerk();

  useEffect(() => {
    const userButton = userButtonRef.current;

    if (!clerk?.isReady() || !userButton) return;

    if (clerk.user) clerk.mountUserButton(userButton, props);
    else clerk.unmountUserButton(userButton);

    return () => clerk.unmountUserButton(userButton);
  }, [clerk, props]);

  return <div ref={userButtonRef} />;
}
