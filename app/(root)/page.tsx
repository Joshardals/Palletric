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
    // Prevent touch events on the modal from bubbling to the body
    const handleModalTouchMove = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (modalRef.current) {
      modalRef.current.addEventListener("touchmove", handleModalTouchMove, {
        passive: false,
      });
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("touchmove", handleModalTouchMove);
      }
    };
  }, [search]);

  return (
    <main className="hfPadding h-screen">
      <div className="px-5">
        <p>What good!</p>
        <p>What good!</p>
        <p>What good!</p>

        {/* {search && <SearchContainer />} */}

        {search && (
          <div className=" fixed top-0 left-0 w-full h-[100svh] bg-gray-800/60 flex items-center justify-center z-[1000]">
            <div className="bg-white text-black p-5 rounded-md text-center">
              <p>Hey there, what is popping??</p>
              <input
                type="text"
                placeholder="Search for a place"
                className="appearance-none outline-none bg-yellow-950"
                autoFocus
              />
              <button
                className="px-4 py-2 bg-orange-600 rounded-full font-bold"
                onClick={() => updateSearch(false)}
              >
                Close Modal
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
