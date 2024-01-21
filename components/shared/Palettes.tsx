"use client";
import {
  useBrightness,
  useHue,
  usePaletteStore,
  useSaturation,
} from "@/lib/store/store";
import ColorControls from "./ColorControls";
import ColorTiles from "./ColorTiles";
import Skeleton from "react-loading-skeleton";

export default function Palettes() {
  const { brightness } = useBrightness();
  const { saturation } = useSaturation();
  const { hue } = useHue();
  const { palette } = usePaletteStore();

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

      {palette.length > 0 ? (
        <div className="space-y-10">
          <div className=" grid grid-cols-6 gap-8 max-md:grid-cols-2 content-center">
            {palette.map((color, index) => (
              <ColorTiles
                key={index}
                id={index}
                color={color}
                brightness={brightness}
                saturation={saturation}
                hue={hue}
                index={index}
              />
            ))}
          </div>

          <ColorControls />
        </div>
      ) : (
        <div className=" grid grid-cols-6 gap-8 max-md:grid-cols-2 content-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              baseColor="#1a202c"
              highlightColor="#2d3748"
              className=" max-sm:h-[5rem] h-[10rem] rounded-md"
            />
          ))}
        </div>
      )}
    </section>
  );
}
