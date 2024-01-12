"use client";
import { useState } from "react";
import { Icons } from "../ui/icons";
import { useLocationLoading } from "@/lib/store/store";

export default function CurrentLocation() {
  const { loadingLoc, updateLoading } = useLocationLoading();

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
          },
          () => {
            console.log("Unable to retrieve your location.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser");
      }
      updateLoading(false);
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
            <Icons.spinner className="h-6 w-6 text-[#F59E0B] animate-spin" />
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
