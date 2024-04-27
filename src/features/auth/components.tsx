import type React from 'react';
import { useRef, useEffect } from 'react';
import { useClerk } from './hooks.ts';

import { signInButton } from './components.css.ts';

export function RenderWhenLoggedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useClerk() ?? {};
  return user ? children : null;
}

export function RenderWhenLoggedOut({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useClerk() ?? {};
  return user ? null : children;
}

export function SignInButton() {
  const clerk = useClerk();

  return (
    <button
      type="button"
      className={signInButton}
      onClick={() => clerk?.openSignIn()}
    >
      Sign in
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
