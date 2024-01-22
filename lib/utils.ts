import chroma from "chroma-js";

export function createColorPalette(latitude: number, longitude: number) {
  // Normalize latitude to the range [-90, 90]
  const normalizedLatitude = Math.max(-90, Math.min(90, latitude));

  // Calculate a factor based on latitude for color transition
  const colorFactor = (normalizedLatitude + 90) / 180;

  // Define base colors for the gradient
  const baseColors = [
    "#66a3ff", // Light blue
    "#3366ff", // Blue
    "#ffcc66", // Light orange
    "#ff9900", // Orange
    "#cc6600", // Brown
    "#ff6666", // Light red
    "#ff3366", // Red
    "#cc0066", // Purple
    "#9900cc", // Dark purple
    "#66ff66", // Light green
    "#33cc33", // Green
    "#99cc00", // Lime green
    "#ffff66", // Yellow
    "#ffcc00", // Gold
    "#ff5050", // Salmon
    "#ff3399", // Pink
    "#cc99ff", // Lavender
    "#9966cc", // Dark lavender
    "#ff9933", // Apricot
    "#ff6600", // Dark orange
    "#993300", // Dark brown
    "#669999", // Grayish blue
    "#cc9999", // Light gray
    "#999999", // Gray
    "#666666", // Dark gray
  ];

  // Calculate the number of colors in the palette
  const numColors = 6;

  // Calculate the index of the base color based on the color factor
  const baseColorIndex = Math.floor(colorFactor * (baseColors.length - 1));

  // Get the two adjacent base colors for interpolation
  const color1 = baseColors[baseColorIndex];
  const color2 = baseColors[baseColorIndex + 10];

  // Create a chroma scale for interpolation
  const colorScale = chroma.scale([color1, color2]).mode("lch");

  // Generate the color palette by interpolating between the two base colors
  const colorPalette = Array.from({ length: numColors }, (_, index) =>
    colorScale(index / (numColors - 1)).hex()
  );

  return colorPalette;
}
