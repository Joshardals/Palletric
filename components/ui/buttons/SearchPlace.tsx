import React from "react";

export default function SearchPlace() {
  const handleSearch = () => {
    
  }
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
        onClick={handleSearch}
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
