// TODO: Values borrowed from Tamagui - Replace with actual design tokens

import { fontFace } from '@vanilla-extract/css';

/*
    Dimensions
*/

export const space = {
  0: '0',
  '0.25': '0.5',
  '0.5': '1',
  '0.75': '1.5',
  1: '2',
  '1.5': '4',
  2: '7',
  '2.5': '10',
  3: '13',
  '3.5': '16',
  4: '18',
  true: '18',
  '4.5': '21',
  5: '24',
  6: '32',
  7: '39',
  8: '46',
  9: '53',
  10: '60',
  11: '74',
  12: '88',
  13: '102',
  14: '116',
  15: '130',
  16: '144',
  17: '144',
  18: '158',
  19: '172',
  20: '186',
};

export const size = {
  0: '0',
  '0.25': '2',
  '0.5': '4',
  '0.75': '8',
  1: '20',
  '1.5': '24',
  2: '28',
  '2.5': '32',
  3: '36',
  '3.5': '40',
  4: '44',
  true: '44',
  '4.5': '48',
  5: '52',
  6: '64',
  7: '74',
  8: '84',
  9: '94',
  10: '104',
  11: '124',
  12: '144',
  13: '164',
  14: '184',
  15: '204',
  16: '224',
  17: '224',
  18: '244',
  19: '264',
  20: '284',
};

export const radius = {
  0: '0',
  1: '3',
  2: '5',
  3: '7',
  4: '9',
  true: '9',
  5: '10',
  6: '16',
  7: '19',
  8: '22',
  9: '26',
  10: '34',
  11: '42',
  12: '50',
};

/*
    Colors
*/

const twdBlue = {
  'twd-blue-100': '#bfe0f8',
  'twd-blue-200': '#86c7f3',
  'twd-blue-300': '#46aaea',
  'twd-blue-400': '#1d8fda',
  'twd-blue-500': '#1072ba',
  'twd-blue-600': '#0e5b96',
  'twd-blue-700': '#104d7c',
  'twd-blue-800': '#134167',
  'twd-blue-900': '#0d2944',
} as const;

const twdGray = {
  'twd-gray-100': '#eceef2',
  'twd-gray-200': '#d5dae2',
  'twd-gray-300': '#b0b9c9',
  'twd-gray-400': '#8593ab',
  'twd-gray-500': '#667691',
  'twd-gray-600': '#515f78',
  'twd-gray-700': '#434d61',
  'twd-gray-800': '#3a4252',
  'twd-gray-900': '#343a46',
} as const;

export const colors = {
  invisible: '#00000000',
  black: '#13151a',
  white: '#f1f8fe',
  ...twdBlue,
  ...twdGray,
} as const;

/*
    Fonts
*/

const fontSettings = {
  ReneBieder2_500: {
    src: 'url("./RBNo2.1a-Medium.otf") format("opentype")',
    fontWeight: 500,
  },
  ReneBieder2_700: {
    src: 'url("./RBNo2.1b-Black.otf") format("opentype")',
    fontWeight: 700,
  },
  ReneBieder3_300: {
    src: 'url("./RBNo3.1-Light.otf") format("opentype")',
    fontWeight: 300,
  },
  ReneBieder3_400: {
    src: 'url("./RBNo3.1-Book.otf") format("opentype")',
    fontWeight: 400,
  },
  ReneBieder3_700: {
    src: 'url("./RBNo3.1-Bold.otf") format("opentype")',
    fontWeight: 700,
  },
  ReneBieder3_900: {
    src: 'url("./RBNo3.1-Black.otf") format("opentype")',
    fontWeight: 900,
  },
} satisfies Record<string, Parameters<typeof fontFace>[0]>;

const fonts = Object.entries(fontSettings).reduce(
  (acc, [key, value]) => {
    acc[key as keyof typeof acc] = fontFace(value, key);
    return acc;
  },
  {} as Record<keyof typeof fontSettings, string>,
);

// Variable Font Faces

const ReneBieder3 = fontFace(
  Object.entries(fontSettings)
    .filter(([key]) => key.startsWith('ReneBieder3'))
    .map(([_, value]) => value),
);

const ReneBieder2 = fontFace(
  Object.entries(fontSettings)
    .filter(([key]) => key.startsWith('ReneBieder2'))
    .map(([_, value]) => value),
);

export const font = {
  ...fonts,
  ReneBieder3,
  ReneBieder2,
};

export const fontSize = {
  true: '16',
  '0.25': '6',
  '0.5': '8',
  1: '10',
  2: '12',
  3: '14',
  4: '16',
  5: '20',
  6: '24',
  7: '28',
  8: '32',
  9: '40',
  10: '48',
  11: '56',
  12: '64',
  13: '80',
  14: '96',
  15: '112',
  16: '128',
};
