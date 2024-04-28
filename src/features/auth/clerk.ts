import Clerk from '@clerk/clerk-js';
import { dark } from '@clerk/themes';
import { atom } from 'nanostores';
import { colors, font } from '../../design/tokens.css';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '../../constants.ts';

const CLERK_PUBLIC_KEY = PUBLIC_CLERK_PUBLISHABLE_KEY;

export const clerkStore = atom<Clerk | null>(null);

export const initializeClerk = async () => {
  if (clerkStore.get()) return; // Already initialized
  if (!CLERK_PUBLIC_KEY) throw new Error('Clerk public key is not set');

  const clerk = new Clerk(CLERK_PUBLIC_KEY);
  await clerk.load({
    supportEmail: 'tulsawebdevs@techlahoma.org',
    appearance: {
      baseTheme: dark,
      variables: {
        borderRadius: '8px',
        fontSize: '20px',
        spacingUnit: '20px',
        fontFamily: font.ReneBieder2,
        fontFamilyButtons: font.ReneBieder2,
        colorPrimary: colors['twd-blue-400'],
        colorTextSecondary: colors.white,
        colorBackground: colors.black,
        colorText: colors['twd-blue-300'],
        colorInputBackground: colors['twd-blue-300'],
        colorInputText: colors.black,
        colorAlphaShade: colors['twd-gray-400'],
        colorTextOnPrimaryBackground: colors.black,
      },
    },
  });
  clerkStore.set(clerk);
};
