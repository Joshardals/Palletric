// "use client";
// import { ColorTilesProps } from "@/typings";
// import { useState } from "react";
// import tinycolor from "tinycolor2";

// export default function ColorTiles({
//   color,
//   brightness,
//   saturation,
//   hue,
//   index,
// }: ColorTilesProps) {
//   const [colorInfo, setColorInfo] = useState(false);
//   const style = {
//     background: `${color}`,
//     filter: `brightness(${brightness}%) saturate(${saturation}%) hue-rotate(${hue}deg)`,
//   };

//   // Function to compute RGB color based on filter values
//   const computeRGBColor = (): string => {
//     const baseColor = tinycolor(color);
//     const modifiedColor = baseColor
//       .brighten(brightness / 100)
//       .saturate(saturation / 100)
//       .spin(hue);

//     // Extract RGB values and convert to hex
//     const rgbColor = modifiedColor.toRgb();
//     const hexColor = tinycolor({
//       r: rgbColor.r,
//       g: rgbColor.g,
//       b: rgbColor.b,
//     }).toHex();

//     return hexColor;
//   };

//   // Get the computed hex color
//   const computedColor = computeRGBColor();

//   const setRgbColor = () => {
//     const color = tinycolor(computedColor);
//     const rgbValues = color.toRgb();

//     return rgbValues;
//   };

//   const { r, g, b } = setRgbColor();
//   return (
//     <div
//       className="rounded-md max-sm:h-[5rem] h-[10rem] relative"
//       onMouseEnter={() => setColorInfo(true)}
//       onMouseLeave={() => setColorInfo(false)}
//     >
//       <div
//         className="rounded-md bg-gray-900 h-full flex flex-col p-1 border border-gray-800
//       "
//       >
//         <div
//           className={` rounded-md flex-1 animateTiles relative`}
//           style={style}
//         />
//         <div className="text-center p-1 uppercase">#{computedColor}</div>
//       </div>

//       <div
//         className={`absolute top-0 right-0 bg-gray-800 rounded-tr-lg rounded-bl-lg p-1 text-center transition-opacity duration-500 ease-in-out
//           opacity-0 pointer-events-none ${
//             colorInfo && "opacity-100 pointer-events-auto"
//           }
//         `}
//       >
//         <p className="text-xs">{`rgb (${r}, ${g}, ${b})`}</p>
//       </div>
//     </div>
//   );
// }
