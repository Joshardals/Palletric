import chroma from "chroma-js";
import seedrandom from "seedrandom";

export function createColorPalette(latitude: number, longitude: number) {
  // Normalize latitude and longitude
  const normalizedLatitude = Math.max(-90, Math.min(90, latitude));
  const normalizedLongitude = Math.max(-180, Math.min(180, longitude));

  // Use latitude and longitude more directly for color generation
  const baseHue = mapToColorRange(normalizedLatitude, -90, 90, 0, 360);
  const baseSaturation = mapToColorRange(
    normalizedLongitude,
    -180,
    180,
    40,
    100
  );
  const baseLightness = 50; // Adjust as needed

  // Set up a random number generator with latitude and longitude for variation
  const seed = Math.floor(
    Math.abs(normalizedLatitude) * Math.abs(normalizedLongitude)
  );
  const random = seedrandom(seed.toString());

  // Define the number of colors in the palette
  const numColors = 6;

  // Generate a color palette with variations
  const colorPalette = Array.from({ length: numColors }, (_, index) => {
    // Use baseHue and baseSaturation as starting points
    const hue = (baseHue + random() * 60 + index * 20) % 360; // Shift hues slightly
    const saturation = Math.max(
      0,
      Math.min(100, baseSaturation)
    ); // Vary saturation around base
    const lightness = 50; // Keep lightness consistent for better harmony

    // Convert to hex using chroma
    return chroma.hsl(hue, saturation, lightness).hex();
  });

  return colorPalette;
}

function mapToColorRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) {
  const normalizedValue = (value - inputMin) / (inputMax - inputMin);
  return Math.round(outputMin + normalizedValue * (outputMax - outputMin));
}
