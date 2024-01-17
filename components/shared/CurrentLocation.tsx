"use client";
import { useState } from "react";
import { Icons } from "../ui/icons";
import { useLocationLoading, useSearchStore } from "@/lib/store/store";
import { createColorPalette } from "@/lib/utils";

export default function CurrentLocation() {
  const { loadingLoc, updateLoading } = useLocationLoading();
  const { updateSearch } = useSearchStore();

  const handleCurrentLocationClick = () => {
    updateLoading(true);
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(
              `Your current location is: Latitude ${latitude}, Longitude: ${longitude}`
            );

            createColorPalette(6.5244, 3.3792);
          },
          () => {
            console.log("Unable to retrieve your location.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser");
      }
      updateLoading(false);
      updateSearch(false);
    }, 5000);
  };
  return (
    <div
      className="relative bg-gradient-to-r from-[#F59E0B] to-[#6BA54C]  p-[0.1rem] rounded-md cursor-pointer
      transitionAll mx-5 w-[12.6rem]"
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
