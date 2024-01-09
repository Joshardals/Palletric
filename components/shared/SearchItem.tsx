"use client";
import { useSearchStore } from "@/lib/store/store";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import FocusLock from "react-focus-lock";
import { fetchAutoCompleteFunction } from "@/lib/hooks";
import { LocationResult } from "@/typings";
import { Icons } from "../ui/icons";

export default function SearchContainer() {
  const { search, setSearch, updateSearch } = useSearchStore();
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const lockRef = useRef(null);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    if (e.target.value) {
      const fetchedResults = await fetchAutoCompleteFunction(e.target.value);
      setResults(fetchedResults);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (result: string) => {
    setUserInput(result);
    setResults([]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.ctrlKey && e.key === "k") {
        updateSearch(false);
      } else if (e.key === "ArrowDown") {
      }
    };

    document.addEventListener("keydown", handleKeyDown as any);

    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [search, results]);

  return (
    <FocusLock>
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-gray-900/70 z-10 overflow-hidden select-none
    backdrop-blur-sm justify-centered opacity-0 p-5 sm:px-20
    ${search && "opacity-100"} 
    `}
        onClick={() => {
          if (search) {
            setSearch();
          }
        }}
      >
        <div
          className="flex flex-col items-start bg-gray-900 rounded-2xl w-full sm:mx-auto sm:max-w-[50rem] border border-gray-800 space-y-2"
          onClick={(e) => {
            if (search) {
              e.stopPropagation();
            }
          }}
        >
          <div className="flex flex-col w-full border-b border-b-gray-800 p-5">
            <div className="flex items-center space-x-4">
              <Icons.search className="h-5 w-5" />
              <input
                type="text"
                placeholder="Search for a place"
                className="flex-1 outline-none appearance-none bg-transparent"
                value={userInput}
                onChange={handleInputChange}
                autoFocus
              />

              <div
                className=" bg-gray-700/80 transitionAll cursor-pointer py-1 px-4 rounded-md"
                onClick={setSearch}
              >
                <p className=" font-bold">Esc</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 pb-5 w-full">
            {results?.length > 0 && (
              <ul className="overflow-y-scroll h-[12rem] border-b border-b-gray-800">
                {results!.map((result) => (
                  <li
                    key={result.place_id}
                    className="bg-gray-900 hover:bg-gray-800/70 transitionAll cursor-pointer p-5 rounded-md"
                    onClick={() => handleResultClick(result.display_name)}
                  >
                    {result.display_name}
                  </li>
                ))}
              </ul>
            )}
            <div
              className=" bg-gradient-to-r from-[#F59E0B] to-[#6BA54C]  p-[0.1rem] rounded-md cursor-pointer
              hover:bg-gradient-to-r hover:from-[#6BA54C] hover:to-[#F59E0B] max-w-[10.033rem]
          mx-5"
            >
              <button className="bg-gray-900 px-4 py-2 rounded-md">
                Current Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}
