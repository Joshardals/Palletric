import chroma from "chroma-js";

// Function to interpolate between two colors
function interpolateColor(color1: any, color2: any, factor: any) {
  return chroma.mix(color1, color2, factor, "lch").hex();
}

export function createColorPalette(latitude: number, longitude: number) {
  // Normalize latitude to the range [-90, 90]
  const normalizedLatitude = Math.max(-90, Math.min(90, latitude));

  // Calculate a factor based on latitude for color transition
  const colorFactor = (normalizedLatitude + 90) / 180;

  // Define base colors for the gradient dynamically based on latitude
  const baseColors = chroma
    .scale(["#66a3ff", "#ff9900", "#cc6600", "#66a3ff", "#3366ff", "#ffcc66", "#ff9900", "#cc6600",
    "#ff6666", "#ff3366", "#cc0066", "#9900cc", "#66ff66",
    "#33cc33", "#99cc00", "#ffff66", "#ffcc00", "#ff5050",
    "#ff3399", "#cc99ff", "#9966cc", "#ff9933", "#ff6600",
    "#993300", "#669999", "#cc9999", "#999999", "#666666"])
    .mode("lch")
    .colors(25);

  // Calculate the number of colors in the palette
  const numColors = 6;

  // Calculate the index of the base color based on the color factor
  const baseColorIndex = Math.floor(colorFactor * (baseColors.length - 1));

  // Handle edge cases to ensure the index doesn't go out of bounds
  const color1Index = Math.max(0, baseColorIndex);
  const color2Index = Math.min(baseColors.length - 1, baseColorIndex + 1);

  // Get the two adjacent base colors for interpolation
  const color1 = baseColors[color1Index];
  const color2 = baseColors[color2Index];

  // Generate the color palette by interpolating between the two base colors
  const colorPalette = Array.from({ length: numColors }, (_, index) =>
    interpolateColor(color1, color2, index / (numColors - 1))
  );

  return colorPalette;
}
