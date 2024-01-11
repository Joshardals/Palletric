"use client";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { useSearchStore } from "@/lib/store/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { search, setSearch, updateSearch } = useSearchStore();
  return (
    <div className={`flex flex-col h-full`}>
      <Header />

      {/* {search && (
        <div
          className={`bg-gray-800/40 p-10 fixed top-0 left-0 bottom-0 box-border h-screen w-screen flex items-center justify-center opacity-0 transition-opacity duration-300
            ${search ? " opacity-100" : ""}
        `}
        >
          <div className="space-y-4 bg-gray-900 p-5 text-center sm:w-[40rem] max-w-full">
            <div>
              <p>Hey there, what is popping??</p>

              <input
                type="text"
                placeholder="Search for a place"
                className="appearance-none outline-none bg-yellow-950"
                autoFocus
              />
            </div>

            <button
              className="px-4 py-2 bg-orange-600 rounded-full font-bold"
              onClick={setSearch}
            >
              Close Modal
            </button>
          </div>
        </div>
      )} */}
      <main className="flex-1 pt-[7.2rem] sm:pt-[10rem}">{children}</main>
      <Footer />
    </div>
  );
}
