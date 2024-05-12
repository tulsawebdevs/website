import { style } from '@vanilla-extract/css';
import { colors, font } from '../../design/tokens.css.ts';

export const signIn = style({
  textShadow: `
  1px 1px 0 #000, 
  -1px 1px 0 #000,
  -1px -1px 0 #000,
  1px -1px 0 #000
  `,
  background: 'transparent',
  fontSize: 'inherit',
  padding: '.3rem',
  alignSelf: 'center',
  ':hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'currentColor',
  },
});

export const nav = style({
  fontFamily: font.ReneBieder2,
  fontSize: '1.5rem',
  maxWidth: '800px',
  margin: 'auto',
  alignSelf: 'center',
  justifySelf: 'center',
  zIndex: 50,
  position: 'sticky',
  top: 0,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: colors['twd-blue-500'],
  paddingTop: '.5rem',
  paddingBottom: '.5rem',
  paddingLeft: '35px',
  paddingRight: '35px',
  color: colors.white,
  textShadow: `
  1px 1px 0 #000, 
  -1px 1px 0 #000,
  -1px -1px 0 #000,
  1px -1px 0 #000`,
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
});
