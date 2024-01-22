import chroma from "chroma-js";

export function createColorPalette(latitude: number, longitude: number) {
  // Calculate a factor based on latitude for color transition
  const colorFactor = (latitude + 90) / 180;

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
    "#00cc99", // Teal
    "#ffcc99", // Peach
    "#6600cc", // Deep purple
    "#ff99cc", // Light pink
    "#00ccff", // Sky blue
    "#ccff99", // Mint
    "#996600", // Olive
    "#ff0066", // Magenta
    "#660066", // Dark magenta
    "#ff6699", // Light rose
    "#0099cc", // Steel blue
    "#ffccff", // Pale pink
    "#99ff99", // Light mint
    "#ccffcc", // Lightest mint
    "#cc66cc", // Medium purple
    "#66cc66", // Medium green
    "#cccc00", // Dark yellow
    "#ff9900", // Tangerine
    "#993333", // Dark brick
    "#ffcc33", // Light mustard
    "#cc3300", // Rust
    "#ff9933", // Apricot
    "#009966", // Dark teal
    "#993366", // Deep rose
  ];

  // Calculate the number of colors in the palette
  const numColors = 6;

  // Calculate the index of the base color based on the color factor
  const baseColorIndex = Math.floor(colorFactor * (baseColors.length - 1));

  // Get the two adjacent base colors for interpolation
  const color1 = baseColors[baseColorIndex];
  const color2 = baseColors[baseColorIndex + 2];

  // Create a chroma scale for interpolation
  const colorScale = chroma.scale([color1, color2]).mode("lch");

  // Generate the color palette by interpolating between the two base colors
  const colorPalette = Array.from({ length: numColors }, (_, index) =>
    colorScale(index / (numColors - 1)).hex()
  );

  return colorPalette;
}
