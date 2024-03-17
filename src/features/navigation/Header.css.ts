import { style } from '@vanilla-extract/css';
import { colors, font } from '../../design/tokens.css.ts';

export const headerNav = style({
  fontFamily: font.ReneBieder2,
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
  backgroundColor: colors['twd-blue-300'],
  paddingTop: '.5rem',
  paddingBottom: '.5rem',
  paddingLeft: '35px',
  paddingRight: '35px',
  color: colors.black,
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
});
