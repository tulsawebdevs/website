import { useClerk } from './hooks.ts';
import { signInButton } from './SignInButton.css.ts';

export default function SignInButton() {
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
