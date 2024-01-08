"use client";
import SearchContainer from "@/components/shared/SearchItem";
import { useSearchStore } from "@/lib/store/store";
import { useEffect } from "react";

export default function Home() {
  const { search, setSearch, updateSearch } = useSearchStore();

  // Event Listeners for ctrl + k and esc button -- START.

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        updateSearch(true);
      }

      if (e.key === "Escape") {
        updateSearch(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
  }, []);

  // Event Listeners for ctrl + k and esc button -- END.

  return (
    <main className="hfPadding h-screen">
      <div className="">
        <p>What good!</p>
        <p>What good!</p>
        <p>What good!</p>
        {search ? <SearchContainer /> : null}
      </div>
    </main>
  );
}
