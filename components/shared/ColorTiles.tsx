"use client";
import { ColorTilesProps } from "@/typings";
import tinycolor from "tinycolor2";

export default function ColorTiles({
  color,
  brightness,
  saturation,
  hue,
}: ColorTilesProps) {
  const style = {
    background: `${color}`,
    filter: `brightness(${brightness}%) saturate(${saturation}%) hue-rotate(${hue}deg)`,
  };

  // Function to compute RGB color based on filter values
  const computeRGBColor = (): string => {
    const baseColor = tinycolor(color);
    const modifiedColor = baseColor
      .brighten(brightness / 100)
      .saturate(saturation / 100)
      .spin(hue);

    // Extract RGB values and convert to hex
    const rgbColor = modifiedColor.toRgb();
    const hexColor = tinycolor({
      r: rgbColor.r,
      g: rgbColor.g,
      b: rgbColor.b,
    }).toHex();

    return hexColor;
  };

  // Get the computed hex color
  const computedColor = computeRGBColor();

  return (
    <div className={`rounded-md max-sm:h-[5rem] h-[10rem] cursor-pointer`}>
      <div
        className="rounded-md bg-gray-900 h-full flex flex-col p-1 border border-gray-800
      "
      >
        <div
          className={` rounded-md flex-1 animateTiles relative`}
          style={style}
        />
        <div className="text-center p-1">#{computedColor}</div>
      </div>
      {/* Where I will display the color codes on mobile devices */}
    </div>
  );
}
