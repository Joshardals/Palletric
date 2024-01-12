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

  // useEffect(() => {
  //   // Prevent body scrolling on iOS Safari when the modal is open
  //   if (search) {
  //     document.body.classList.toggle("overflow-hidden");
  //   } else {
  //     document.body.classList.toggle("overflow-auto");
  //   }

  //   // Additional functionality to prevent touch events
  //   const handleTouchMove = (e: any) => {
  //     if (search) {
  //       e.preventDefault();
  //     }
  //   };

  //   document.body.addEventListener("touchmove", handleTouchMove, {
  //     passive: false,
  //   });

  //   return () => {
  //     document.body.classList.remove("overflow-hidden");
  //     document.body.removeEventListener("touchmove", handleTouchMove);
  //   };
  // }, [search]);
  return (
    <main className="hfPadding h-screen">
      <div className="px-5">
        <p>What good!</p>
        <p>What good!</p>
        <p>What good!</p>

        {/* {search && <SearchContainer />} */}
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-800/60 z-[1000]
        opacity-0 pointer-events-none transition-opacity duration-300 ${
          search && "opacity-100 pointer-events-auto"
        }
        `}
      >
        <div className="bg-black p-5 rounded-md text-center">
          <p>Hey there, what is popping??</p>
          <input
            type="text"
            placeholder="Search for a place"
            className={`appearance-none outline-none bg-yellow-950 ${
              search ? "pointer-events-auto" : "pointer-events-none"
            }`}
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
    </main>
  );
}
