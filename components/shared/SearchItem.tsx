"use client";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/round-borders-dark.css";
import { useSearchStore } from "@/lib/store/store";
export default function SearchContainer() {
  const { search, setSearch } = useSearchStore();
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-full bg-gray-900/70 z-10 overflow-hidden
    backdrop-blur-sm justify-centered opacity-0
    ${search && "opacity-100"} 
    `}
      onClick={() => {
        if (search) {
          setSearch();
        }
      }}
    >
      <div
        className="flex justify-center"
        onClick={(e) => {
          if (search) {
            e.stopPropagation();
          }
        }}
      >
        <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEO_API_KEY}>
          <div className="flex flex-col items-start space-y-4">
            <div className=" sm:w-[30rem] md:w-[45rem] flex items-center">
              <div className="flex-1">
                <GeoapifyGeocoderAutocomplete
                  placeholder="Enter a location"
                  skipIcons
                />
              </div>

              <div
                className=" bg-gray-700/80 transitionAll cursor-pointer py-1 px-4 rounded-md"
                onClick={() => {
                  setSearch();
                }}
              >
                <p className=" font-bold">Esc</p>
              </div>
            </div>

            <button
              className="bg-[#6BA54C] text-gray-900 px-4 py-2 rounded-md font-semibold
              hover:bg-[#6BA54C]/80 transitionAll
            "
            >
              Current Location
            </button>
          </div>
        </GeoapifyContext>
      </div>
    </div>
  );
}
