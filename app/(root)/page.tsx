"use client";
import Search from "@/components/shared/Search";
import SearchContainer from "@/components/shared/SearchItem";
import { useSearchStore } from "@/lib/store/store";
import { KeyboardEvent, TouchEvent, useEffect } from "react";

export default function Home() {
  const { search, setSearch, updateSearch } = useSearchStore();

  // Event Listeners for ctrl + k and esc button -- START.

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
      if (search) {
        e.preventDefault();
      }
    };

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

    document.body.addEventListener("touchmove", handleTouchMove as any, {
      passive: false,
    });
    document.addEventListener("keydown", handleKeyDown as any);

    return () => {
      document.body.removeEventListener("touchmove", handleTouchMove as any);
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, []);

  // Event Listeners for ctrl + k and esc button -- END.

  useEffect(() => {
    document.body.classList.toggle("oveerflow-hidden", search);

    return () => {
      document.body.classList.remove("overflow-hidden");
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
          <div
            className={`bg-gray-800/40 p-10 fixed overflow-hidden top-0 left-0 bottom-0 box-border h-screen w-screen flex items-center justify-center opacity-0 transition-opacity duration-300
            ${search ? " opacity-100" : ""}
        `}
          >
            <div className="space-y-4 bg-gray-900 p-5 text-center sm:w-[40rem] max-w-full">
              <div>
                <p>Hey there, what is popping??</p>

                <input
                  type="text"
                  placeholder="Search for a place"
                  className="appearance-none outline-none bg-yellow-950"
                  autoFocus
                />
              </div>

              <button
                className="px-4 py-2 bg-orange-600 rounded-full font-bold"
                onClick={setSearch}
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
