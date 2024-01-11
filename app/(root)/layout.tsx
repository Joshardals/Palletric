"use client";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { useSearchStore } from "@/lib/store/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { search } = useSearchStore();
  return (
    <div
      className={`flex flex-col h-full max-md:overflow-auto ${
        search && "fixed"
      }`}
    >
      {/* <Header /> */}
      <main className="flex-1 mt-[7.2rem] sm:mt-[10rem}">{children}</main>
      <Footer />
    </div>
  );
}
