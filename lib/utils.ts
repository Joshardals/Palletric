import chroma from "chroma-js";
import SunCalc from "suncalc";

// Algorithm to Create Color Palette based on the user's current location.

export function createColorPalette(latitude: number, longitude: number) {
  const colorScale = chroma.scale(["#0000FF", "#FF0000"]);

  // Normalize latitude to the range [-90, 90]
  const normalizedLatitude = Math.max(-90, Math.min(90, latitude));

  // Use normalized latitude to determine the color
  const color = colorScale(normalizedLatitude / 90).hex();

  // Generate a color palette by creating shades of the determined color
  const colorPalette = chroma
    .scale([chroma(color).darken(2), color, chroma(color).brighten(2)])
    .colors(6);

  return colorPalette;
}
