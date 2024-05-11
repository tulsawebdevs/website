/**
 * Importing '@clerk/clerk-js' with a default export doesn't work during development,
 * but works when the app is built for production. Conversely, importing Clerk as a
 * named export works during development, but not in production. For this reason,
 * we must import the module using a synthetic default import and destructure it.
 */
import * as ClerkJs from '@clerk/clerk-js';
import { dark } from '@clerk/themes';
import { atom } from 'nanostores';
import { colors, font } from '../../design/tokens.css';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '../../constants.ts';

type ClerkUser = NonNullable<ClerkJs.Clerk['user']>;
type ClerkSession = NonNullable<ClerkJs.Clerk['session']>;

// Customize types to reflect the settings in the Clerk dashboard
export type User = NonNullable<ClerkUser> & {
  firstName: string;
  lastName: string;
  primaryEmailAddress: NonNullable<ClerkUser['primaryEmailAddress']>;
};

export type Session = NonNullable<ClerkSession> & { user: User };

export type Clerk = ClerkJs.Clerk & {
  user: User | null | undefined;
  session: Session | null | undefined;
};

export type AuthConditions = Parameters<Session['checkAuthorization']>[0];

const { Clerk } = ClerkJs;
const CLERK_PUBLIC_KEY = PUBLIC_CLERK_PUBLISHABLE_KEY;

export const clerkStore = atom<Clerk | null>(null);

export const initializeClerk = async () => {
  if (clerkStore.get()) return; // Already initialized
  if (!CLERK_PUBLIC_KEY) throw new Error('Clerk public key is not set');

  const clerk = new Clerk(CLERK_PUBLIC_KEY) as Clerk;
  await clerk.load({
    supportEmail: 'tulsawebdevs@techlahoma.org',
    appearance: {
      baseTheme: dark,
      variables: {
        borderRadius: '8px',
        fontSize: '16px',
        spacingUnit: '20px',
        fontFamily: font.ReneBieder2,
        fontFamilyButtons: font.ReneBieder2,
        colorPrimary: colors['twd-blue-400'],
        colorTextSecondary: colors.white,
        colorBackground: colors.black,
        colorText: colors['twd-blue-300'],
        colorInputBackground: colors['twd-blue-300'],
        colorInputText: colors.black,
        colorNeutral: colors.white,
        colorShimmer: 'rgba(255, 255, 255, 0.2)',
        colorTextOnPrimaryBackground: colors.black,
      },
    },
  });
  clerkStore.set(clerk);
};
