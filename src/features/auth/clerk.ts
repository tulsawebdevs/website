import Clerk from '@clerk/clerk-js';
import { atom } from 'nanostores';

const CLERK_PUBLIC_KEY = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

export const clerkStore = atom<Clerk | null>(null);

export const initializeClerk = async () => {
  if (clerkStore.get()) return; // Already initialized
  if (!CLERK_PUBLIC_KEY) throw new Error('Clerk public key is not set');

  const clerk = new Clerk(CLERK_PUBLIC_KEY);
  await clerk.load();
  clerkStore.set(clerk);
};
