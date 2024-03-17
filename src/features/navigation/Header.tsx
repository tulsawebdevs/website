import { useMemo } from 'react';

import { headerNav } from './Header.css.ts';

import { useClerk } from '../auth/hooks.ts';
import SignInButton from '../auth/SignInButton.tsx';
import UserButton from '../auth/UserButton.tsx';

export default function Header() {
  const { user } = useClerk() ?? {};
  const AuthButton = useMemo(() => (user ? UserButton : SignInButton), [user]);

  return (
    <nav className={headerNav}>
      <a href="/">Home</a>
      <a href="/hacknight">Hack-Night</a>
      <AuthButton />
    </nav>
  );
}
