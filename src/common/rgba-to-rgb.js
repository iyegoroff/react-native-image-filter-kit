import invariant from 'fbjs/lib/invariant';

export default (background, color) => {
  const b = background.match(/rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/);
  const c = color.match(/rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([0-1](?:\.\d+)?)\)/);
  invariant(b != null, `ImageFilter: background should be in 'rgb(r, g, b)' format.`);
  invariant(c != null, `ImageFilter: color should be in 'rgba(r, g, b, a)' format.`);

  const [, bRed, bGreen, bBlue] = b;
  const [, cRed, cGreen, cBlue, cAlpha] = c;

  const red = (1 - cAlpha) * bRed + cAlpha * cRed;
  const green = (1 - cAlpha) * bGreen + cAlpha * cGreen;
  const blue = (1 - cAlpha) * bBlue + cAlpha * cBlue;

  return `rgb(${red}, ${green}, ${blue})`;
};
