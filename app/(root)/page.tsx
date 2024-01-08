"use client";
import SearchContainer from "@/components/shared/SearchItem";
import { useSearchStore } from "@/lib/store/store";
import { useEffect } from "react";

export default function Home() {
  const { search, setSearch } = useSearchStore();

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.ctrlKey && e.key === "k") {
        setSearch;
        alert(search);
      }
      // if (search) {
      //   if (e.key === "Escape") {
      //     setSearch();
      //   }
      // }
    };

    document.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="container">
      <div className="px-5">
        <p>What good!</p>
        <p>What good!</p>
        <p>What good!</p>
        {search && <SearchContainer />}
      </div>
    </main>
  );
}
