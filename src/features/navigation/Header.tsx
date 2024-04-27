import { headerNav } from './Header.css.ts';

import {
  RenderIfAuthorized,
  SignInButton,
  UserButton,
} from '../auth/components.tsx';

export default function Header() {
  return (
    <nav className={headerNav}>
      <a href="/">Home</a>
      <a href="/hacknight">Hack-Night</a>
      <RenderIfAuthorized renderFallback={() => <SignInButton />}>
        {() => <UserButton />}
      </RenderIfAuthorized>
    </nav>
  );
}
