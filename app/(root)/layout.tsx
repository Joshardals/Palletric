"use client";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { useSearchStore } from "@/lib/store/store";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { search } = useSearchStore();
  // Inside your SearchContainer component
  const [isVirtualKeyboardActive, setVirtualKeyboardActive] = useState(false);
  // Inside your Layout component
  const [scrollPosition, setScrollPosition] = useState(0);

  // Inside your useEffect that sets up event listeners
  // Inside your useEffect in the Layout component
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-col h-full max-md:overflow-auto ${
        (search || isVirtualKeyboardActive) && " overflow-hidden"
      }`}
      style={{ top: `-${scrollPosition}px` }}
    >
      {/* <Header /> */}
      <main className="flex-1 mt-[7.2rem] sm:mt-[10rem}">{children}</main>
      <Footer />
    </div>
  );
}
