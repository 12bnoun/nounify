export const calculateAspectRatioFit = (
  srcWidth,
  srcHeight,
  maxWidth,
  maxHeight
) => {
  return Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
};

// canvas.item(0)

export const ConvertRGBtoHex = (red, green, blue) => {
  return '#' + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
};

const ColorToHex = (color) => {
  let hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? '0' + hexadecimal : hexadecimal;
};
