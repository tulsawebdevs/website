const twdBlue = {
  '$twd-blue-100': '#bfe0f8',
  '$twd-blue-200': '#86c7f3',
  '$twd-blue-300': '#46aaea',
  '$twd-blue-400': '#1d8fda',
  '$twd-blue-500': '#1072ba',
  '$twd-blue-600': '#0e5b96',
  '$twd-blue-700': '#104d7c',
  '$twd-blue-800': '#134167',
  '$twd-blue-900': '#0d2944',
} as const;

const twdGray = {
  '$twd-gray-100': '#eceef2',
  '$twd-gray-200': '#d5dae2',
  '$twd-gray-300': '#b0b9c9',
  '$twd-gray-400': '#8593ab',
  '$twd-gray-500': '#667691',
  '$twd-gray-600': '#515f78',
  '$twd-gray-700': '#434d61',
  '$twd-gray-800': '#3a4252',
  '$twd-gray-900': '#343a46',
} as const;

export default {
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',
  black: '#13151a',
  white: '#f1f8fe',
  ...twdBlue,
  ...twdGray,
} as const;
