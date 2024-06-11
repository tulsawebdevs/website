import type React from 'react';
import type { SignInProps } from '@clerk/clerk-js/dist/types/ui/types';
import { useRef, useEffect, useCallback, useState } from 'react';
import { useClerk, useSession, useUser } from './hooks.ts';

import type { AuthConditions, Session, User } from './clerk.ts';
import { Button } from '../ui/button.tsx';
import { DialogTrigger } from '../ui/dialog.tsx';
import { DropdownMenuTrigger } from '../ui/dropdown-menu.tsx';
import { SelectTrigger } from '../ui/select.tsx';

type Maybe<T> = T | null | undefined;

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

export function ProtectedTrigger(props: {
  children: React.ReactNode;
  type: 'dialog' | 'dropdown-menu' | 'select' | 'button';
}) {
  let Trigger;

  switch (props.type) {
    case 'dialog':
      Trigger = DialogTrigger;
      break;
    case 'dropdown-menu':
      Trigger = DropdownMenuTrigger;
      break;
    case 'button':
      Trigger = Button;
      break;
    case 'select':
      Trigger = SelectTrigger;
      break;
    default:
      throw new Error(`Unknown protected button type: ${String(props.type)}`);
  }

  return (
    <IfAuthorized>
      {() => <Trigger asChild>{props.children}</Trigger>}
      {() => <SignInButton asChild>{props.children}</SignInButton>}
    </IfAuthorized>
  );
}

export function SignInButton(
  props: React.ComponentProps<typeof Button> & {
    signinProps?: SignInProps | undefined;
  },
) {
  const clerk = useClerk();
  const { children = 'Sign In', signinProps = {}, ...buttonProps } = props;
  const [fallbackRedirectUrl, setFallbackRedirect] = useState<
    string | undefined
  >();

  useEffect(() => {
    // This useEffect ensures we only run this on the client, where
    setFallbackRedirect(window.location.href);
    return () => setFallbackRedirect(undefined);
  }, []);

  const onClick = useCallback(() => {
    clerk?.openSignIn({ fallbackRedirectUrl, ...signinProps });
  }, [clerk, signinProps, fallbackRedirectUrl]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button {...buttonProps} onClick={onClick}>
      {children}
    </Button>
  );
}

export function UserButton(
  props: Parameters<
    NonNullable<ReturnType<typeof useClerk>>['mountUserButton']
  >[1],
) {
  const userButtonRef = useRef<HTMLDivElement>(null);
  const clerk = useClerk();

  useEffect(() => {
    const userButton = userButtonRef.current;

    if (!clerk?.loaded || !userButton) return;

    if (clerk.user) clerk.mountUserButton(userButton, props);
    else clerk.unmountUserButton(userButton);

    return () => clerk.unmountUserButton(userButton);
  }, [clerk, props]);

  return <div ref={userButtonRef} />;
}
