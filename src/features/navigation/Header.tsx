import { headerNav } from './Header.css.ts';

import { IfAuthorized, SignInButton, UserButton } from '../auth/components.tsx';

export default function Header(props: { location: string | URL }) {
  const { href } = new URL(props.location);

  return (
    <nav className={headerNav}>
      <a href="/">Home</a>
      <a href="/hacknight">Hack-Night</a>
      <IfAuthorized>
        {() => <UserButton afterSignOutUrl={href} />}
        {() => <SignInButton afterSignInUrl={href} />}
      </IfAuthorized>
    </nav>
  );
}
