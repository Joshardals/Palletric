"use client";

import { getRGBCode } from "@/lib/utils";

export default function ColorTiles({
  color,
  brightness,
  saturation,
  hue,
}: {
  color: string;
  brightness: number;
  saturation: number;
  hue: number;
}) {
  const style = {
    filter: `brightness(${brightness}%) saturate(${saturation}%) hue-rotate(${hue}deg)`,
  };

  return (
    <div className={`rounded-md max-sm:h-[5rem] h-[10rem] cursor-pointer`}>
      <div
        className="rounded-md bg-gray-900 h-full flex flex-col p-1 border border-gray-800
      "
      >
        <div
          className={` ${color} rounded-md flex-1 animateTiles relative`}
          style={style}
        />
        <div className="text-center p-1">
          RGB:{getRGBCode(color, brightness, saturation, hue)}
        </div>
      </div>
      {/* Where I will display the color codes on mobile devices */}
    </div>
  );
}
