const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const bgColors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
]

export const textColors = [
  '#ffffff',
  '#000000',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#00ffff',
  '#ff00ff',
  '#c0c0c0',
  '#808080',
  '#800000',
  '#808000',
  '#008000',
  '#800080',
  '#008080',
  '#000080',
]


export const twBgColors = [

  "bg-blue-400",
  "bg-blue-500",
  "bg-blue-600",
  "bg-blue-700",
  "bg-blue-800",
  "bg-blue-900",

  "bg-orange-500",
  "bg-orange-600",
  "bg-orange-700",
  "bg-orange-800",
  "bg-orange-900",

  "bg-green-500",
  "bg-green-600",
  "bg-green-700",
  "bg-green-800",
  "bg-green-900",

  "bg-red-400",
  "bg-red-500",
  "bg-red-600",
  "bg-red-700",
  "bg-red-800",
  "bg-red-900",

  "bg-pink-500",
  "bg-pink-600",
  "bg-pink-700",
  "bg-pink-800",
  "bg-pink-900",

  "bg-purple-500",
  "bg-purple-600",
  "bg-purple-700",
  "bg-purple-800",
  "bg-purple-900",

  "bg-yellow-500",
  "bg-yellow-600",
  "bg-yellow-700",
  "bg-yellow-800",
  "bg-yellow-900"
];


export function randomBgColor() {
  return twBgColors[Math.floor(Math.random() * twBgColors.length)];
}