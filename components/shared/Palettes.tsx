"use client";
import { useBrightness, useHue, useSaturation } from "@/lib/store/store";
import ColorControls from "./ColorControls";
import ColorTiles from "./ColorTiles";
import { useState } from "react";
import Draggable from "react-draggable";

const colors = [
  { id: 1, color: "#9A4DFF" },
  { id: 2, color: "#F27300" },
  { id: 3, color: "#5AC8FA" },
  { id: 4, color: "#FFD700" },
  { id: 5, color: "#4CAF50" },
  { id: 6, color: "#FF4081" },
];

export default function Palettes() {
  const { brightness } = useBrightness();
  const { saturation } = useSaturation();
  const { hue } = useHue();
  const [palette, setPalette] = useState(colors);

  const moveTile = (fromIndex: any, toIndex: any) => {
    const updatedPalette = [...palette];
    const [movedTile] = updatedPalette.splice(fromIndex, 1);
    updatedPalette.splice(toIndex, 0, movedTile);

    setPalette(updatedPalette);
  };

  const refreshPalette = () => {
    setPalette(colors);
  };

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
        {palette.map((color, index) => (
          <Draggable
            key={color.id}
            onStop={(e, data) => moveTile(index, Math.round(data.y / 80))}
          >
            <div>
              <ColorTiles
                key={color.color}
                color={color.color}
                brightness={brightness}
                saturation={saturation}
                hue={hue}
              />
            </div>
          </Draggable>
        ))}
      </div>

      <button onClick={refreshPalette}>Refresh Palette</button>

      <ColorControls />
    </section>
  );
}
