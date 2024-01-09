"use client";
import { useSearchStore } from "@/lib/store/store";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { fetchAutoCompleteFunction } from "@/lib/hooks";
import { LocationResult } from "@/typings";
import { Icons } from "../ui/icons";

export default function SearchContainer() {
  const { search, setSearch, updateSearch } = useSearchStore();
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const suggestionListRef = useRef<HTMLUListElement>(null);

  const handleArrowUp = () => {
    if (focusedIndex !== null) {
      const newIndex = Math.max(focusedIndex - 1, 0);
      setFocusedIndex(newIndex);

      // Use optional chaining to safely access current and children
      const suggestionHeight =
        suggestionListRef.current?.children[0]?.clientHeight || 0;

      // Scroll the suggestion list if needed
      const scrollOffset = newIndex * suggestionHeight;

      // Use optional chaining to safely access current
      suggestionListRef.current?.scrollTo({
        top: Math.max(
          0,
          scrollOffset -
            suggestionListRef.current.clientHeight +
            suggestionHeight
        ),
        behavior: "smooth", // Optional: Add smooth scrolling effect
      });
    }
  };

  const handleArrowDown = () => {
    if (results.length > 0) {
      const newIndex =
        focusedIndex === null
          ? 0
          : Math.min(focusedIndex + 1, results.length - 1);
      setFocusedIndex(newIndex);
      // Calculate the height of each suggestion item
      const suggestionHeight =
        suggestionListRef.current?.children[0]?.clientHeight || 0;

      // Scroll the suggestion list if needed
      const scrollOffset = newIndex * suggestionHeight;

      // Use optional chaining to safely access current
      suggestionListRef.current?.scrollTo({
        top: Math.max(
          0,
          scrollOffset -
            suggestionListRef.current.clientHeight +
            suggestionHeight
        ),
        behavior: "smooth", // Optional: Add smooth scrolling effect
      });
    }
  };

  const handleEnter = () => {
    if (focusedIndex !== null && results.length > 0) {
      handleResultClick(results[focusedIndex]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        handleArrowUp();
        break;
      case "ArrowDown":
        e.preventDefault();
        handleArrowDown();
        break;
      case "Enter":
        e.preventDefault();
        handleEnter();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown as any);

    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [focusedIndex, results]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setUserInput(inputValue);

    setLoading(true);
    if (inputValue) {
      try {
        const fetchedResults = await fetchAutoCompleteFunction(inputValue);
        setResults(fetchedResults);
      } catch (error: any) {
        console.log(`Error fetching autocomplete: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
      setLoading(false);
    }
  };

  const handleResultClick = (result: LocationResult) => {
    setUserInput(result.display_name);
    setResults([]);
    setFocusedIndex(null);
  };

  const handleBlur = () => {
    // Reset the focused index when the input loses focus
    setFocusedIndex(null);
  };

  useEffect(() => {
    const savedUserInput = localStorage.getItem("userInput");
    if (savedUserInput) {
      setUserInput(savedUserInput);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.ctrlKey && e.key === "k") {
        updateSearch(false);
      }
    };

    // Functionalities to Add Later On:
    // 1. Make sure that when the mouse is hovered on any of the locations and when the enter key is pressed, it must populate the form.

    document.addEventListener("keydown", handleKeyDown as any);

    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [search]);

  useEffect(() => {
    localStorage.setItem("userInput", userInput);
  }, [userInput]);

  return (
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
            {loading ? (
              <Icons.spinner className="h-5 w-5  text-[#F59E0B] animate-spin" />
            ) : (
              <Icons.search className="h-5 w-5" />
            )}
            <input
              type="text"
              placeholder="Search for a place"
              className="flex-1 outline-none appearance-none bg-transparent"
              value={userInput}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoFocus
              role="combobox"
              aria-autocomplete="list"
              aria-haspopup="true"
              aria-expanded={results?.length > 0 ? "true" : "false"}
              aria-controls="autocomplete-list"
              aria-activedescendant={
                focusedIndex !== null ? `suggestion-${focusedIndex}` : undefined
              }
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
            <div className="relative">
              <ul
                id="autocomplete-list"
                role="listbox"
                ref={suggestionListRef}
                className="overflow-y-scroll h-[14rem] border-b border-b-gray-800"
              >
                {results!.map((result, index) => (
                  <li
                    id={`suggestion-${index}`}
                    key={result.place_id}
                    role="option"
                    className={`bg-gray-900 hover:bg-gray-800/70 transitionAll cursor-pointer p-5 rounded-md ${
                      focusedIndex === index ? "text-[#F59E0B] font-bold" : ""
                    }`}
                    onClick={() => handleResultClick(result)}
                  >
                    {result.display_name}
                  </li>
                ))}
              </ul>
            </div>
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
  );
}
