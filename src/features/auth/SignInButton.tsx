import { useRef, useEffect } from 'react';
import { useClerk } from './hooks.ts';
import useModal from '../navigation/useModal.tsx';

export default function SignInButton() {
  const clerk = useClerk();
  const signInElement = useRef<HTMLDivElement>(null);

  const { Modal, close, open } = useModal({
    onOpen: () =>
      clerk?.isReady() &&
      signInElement.current &&
      clerk?.mountSignIn(signInElement.current),
    onClose: () =>
      signInElement.current && clerk?.unmountSignIn(signInElement.current),
  });

  useEffect(() => {
    if (clerk?.user) close();
    return () => close();
  }, [clerk, close]);

  return (
    <>
      <button type="button" onClick={open}>
        Sign in
      </button>
      <Modal>
        <div ref={signInElement} />
      </Modal>
    </>
  );
}
