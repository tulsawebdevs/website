import { useClerk } from './hooks.ts';

export default function SignInButton() {
  const clerk = useClerk();

  return (
    <button type="button" onClick={() => clerk?.openSignIn()}>
      Sign in
    </button>
  );
}
