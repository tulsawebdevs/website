import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { colors, font } from './tokens.css.ts';

const colorThemeContract = createThemeContract({
  color: null,
  backgroundColor: null,
  borderColor: null,
  shadowColor: null,
  outlineColor: null,
});

const stateThemeContract = createThemeContract({
  idle: { placeholderColor: null, ...colorThemeContract },
  focus: colorThemeContract,
  hover: colorThemeContract,
  press: colorThemeContract,
  selected: colorThemeContract,
  strong: colorThemeContract,
  transparent: colorThemeContract,
  disabled: colorThemeContract,
});

export const schemeThemeContract = createThemeContract({
  light: stateThemeContract,
  dark: stateThemeContract,
});

const base = {
  borderColor: colors.invisible,
  shadowColor: colors.invisible,
  outlineColor: colors.invisible,
};

const light = {
  ...base,
  color: colors['twd-gray-900'],
  backgroundColor: colors['twd-blue-400'],
};

const dark = {
  ...base,
  color: colors['twd-blue-200'],
  backgroundColor: colors['twd-gray-700'],
};

export const baseColorTheme = createThemeContract({
  light: {
    idle: { placeholderColor: light.color, ...light },
    focus: light,
    hover: light,
    press: light,
    selected: light,
    strong: light,
    transparent: light,
    disabled: light,
  },
  dark: {
    idle: { placeholderColor: dark.color, ...dark },
    focus: dark,
    hover: dark,
    press: dark,
    selected: dark,
    strong: dark,
    transparent: dark,
    disabled: dark,
  },
});

type DeepOptional<T> =
  T extends Record<string, unknown> ?
    {
      [K in keyof T]?: DeepOptional<T[K]>;
    }
  : T;

const composeThemes = <TUpdate extends DeepOptional<typeof baseColorTheme>>(
  ...[root, ...partials]: [typeof baseColorTheme, ...TUpdate[]]
) =>
  partials.reduce(
    (acc, part) => ({
      dark: {
        idle: { ...acc.dark.idle, ...part.dark?.idle },
        disabled: { ...acc.dark.disabled, ...part.dark?.disabled },
        focus: { ...acc.dark.focus, ...part.dark?.focus },
        hover: { ...acc.dark.hover, ...part.dark?.hover },
        press: { ...acc.dark.press, ...part.dark?.press },
        selected: { ...acc.dark.selected, ...part.dark?.selected },
        strong: { ...acc.dark.strong, ...part.dark?.strong },
        transparent: { ...acc.dark.transparent, ...part.dark?.transparent },
      },

      light: {
        idle: { ...acc.light.idle, ...part.light?.idle },
        disabled: { ...acc.light.disabled, ...part.light?.disabled },
        focus: { ...acc.light.focus, ...part.light?.focus },
        hover: { ...acc.light.hover, ...part.light?.hover },
        press: { ...acc.light.press, ...part.light?.press },
        selected: { ...acc.light.selected, ...part.light?.selected },
        strong: { ...acc.light.strong, ...part.light?.strong },
        transparent: { ...acc.light.transparent, ...part.light?.transparent },
      },
    }),
    root,
  );

export function createThemeFromPartial<
  T extends DeepOptional<typeof baseColorTheme>,
>(partial: T) {
  return createTheme(
    schemeThemeContract,
    composeThemes(baseColorTheme, partial),
  );
}

const fontThemeContract = createThemeContract({
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

export const fontTheme = createTheme(fontThemeContract, {
  fonts: {
    normal: font.ReneBieder3,
    display: font.ReneBieder2,
    body: {
      light: font.ReneBieder3_300,
      regular: font.ReneBieder3_400,
      bold: font.ReneBieder3_700,
      extraBold: font.ReneBieder3_900,
    },
    headings: {
      h1: font.ReneBieder2_700,
      h2: font.ReneBieder2_700,
      h3: font.ReneBieder2_700,
      h4: font.ReneBieder2_500,
      h5: font.ReneBieder2_500,
      h6: font.ReneBieder2_500,
    },
  },
});
