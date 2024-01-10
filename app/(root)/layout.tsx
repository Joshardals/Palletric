"use client";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1 mt-[7.2rem] sm:mt-[10rem]">{children}</main>
      <Footer />
    </div>
  );
}
