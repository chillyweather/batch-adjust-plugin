import { RGBToHSL } from "./rgbToHsl";

export function colorAdjustmentCore(
  color: any,
  hueShift: number = 0,
  saturationShift: number = 0,
  lightnessShift: number = 0
) {
  const solidPaint = figma.util.solidPaint;
  const hsl = (h: number, s: number, l: number, a: number = 100) =>
    `hsl(${h} ${s}% ${l}% / ${a}%)`;

  const hslColor = RGBToHSL(color.r, color.g, color.b);
  const h = hslColor[0];
  const s = hslColor[1];
  const l = hslColor[2];

  const newHue = h + hueShift > 360 ? h + hueShift - 360 : h + hueShift;
  const newSaturation = s + saturationShift > 100 ? 100 : s + saturationShift;
  const newLightness = l + lightnessShift > 100 ? 100 : l + lightnessShift;

  const newRGB = solidPaint(hsl(newHue, newSaturation, newLightness));
  return newRGB;
}

export function colorAdjustmentUI(
  color: any,
  hueShift: number = 0,
  saturationShift: number = 0,
  lightnessShift: number = 0
) {
  const rgba = figma.util.rgba;
  const hsl = (h: number, s: number, l: number, a: number = 100) =>
    `hsl(${h} ${s}% ${l}% / ${a}%)`;

  const hslColor = RGBToHSL(color.r, color.g, color.b);
  const h = Math.round(hslColor[0]);
  const s = Math.round(hslColor[1]);
  const l = Math.round(hslColor[2]);

  const newHue = h + hueShift > 360 ? h + hueShift - 360 : h + hueShift;
  const newSaturation = s + saturationShift > 100 ? 100 : s + saturationShift;
  const newLightness = l + lightnessShift > 100 ? 100 : l + lightnessShift;

  const newRGB = rgba(hsl(newHue, newSaturation, newLightness));
  return newRGB;
}
