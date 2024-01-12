"use client";
import Search from "@/components/shared/Search";
import SearchContainer from "@/components/shared/SearchItem";
import { useSearchStore } from "@/lib/store/store";
import { KeyboardEvent, TouchEvent, useEffect, useRef } from "react";

export default function Home() {
  const { search, setSearch, updateSearch } = useSearchStore();
  const modalRef = useRef<HTMLUListElement>(null);

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

  useEffect(() => {
    // Prevent body scrolling on iOS Safari when the modal is open
    if (search) {
      document.body.classList.toggle("overflow-hidden");
    } else {
      document.body.classList.toggle("overflow-auto");
    }

    // Additional functionality to prevent touch events
    const handleTouchMove = (e: any) => {
      if (search) {
        e.preventDefault();
      }
    };

    document.body.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.removeEventListener("touchmove", handleTouchMove);
    };
  }, [search]);
  return (
    <main className="hfPadding h-screen">
      <div className="px-5">
        <p>What good!</p>
        <p>What good!</p>
        <p>What good!</p>

        {search && <SearchContainer />}
      </div>
    </main>
  );
}
