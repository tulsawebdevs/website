import { style } from '@vanilla-extract/css';

export const signInButton = style({
  textShadow: `
    1px 1px 0 #000, 
    -1px 1px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000
  `,
});
