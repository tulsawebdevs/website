import { headerNav } from './Header.css.ts';

import { IfAuthorized, SignInButton, UserButton } from '../auth/components.tsx';

export default function Header(props: { location: string | URL }) {
  const { href } = new URL(props.location);

  return (
    <nav className={headerNav}>
      <a href="/">
        <img src="/twd-icon-white.png" alt="TWD Icon" className="max-h-11" />
      </a>
      <a href="/hacknight" className="self-center">
        Hack-Night
      </a>
      <IfAuthorized>
        {() => <UserButton afterSignOutUrl={href} />}
        {() => <SignInButton fallbackRedirectUrl={href} />}
      </IfAuthorized>
    </nav>
  );
}
