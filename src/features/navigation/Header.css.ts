import { style } from '@vanilla-extract/css';
import { colors } from '../../design/tokens.css.ts';

export const headerNav = style({
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
  paddingLeft: '16px',
  paddingRight: '16px',
  color: colors.black,
});
