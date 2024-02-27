import { createTheme, createThemeContract } from '@vanilla-extract/css';

import {
  ReneBieder3_300,
  ReneBieder3_400,
  ReneBieder3_700,
  ReneBieder3_900,
  ReneBieder2_500,
  ReneBieder2_700,
  ReneBieder2,
  ReneBieder3,
} from '../fonts/index.css.ts';

export const contract = createThemeContract({
  colors: {
    brand: {
      light: null,
      medium: null,
      dark: null,
    },
    gray: {
      dark: null,
      light: null,
    },
  },
  fonts: {
    normal: null,
    display: null,
    headings: {
      h1: null,
      h2: null,
      h3: null,
      h4: null,
      h5: null,
      h6: null,
    },
    body: {
      light: null,
      regular: null,
      bold: null,
      extraBold: null,
    },
  },
});

export const theme = createTheme(contract, {
  colors: {
    brand: {
      light: '#abceea',
      medium: '#1072ba',
      dark: '#14477e',
    },
    gray: {
      dark: '​#13151a',
      light: '#23262d',
    },
  },
  fonts: {
    normal: ReneBieder3,
    display: ReneBieder2,
    body: {
      light: ReneBieder3_300,
      regular: ReneBieder3_400,
      bold: ReneBieder3_700,
      extraBold: ReneBieder3_900,
    },
    headings: {
      h1: ReneBieder2_700,
      h2: ReneBieder2_700,
      h3: ReneBieder2_700,
      h4: ReneBieder2_500,
      h5: ReneBieder2_500,
      h6: ReneBieder2_500,
    },
  },
});
