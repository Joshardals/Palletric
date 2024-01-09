"use client";
import SearchContainer from "@/components/shared/SearchItem";
import { useSearchStore } from "@/lib/store/store";
import { KeyboardEvent, useEffect } from "react";

export default function Home() {
  const { search, setSearch, updateSearch } = useSearchStore();

  // Event Listeners for ctrl + k and esc button -- START.

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        updateSearch(true);
      }

      // Well now, ctrl + k closes the search container as well. Check the SearchContainer component.

      if (e.key === "Escape") {
        updateSearch(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown as any);

    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, []);

  // Event Listeners for ctrl + k and esc button -- END.

  return (
    <main className="hfPadding h-screen overflow-hidden">
      <div className="px-5">
        <p>What good!</p>
        <p>What good!</p>
        <p>What good!</p>
        {search ? <SearchContainer /> : null}
      </div>
    </main>
  );
}
