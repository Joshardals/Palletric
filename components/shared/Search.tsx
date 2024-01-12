"use client";
import { useSearchStore } from "@/lib/store/store";
import { Icons } from "../ui/icons";
import Image from "next/image";

export default function Search() {
  const { setSearch } = useSearchStore();
  return (
    <div>
      <div
        className="bg-gray-700/50 py-2 px-4 flex items-center justify-between
    cursor-pointer rounded-lg max-md:space-x-2 md:w-[14rem] hover:bg-gray-700/80 max-sm:hidden"
        onClick={setSearch}
      >
        <Image
          src="/assets/icons/search.svg"
          width={18}
          height={18}
          alt="Search"
        />
        <p>Enter location</p>
        <p className="max-md:hidden">Ctrl K</p>
      </div>

      {/* Mobile Screens */}
      <Image
        src="/assets/icons/search.svg"
        width={18}
        height={18}
        alt="Search"
        className="sm:hidden cursor-pointer"
        onClick={setSearch}
      />
    </div>
  );
}
