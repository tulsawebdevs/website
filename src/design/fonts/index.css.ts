import { fontFace, globalFontFace } from '@vanilla-extract/css';

// RBNo2.1
export const ReneBieder2_500 = 'ReneBieder500';
export const ReneBieder2_700 = 'ReneBieder700';

const ReneBieder2_500value = {
  src: 'url("./RBNo2.1a-Medium.otf") format("opentype")',
  fontWeight: 500,
};

globalFontFace(ReneBieder2_500, ReneBieder2_500value);

const ReneBieder2_700value = {
  src: 'url("./RBNo2.1b-Black.otf") format("opentype")',
  fontWeight: 700,
};

globalFontFace(ReneBieder2_700, ReneBieder2_700value);

export const ReneBieder2 = fontFace([
  ReneBieder2_500value,
  ReneBieder2_700value,
]);

// RBNo3.1
export const ReneBieder3_300 = 'ReneBieder300';
export const ReneBieder3_400 = 'ReneBieder400';
export const ReneBieder3_700 = 'ReneBieder700';
export const ReneBieder3_900 = 'ReneBieder900';

const ReneBieder3_300value = {
  src: 'url("./RBNo3.1-Light.otf") format("opentype")',
  fontWeight: 300,
};

globalFontFace(ReneBieder3_300, ReneBieder3_300value);

const ReneBieder3_400value = {
  src: 'url("./RBNo3.1-Book.otf") format("opentype")',
  fontWeight: 400,
};

globalFontFace(ReneBieder3_400, ReneBieder3_400value);

const ReneBieder3_700value = {
  src: 'url("./RBNo3.1-Bold.otf") format("opentype")',
  fontWeight: 700,
};

globalFontFace(ReneBieder3_700, ReneBieder3_700value);

const ReneBieder3_900value = {
  src: 'url("./RBNo3.1-Black.otf") format("opentype")',
  fontWeight: 900,
};

globalFontFace(ReneBieder3_900, ReneBieder3_900value);

export const ReneBieder3 = fontFace([
  ReneBieder3_300value,
  ReneBieder3_400value,
  ReneBieder3_700value,
  ReneBieder3_900value,
]);
