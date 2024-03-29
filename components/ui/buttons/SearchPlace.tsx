"use client";

import {
  usePaletteStore,
  useSearchLoading,
  useSearchPlace,
  useSearchPlaceError,
  useSearchStore,
} from "@/lib/store/store";
import { Icons } from "../icons";
import { useEffect, useState } from "react";
import { getLocationCoordinates } from "@/lib/hooks";
import { createColorPalette } from "@/lib/utils";

export default function SearchPlace() {
  const { loadingSearch, updateLoadingSearch } = useSearchLoading();
  const { place, setPlace } = useSearchPlace();
  const { updateSearch } = useSearchStore();
  const { updatePalette } = usePaletteStore();
  const { error, updateError } = useSearchPlaceError();

  const handleSearch = async () => {
    try {
      updateLoadingSearch(true);
      setTimeout(async () => {
        const res = await getLocationCoordinates(place);
        const { lat, lon }: any = res;
        const resPalette = createColorPalette(lat, lon);
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);

        if (error) {
          updateError(false);
        }

        updateLoadingSearch(false);
        updatePalette(resPalette);
        updateSearch(false);
        setPlace("");
      }, 5000);
    } catch (error: any) {
      updateError(true);
    }
  };
  return (
    <div
      className={`relative bg-gray-700  p-[0.1rem] rounded-md cursor-pointer
       transition-opacity mx-5 ${!place && "opacity-50"} `}
    >
      <button
        type="button"
        className={` bg-gray-800 px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full
            transitionAll
        `}
        onClick={handleSearch}
      >
        {loadingSearch ? (
          <div className="space-x-2 justify-centered">
            <Icons.spinner className="animate-spin h-5 w-5" />
            <p>Searching...</p>
          </div>
        ) : (
          <div className="space-x-2 justify-centered">
            <p> Search Place</p>
          </div>
        )}
      </button>

      {!place && (
        <div
          className={`absolute top-0 left-0 w-full h-full rounded-md ${
            !place && "cursor-not-allowed"
          }`}
        />
      )}
    </div>
  );
}
