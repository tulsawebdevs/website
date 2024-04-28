import { headerNav } from './Header.css.ts';
import { IfAuthorized, SignInButton, UserButton } from '../auth/components.tsx';

export default function Header(props: { location: string | URL }) {
  const { href } = new URL(props.location);

  return (
    <nav className={headerNav}>
      <a href="/">
        <img
          src="/twd-icon-white.png"
          alt="TWD Icon"
          className="h-[2.5rem] w-[2.5rem] self-center"
        />
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
