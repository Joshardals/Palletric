"use client";
import { useSearchStore } from "@/lib/store/store";
import { Icons } from "../ui/icons";

export default function Search() {
  const { search, setSearch } = useSearchStore();
  return (
    <div>
      <div
        className="bg-gray-700/50 py-2 px-4 flex items-center justify-between
    cursor-pointer rounded-lg max-md:space-x-2 md:w-[15rem] hover:bg-gray-700/80"
        onClick={setSearch}
      >
        <Icons.search className="h-5 w-5" />
        <p>Enter location</p>
        <p className="max-md:hidden">Ctrl K</p>
      </div>

      {/* Mobile Device */}
      {/* <div className="sm:hidden" onClick={setSearch}>
        <Icons.search className="h-5 w-5 cursor-pointer hover:text-white transitionAll" />
      </div> */}
    </div>
  );
}
