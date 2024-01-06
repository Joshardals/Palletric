"use client";
import { Icons } from "../ui/icons";

export default function Search() {
  return (
    <div
      className=" bg-gray-700/50 py-2 px-4 flex items-center justify-between
    cursor-pointer rounded-lg w-[15rem] hover:bg-gray-700/80"
    >
      <Icons.search className="h-5 w-5" />
      <p>Enter location</p>
      <p>Ctrl K</p>
    </div>
  );
}
