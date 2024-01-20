"use client";

import {
  usePaletteStore,
  useSearchLoading,
  useSearchPlace,
} from "@/lib/store/store";
import { Icons } from "../icons";
import { useEffect } from "react";
import { getLocationCoordinates } from "@/lib/hooks";
import { createColorPalette } from "@/lib/utils";

export default function SearchPlace() {
  const { loadingSearch, updateLoadingSearch } = useSearchLoading();
  const { place } = useSearchPlace();
  const { updatePalette } = usePaletteStore();

  const handleSearch = async () => {
    const res = await getLocationCoordinates(place);
    const { lat, lon }: any = res;
    const resPalette = createColorPalette(lat, lon);
    updatePalette(resPalette);
  };
  return (
    <div
      className="relative bg-gray-700  p-[0.1rem] rounded-md cursor-pointer
      transitionAll mx-5 "
    >
      <button
        type="button"
        className={` bg-gray-800 px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full
            transitionAll ${loadingSearch && "animate-pulse"}
        `}
        onClick={handleSearch}
      >
        {loadingSearch ? (
          <div className="space-x-2 justify-centered">
            <Icons.spinner className=" text-[#F59E0B] animate-spin h-5 w-5" />
            <p> Locating you...</p>
          </div>
        ) : (
          <div className="space-x-2 justify-centered">
            <p> Search Place</p>
          </div>
        )}
      </button>
    </div>
  );
}
