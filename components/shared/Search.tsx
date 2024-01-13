"use client";
import { useSearchStore } from "@/lib/store/store";
import { Icons } from "../ui/icons";

export default function Search() {
  const { setSearch } = useSearchStore();
  return (
    <div>
      <div
        className="bg-gray-700/50 py-2 px-4 flex items-center justify-between
    cursor-pointer rounded-lg max-md:space-x-2 md:w-[14rem] hover:bg-gray-700/80 max-sm:hidden"
        onClick={setSearch}
      >
        <Icons.search className="h-4 w-4 sm:h-5 sm:w-5" />
        <p>Enter location</p>
        <p className="max-md:hidden">Ctrl K</p>
      </div>

      {/* Mobile Screens */}
      <Icons.search
        onClick={setSearch}
        className="sm:hidden cursor-pointer h-4 w-4 sm:h-5 sm:w-5"
      />
    </div>
  );
}
