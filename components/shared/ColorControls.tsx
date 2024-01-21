"use client";

import {
  useBrightness,
  useHue,
  usePaletteStore,
  useSaturation,
} from "@/lib/store/store";
import Slider from "./Slider";
import Skeleton from "react-loading-skeleton";

export default function ColorControls() {
  const { brightness, updateBrightness } = useBrightness();
  const { saturation, updateSaturation } = useSaturation();
  const { hue, updateHue } = useHue();
  const { palette } = usePaletteStore();
  return (
    <div>
      {palette.length > 0 ? (
        <div className="space-y-10">
          <h1 className="h1-bold text-center font-bold ">Color Adjustment</h1>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 sm:*:justify-center">
            <Slider
              label="Brightness"
              value={brightness}
              onChange={(value: number) => updateBrightness(value)}
            />
            <Slider
              label="Saturation"
              value={saturation}
              onChange={(value: number) => updateSaturation(value)}
            />
            <Slider
              label="Hue"
              value={hue}
              onChange={(value: number) => updateHue(value)}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          <h1 className="h1-bold text-center font-bold max-w-[13rem] mx-auto">
            <Skeleton baseColor="#1a202c" highlightColor="#2d3748" />
          </h1>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 sm:*:justify-center">
            <Skeleton baseColor="#1a202c" highlightColor="#2d3748" />
            <Skeleton baseColor="#1a202c" highlightColor="#2d3748" />
            <Skeleton baseColor="#1a202c" highlightColor="#2d3748" />
          </div>
        </div>
      )}
    </div>
  );
}
