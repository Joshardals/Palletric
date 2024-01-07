"use client";
import SearchContainer from "@/components/shared/SearchItem";
import { useSearchStore } from "@/lib/store/store";

export default function Home() {
  const { search } = useSearchStore();
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
