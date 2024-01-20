"use client";
import {
  useLocationLoading,
  useSearchPlace,
  useSearchStore,
} from "@/lib/store/store";
import {
  ChangeEvent,
  KeyboardEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetchAutoCompleteFunction } from "@/lib/hooks";
import { LocationResult } from "@/typings";
import { Icons } from "../ui/icons";
import CurrentLocation from "../ui/buttons/CurrentLocation";
import SearchPlace from "../ui/buttons/SearchPlace";

export default function SearchContainer() {
  const { search, setSearch, updateSearch } = useSearchStore();
  const { place, setPlace } = useSearchPlace();
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { loadingLoc } = useLocationLoading();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const suggestionListRef = useRef<HTMLUListElement>(null);

  const highlightMatchedText = (text: string, query: string) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      (match, group) => `<span style="color: #F59E0B;">${group}</span>`
    );
  };

  const calculateSuggestionHeight = (index: number): number => {
    const suggestionItem = suggestionListRef.current?.children[index] as
      | HTMLElement
      | undefined;
    return suggestionItem?.offsetHeight || 0;
  };

  const handleArrowUp = () => {
    if (focusedIndex !== null) {
      const newIndex = Math.max(focusedIndex - 1, 0);
      setFocusedIndex(newIndex);

      // Calculate the cumulative height of suggestion items up to the focused index
      const cumulativeHeight = Array.from({ length: newIndex + 1 })
        .map((_, i) => calculateSuggestionHeight(i))
        .reduce((sum, height) => sum + height, 0);

      // Scroll the suggestion list if needed
      const scrollOffset =
        cumulativeHeight - calculateSuggestionHeight(newIndex);

      // Use optional chaining to safely access current
      suggestionListRef.current?.scrollTo({
        top: Math.max(
          0,
          scrollOffset -
            suggestionListRef.current.clientHeight +
            calculateSuggestionHeight(newIndex)
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

      // Calculate the cumulative height of suggestion items up to the focused index
      const cumulativeHeight = Array.from({ length: newIndex + 1 })
        .map((_, i) => calculateSuggestionHeight(i))
        .reduce((sum, height) => sum + height, 0);

      // Scroll the suggestion list if needed
      const scrollOffset =
        cumulativeHeight - calculateSuggestionHeight(newIndex);

      // Use optional chaining to safely access current
      suggestionListRef.current?.scrollTo({
        top: Math.max(
          0,
          scrollOffset -
            suggestionListRef.current.clientHeight +
            calculateSuggestionHeight(newIndex)
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

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPlace(inputValue);

    // Reset focused Index when the input changes
    setFocusedIndex(null);

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
    setPlace(result.display_name);
    setResults([]);
    setFocusedIndex(null);
  };

  const handleBlur = () => {
    // Reset the focused index when the input loses focus
    setFocusedIndex(null);
  };

  useEffect(() => {
    // Additional functionality to prevent touch events (maybe page scrolling when search is active.) on mobile devices.
    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
      if (search) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.ctrlKey && e.key === "k" && !loadingLoc) {
        updateSearch(false);
      }
    };

    // Trying to prevent the underlying content from scrolling when search is active.
    document.body.classList.toggle("fixed", search);

    // Add or remove the event listener based on the search state
    document.body.addEventListener("touchmove", handleTouchMove as any, {
      passive: false,
    });

    document.addEventListener("keydown", handleKeyDown as any);

    return () => {
      document.body.classList.remove("fixed");

      document.body.removeEventListener("touchmove", handleTouchMove as any);
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [search, loadingLoc]);

  useEffect(() => {
    setFocusedIndex(null);
  }, [place]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown as any);

    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [focusedIndex, results]);

  return (
    <div
      className={`max-sm:absolute fixed top-0 left-0 bottom-0 h-full w-full bg-gray-900/70 z-10 overflow-hidden select-none
    backdrop-blur-md sm:justify-centered opacity-0 pointer-events-none p-5 sm:px-20 transition-opacity duration-300 ease-out
    ${search && "opacity-100 pointer-events-auto"} ${
        loadingLoc && "cursor-not-allowed"
      }
    `}
      onClick={() => {
        if (search && !loadingLoc) {
          setSearch();
        }
      }}
    >
      <div
        className={`relative bg-gray-900 rounded-2xl w-full sm:mx-auto sm:max-w-[50rem] transitionAll border border-gray-800 ${
          !(results?.length > 0) && "space-y-4"
        } `}
        onClick={(e) => {
          if (search) {
            e.stopPropagation();
          }
        }}
      >
        <div className="flex flex-col w-full border-b border-b-gray-800 p-5">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {loading ? (
              <Icons.spinner className=" text-[#F59E0B] animate-spin h-5 w-5" />
            ) : (
              <Icons.search className="h-5 w-5" />
            )}
            <input
              type="text"
              placeholder="Search for a place"
              className={`flex-1 outline-none bg-transparent `}
              value={place}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoCorrect="off"
              autoFocus
            />
            {/* 
            <div
              className="bg-gray-700/80 transitionAll cursor-pointer p-1 rounded-md"
              onClick={() => setUserInput("")}
            >
              <Icons.xMark />
            </div> */}

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
                ref={suggestionListRef}
                className=" border-b border-b-gray-800"
              >
                {results!.map((result, index) => (
                  <li
                    id={`suggestion-${index}`}
                    key={result.place_id}
                    className={`bg-gray-900 hover:bg-gray-800/70 transitionAll p-5 cursor-pointer rounded-md ${
                      focusedIndex === index && "font-bold"
                    }`}
                    onClick={() => handleResultClick(result)}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: highlightMatchedText(
                          result.display_name,
                          place
                        ),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex justify-between items-center">
            <CurrentLocation />
            <SearchPlace />
          </div>
        </div>

        {loadingLoc && (
          <div className="absolute top-0 left-0 cursor-not-allowed bg-transparent  h-full w-full rounded-md" />
        )}
      </div>
    </div>
  );
}
