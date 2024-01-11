"use client";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { useSearchStore } from "@/lib/store/store";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { search } = useSearchStore();

  return (
    <div className={`flex flex-col h-full`}>
      <Header />

      <main className="flex-1 pt-[7.2rem] sm:pt-[10rem}">{children}</main>
      <Footer />
    </div>
  );
}
