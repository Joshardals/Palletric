"use client";
import { useBrightness, useHue, useSaturation } from "@/lib/store/store";
import ColorControls from "./ColorControls";
import ColorTiles from "./ColorTiles";

const colors = [
  { color: "bg-red-500" },
  { color: "bg-blue-500" },
  { color: "bg-yellow-500" },
  { color: "bg-black" },
  { color: "bg-purple-500" },
  { color: "bg-yellow-800" },
];

export default function Palettes() {
  const { brightness } = useBrightness();
  const { saturation } = useSaturation();
  const { hue } = useHue();
  return (
    <section className="w-full space-y-10">
      {/* Options inlcudes: Color Palettes, Inspired Palettes, Explore Hues, Location-Inspired Palettes */}
      <div className="space-y-2">
        <h1 className="h1-bold text-center font-bold">Explore Your Palette</h1>
        {/* I might consider tweaking this subtitle, by animating others in I guess
          Sub-heading:
          Inspired by Nature's Colors., Local Hues, Global Inspiration, Palette Inspiration Awaits, From Location to Color Symphony
        */}
        <p className="capitalize text-center">Your location, your palette</p>
      </div>
      <div className=" grid grid-cols-6 gap-8 max-md:grid-cols-2 content-center">
        {colors.map((color) => (
          <ColorTiles
            key={color.color}
            color={color.color}
            brightness={brightness}
            saturation={saturation}
            hue={hue}
          />
        ))}
      </div>

      <ColorControls />
    </section>
  );
}
