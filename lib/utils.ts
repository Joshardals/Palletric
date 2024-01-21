import chroma from 'chroma-js';
import seedrandom from 'seedrandom';

export function createColorPalette(latitude: number, longitude: number) {
  // Normalize latitude and longitude
  const normalizedLatitude = Math.max(-90, Math.min(90, latitude));
  const normalizedLongitude = Math.max(-180, Math.min(180, longitude));

  // Use latitude and longitude as seed values for randomness
  const seed = Math.floor(Math.abs(normalizedLatitude) * Math.abs(normalizedLongitude));

  // Set up a random number generator with the seed
  const random = seedrandom(seed.toString());

  // Define the number of colors in the palette
  const numColors = 6;

  // Generate a unique color palette
  const colorPalette = Array.from({ length: numColors }, (_, index) => {
    // Generate a random hue, saturation, and lightness
    const hue = (random() * 360 + index * 60) % 360; // Smooth transitions
    const saturation = random() * 60 + 40; // Vary saturation between 40% and 100%
    const lightness = random() * 40 + 30; // Vary lightness between 30% and 70%

    // Convert to hex using chroma
    return chroma.hsl(hue, saturation, lightness).hex();
  });

  return colorPalette;
}
