"use client";
import ColorTiles from "@/components/shared/ColorTiles";
import Palettes from "@/components/shared/Palettes";
import SearchContainer from "@/components/shared/SearchItem";
import { useLocationLoading, useSearchStore } from "@/lib/store/store";
import { KeyboardEvent, TouchEvent, useEffect, useRef } from "react";

export default function Home() {
  const { updateSearch } = useSearchStore();
  const { loadingLoc } = useLocationLoading();

  // Event Listeners for ctrl + k and esc button -- START.

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        updateSearch(true);
      }

      // Well now, ctrl + k closes the search container as well. Check the SearchContainer component.

      if (e.key === "Escape" && !loadingLoc) {
        updateSearch(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown as any);

    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [loadingLoc]);

  // Event Listeners for ctrl + k and esc button -- END.

  return (
    <main className="hfPadding">
      <div className="sm:px-20 flex flex-col space-y-6 items-center justify-center">
        <h1 className="h1-bold">Palettes</h1>
        <Palettes />
        <SearchContainer />
      </div>
    </main>
  );
}
