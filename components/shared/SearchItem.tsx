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
        className="flex justify-center bg-gray-800 p-5 rounded-2xl w-full"
        onClick={(e) => {
          if (search) {
            e.stopPropagation();
          }
        }}
      >
        <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEO_API_KEY}>
          <div className="flex flex-col items-start space-y-4 w-full">
            <div className="flex items-center w-full">
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

            {/* <button
              className="border border-[#6BA54C] text-white px-4 py-2 rounded-md
              hover:bg-[#6BA54C]/80 transitionAll
            "
            >
              Current Location
            </button> */}

            <div
              className=" bg-gradient-to-r from-[#F59E0B] to-[#6BA54C]  p-[0.1rem] rounded-md cursor-pointer
              hover:bg-gradient-to-r hover:from-[#6BA54C] hover:to-[#F59E0B]
            "
            >
              <button className="bg-gray-900 px-4 py-2 rounded-md">
                Current Location
              </button>
            </div>
          </div>
        </GeoapifyContext>
      </div>
    </div>
  );
}
