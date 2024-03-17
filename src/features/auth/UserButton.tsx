import { useRef, useEffect } from 'react';
import { useClerk } from './hooks.ts';

export default function UserButton() {
  const userButtonRef = useRef<HTMLDivElement>(null);
  const clerk = useClerk();

  useEffect(() => {
    const userButton = userButtonRef.current;

    if (!clerk?.isReady() || !userButton) return;

    if (clerk.user) clerk.mountUserButton(userButton);
    else clerk.unmountUserButton(userButton);

    return () => clerk.unmountUserButton(userButton);
  }, [clerk]);

  return <div ref={userButtonRef} />;
}
