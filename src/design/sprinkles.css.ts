import { defineProperties, createRainbowSprinkles } from 'rainbow-sprinkles';
import { space, colors, radius, size, fontSize, font } from './tokens.css.ts';

const typographicProperties = defineProperties({
  conditions: {
    mobile: {},
    desktop: { '@media': 'screen and (min-width: 1000px)' },
  },
  defaultCondition: 'mobile',
  dynamicProperties: {
    font,
    fontSize,
    lineHeight: size,
    fontFamily: font,
    letterSpacing: size,
    fontStyle: { normal: 'normal', italic: 'italic' },
    fontWeight: { light: '300', regular: '400', bold: '700', black: '900' },
    textAlign: { left: 'left', right: 'right', center: 'center' },
    verticalAlign: { top: 'top', middle: 'middle', bottom: 'bottom' },
    textOverflow: { ellipsis: 'ellipsis', clip: 'clip' },
    textWrap: { wrap: 'wrap', nowrap: 'nowrap', balance: 'balance' },
    whiteSpaceCollapse: {
      collapse: 'collapse',
      preserve: 'preserve',
      preserveBreaks: 'preserve-breaks',
      preserveSpaces: 'preserve-spaces',
      breakSpaces: 'break-spaces',
    },
    textDecoration: {
      none: 'none',
      underline: 'underline',
      'line-through': 'line-through',
      'spelling-error': 'spelling-error',
      'grammar-error': 'grammar-error',
    },
  },
});

const interactivityProperties = defineProperties({
  dynamicProperties: {
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      grab: 'grab',
      grabbing: 'grabbing',
      zoomIn: 'zoom-in',
      zoomOut: 'zoom-out',
      none: 'none',
    },
    touchAction: {
      auto: 'auto',
      none: 'none',
      panX: 'pan-x',
      panY: 'pan-y',
      pinchZoom: 'pinch-zoom',
    },
    userSelect: {
      none: 'none',
      text: 'text',
    },
    pointerEvents: {
      none: 'none',
      auto: 'auto',
    },
  },
});

const visibilityProperties = defineProperties({
  dynamicProperties: {
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      15: '0.15',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      85: '0.85',
      90: '0.9',
      95: '0.95',
      100: '1',
    },
    visibility: { visible: 'visible', hidden: 'hidden' },
    clip: {
      auto: 'auto',
      text: 'text',
      border: 'border',
      padding: 'padding',
      content: 'content',
    },
    overflowX: {
      auto: 'auto',
      hidden: 'hidden',
      visible: 'visible',
      scroll: 'scroll',
    },
    overflowY: {
      auto: 'auto',
      hidden: 'hidden',
      visible: 'visible',
      scroll: 'scroll',
    },
  },
});

const perimeterProperties = defineProperties({
  dynamicProperties: {
    borderTopWidth: size,
    borderBottomWidth: size,
    borderLeftWidth: size,
    borderRightWidth: size,
    borderTopRadius: radius,
    borderBottomRadius: radius,
    borderLeftRadius: radius,
    borderRightRadius: radius,
    outlineOffset: size,
    outlineWidth: size,
    outlineStyle: {
      solid: 'solid',
      dashed: 'dashed',
      dotted: 'dotted',
      double: 'double',
      groove: 'groove',
      ridge: 'ridge',
      inset: 'inset',
      outset: 'outset',
      none: 'none',
    },
    shadowBlurRadius: size,
    shadowSpreadRadius: size,
    shadowOffsetX: size,
    shadowOffsetY: size,
  },
  shorthands: {
    borderWidthVertical: ['borderTopWidth', 'borderBottomWidth'],
    borderWidthHorizontal: ['borderLeftWidth', 'borderRightWidth'],
    borderWidth: [
      'borderTopWidth',
      'borderBottomWidth',
      'borderLeftWidth',
      'borderRightWidth',
    ],
    borderRadiusVertical: ['borderTopRadius', 'borderBottomRadius'],
    borderRadius: [
      'borderTopRadius',
      'borderBottomRadius',
      'borderLeftRadius',
      'borderRightRadius',
    ],
    outline: ['outlineWidth', 'outlineStyle'],
    shadow: [
      'shadowOffsetX',
      'shadowOffsetY',
      'shadowBlurRadius',
      'shadowSpreadRadius',
    ],
  },
});

const dimensionalProperties = defineProperties({
  conditions: {
    mobile: {},
    mobileLg: { '@media': 'screen and (min-width: 500px)' },
    tablet: { '@media': 'screen and (min-width: 700px)' },
    desktop: { '@media': 'screen and (min-width: 1000px)' },
    desktopLg: { '@media': 'screen and (min-width: 1200px)' },
  },
  defaultCondition: 'mobile',
  dynamicProperties: {
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    rowGap: space,
    columnGap: space,
    width: size,
    height: size,
    maxWidth: size,
    maxHeight: size,
    minWidth: size,
    minHeight: size,
    aspectRatio: { square: '1 / 1', '16/9': '16 / 9', '4/3': '4 / 3' },
    display: {
      block: 'block',
      flex: 'flex',
      inlineBlock: 'inline-block',
      inlineFlex: 'inline-flex',
    },
    flexDirection: { row: 'row', column: 'column' },
    flexWrap: { wrap: 'wrap', nowrap: 'nowrap' },
    position: {
      relative: 'relative',
      absolute: 'absolute',
      fixed: 'fixed',
      sticky: 'sticky',
    },
    top: true,
    left: true,
    right: true,
    bottom: true,
    zIndex: true,
    alignContent: {
      stretch: 'stretch',
      center: 'center',
      flexStart: 'flex-start',
      flexEnd: 'flex-end',
      spaceAround: 'space-around',
      spaceBetween: 'space-between',
      spaceEvenly: 'space-evenly',
    },
    justifyContent: {
      stretch: 'stretch',
      center: 'center',
      flexStart: 'flex-start',
      flexEnd: 'flex-end',
      spaceAround: 'space-around',
      spaceBetween: 'space-between',
      spaceEvenly: 'space-evenly',
    },
    alignItems: {
      stretch: 'stretch',
      center: 'center',
      flexStart: 'flex-start',
      flexEnd: 'flex-end',
    },
    justifyItems: {
      stretch: 'stretch',
      center: 'center',
      flexStart: 'flex-start',
      flexEnd: 'flex-end',
    },
    alignSelf: {
      stretch: 'stretch',
      center: 'center',
      flexStart: 'flex-start',
      flexEnd: 'flex-end',
    },
    justifySelf: {
      stretch: 'stretch',
      center: 'center',
      flexStart: 'flex-start',
      flexEnd: 'flex-end',
    },
  },
  shorthands: {
    gap: ['rowGap', 'columnGap'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    placeItems: ['justifyContent', 'alignItems'],
    placeContent: ['justifyContent', 'alignContent'],
    placeSelf: ['justifySelf', 'alignSelf'],
  },
});

const colorProperties = defineProperties({
  conditions: {
    darkMode: {},
    lightMode: { '@media': '(prefers-color-scheme: light)' },
  },
  defaultCondition: 'darkMode',
  dynamicProperties: {
    placeholderColor: colors,
    color: colors,
    colorFocus: colors,
    colorHover: colors,
    colorPress: colors,
    colorStrong: colors,
    colorTransparent: colors,
    colorDisabled: colors,
    backgroundColor: colors,
    backgroundColorFocus: colors,
    backgroundColorHover: colors,
    backgroundColorPress: colors,
    backgroundColorStrong: colors,
    backgroundColorTransparent: colors,
    backgroundColorDisabled: colors,
    borderColor: colors,
    borderColorFocus: colors,
    borderColorHover: colors,
    borderColorPress: colors,
    borderColorStrong: colors,
    borderColorTransparent: colors,
    borderColorDisabled: colors,
    shadowColor: colors,
    shadowColorFocus: colors,
    shadowColorHover: colors,
    shadowColorPress: colors,
    shadowColorStrong: colors,
    shadowColorTransparent: colors,
    shadowColorDisabled: colors,
    outlineColor: colors,
    outlineColorFocus: colors,
    outlineColorHover: colors,
    outlineColorPress: colors,
    outlineColorStrong: colors,
    outlineColorTransparent: colors,
    outlineColorDisabled: colors,
  },
});

/**
 * Rainbow Sprinkles
 * @see https://github.com/wayfair/rainbow-sprinkles
 */
export const sprinkles = createRainbowSprinkles(
  colorProperties,
  dimensionalProperties,
  typographicProperties,
  perimeterProperties,
  visibilityProperties,
  interactivityProperties,
);

// It's a good idea to export the Sprinkles type too
/**
 * Rainbow Sprinkles
 * @see https://github.com/wayfair/rainbow-sprinkles
 */
export type Sprinkles = Parameters<typeof sprinkles>[0];
