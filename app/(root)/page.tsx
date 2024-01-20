"use client";
import ColorTiles from "@/components/shared/ColorTiles";
import Palettes from "@/components/shared/Palettes";
import SearchContainer from "@/components/shared/SearchItem";
import {
  useLocationLoading,
  useSearchLoading,
  useSearchStore,
} from "@/lib/store/store";
import { KeyboardEvent, TouchEvent, useEffect, useRef } from "react";

export default function Home() {
  const { updateSearch } = useSearchStore();
  const { loadingLoc } = useLocationLoading();
  const { loadingSearch } = useSearchLoading();

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
      } else if (e.key === "Escape" && !loadingSearch) {
        updateSearch(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown as any);

    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [loadingLoc, loadingSearch]);

  // Event Listeners for ctrl + k and esc button -- END.

  return (
    <main className="hfPadding">
      <div className=" flex flex-col items-center justify-center">
        <Palettes />
        <SearchContainer />
      </div>
    </main>
  );
}
