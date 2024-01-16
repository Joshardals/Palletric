// Helper function to convert RGB values to hex
export function getRGBCode(
  color: string,
  brightness: number,
  saturation: number,
  hue: number
) {
  // Assuming color is in the format 'bg-red-500'
  const rgbValues = color.match(/\d+/g);

  if (rgbValues && rgbValues.length >= 3) {
    const [redStr, greenStr, blueStr] = rgbValues;
    const red = parseInt(redStr, 10);
    const green = parseInt(greenStr, 10);
    const blue = parseInt(blueStr, 10);

    const adjustedBrightness = brightness / 100;
    const adjustedSaturation = saturation / 100;

    // Apply brightness and saturation adjustments
    const adjustedRed = Math.round(
      red * adjustedBrightness + (1 - adjustedBrightness) * 255
    );
    const adjustedGreen = Math.round(
      green * adjustedBrightness + (1 - adjustedBrightness) * 255
    );
    const adjustedBlue = Math.round(
      blue * adjustedBrightness + (1 - adjustedBrightness) * 255
    );

    // Apply saturation adjustment
    const desaturatedRed =
      adjustedRed * (1 - adjustedSaturation) + 255 * adjustedSaturation;
    const desaturatedGreen =
      adjustedGreen * (1 - adjustedSaturation) + 255 * adjustedSaturation;
    const desaturatedBlue =
      adjustedBlue * (1 - adjustedSaturation) + 255 * adjustedSaturation;

    // Apply hue adjustment
    const hueRadians = (hue / 360) * Math.PI * 2;
    const rotatedRed =
      Math.cos(hueRadians) * desaturatedRed -
      Math.sin(hueRadians) * desaturatedGreen;
    const rotatedGreen =
      Math.sin(hueRadians) * desaturatedRed +
      Math.cos(hueRadians) * desaturatedGreen;
    const rotatedBlue = desaturatedBlue;

    // Ensure values are within valid RGB range
    const finalRed = Math.min(255, Math.max(0, rotatedRed));
    const finalGreen = Math.min(255, Math.max(0, rotatedGreen));
    const finalBlue = Math.min(255, Math.max(0, rotatedBlue));

    // Convert RGB to hex
    const hexCode = `#${Math.round(finalRed).toString(16)}${Math.round(
      finalGreen
    ).toString(16)}${Math.round(finalBlue).toString(16)}`;

    return hexCode.toUpperCase();
  }

  return "";
}
