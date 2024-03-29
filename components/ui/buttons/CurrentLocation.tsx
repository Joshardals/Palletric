"use client";
import { Icons } from "../icons";
import {
  useLocationLoading,
  usePaletteStore,
  useSearchPlace,
  useSearchStore,
} from "@/lib/store/store";
import { createColorPalette } from "@/lib/utils";

export default function CurrentLocation() {
  const { loadingLoc, updateLoading } = useLocationLoading();
  const { updateSearch } = useSearchStore();
  const { updatePalette } = usePaletteStore();
  const { setPlace } = useSearchPlace();

  const handleCurrentLocationClick = () => {
    updateLoading(true);
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            const res = createColorPalette(latitude, longitude);
            updatePalette(res);
          },
          () => {
            console.log("Unable to retrieve your location.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser");
      }
      setPlace("");
      updateLoading(false);
      updateSearch(false);
    }, 5000);
  };
  return (
    <div
      className="relative bg-gradient-to-r from-[#F59E0B] to-[#6BA54C]  p-[0.1rem] rounded-md cursor-pointer
      transitionAll mx-5 "
    >
      <button
        type="button"
        className={` bg-gray-900 px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full
            transitionAll ${loadingLoc && "animate-pulse"}
        `}
        onClick={handleCurrentLocationClick}
      >
        {loadingLoc ? (
          <div className="space-x-2 justify-centered">
            <Icons.spinner className=" text-[#F59E0B] animate-spin h-5 w-5" />
            <p> Locating you...</p>
          </div>
        ) : (
          <div className="space-x-2 justify-centered">
            <Icons.location className="h-5 w-5" />
            <p> Current Location</p>
          </div>
        )}
      </button>
    </div>
  );
}
