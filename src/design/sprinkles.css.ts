import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import space from './tokens/space.css.ts';
import colors from './tokens/colors.css.ts';
import radius from './tokens/radius.css.ts';
import size from './tokens/size.css.ts';

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    mobileLg: { '@media': 'screen and (min-width: 500px)' },
    tablet: { '@media': 'screen and (min-width: 700px)' },
    desktop: { '@media': 'screen and (min-width: 1000px)' },
    desktopLg: { '@media': 'screen and (min-width: 1200px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'block', 'inline'],
    flexDirection: ['row', 'column'],
    flexWrap: ['wrap', 'nowrap'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    borderStyle: ['solid', 'inset', 'outset', 'dotted', 'dashed', 'none'],
    borderWidth: ['thin', 'thick', 'medium', 'unset'],
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    rowGap: space,
    columnGap: space,
    borderRadius: radius,
    width: size,
    height: size,
    maxWidth: size,
    maxHeight: size,
    minWidth: size,
    minHeight: size,
  },
  shorthands: {
    gap: ['rowGap', 'columnGap'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    placeItems: ['justifyContent', 'alignItems'],
  },
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: { '@media': '(prefers-color-scheme: light)' },
    darkMode: {},
  },
  defaultCondition: 'darkMode',
  properties: {
    color: colors,
    background: colors,
    borderColor: colors,
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0];
