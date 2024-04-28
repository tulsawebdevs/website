import { headerNav } from './Header.css.ts';

import { IfAuthorized, SignInButton, UserButton } from '../auth/components.tsx';

export default function Header() {
  return (
    <nav className={headerNav}>
      <a href="/">Home</a>
      <a href="/hacknight">Hack-Night</a>
      <IfAuthorized>
        {() => <UserButton />}
        {() => <SignInButton />}
      </IfAuthorized>
    </nav>
  );
}
