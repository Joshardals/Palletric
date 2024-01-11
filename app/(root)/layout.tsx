"use client";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { useSearchStore } from "@/lib/store/store";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { search } = useSearchStore();
  // Inside your SearchContainer component
  const [isVirtualKeyboardActive, setVirtualKeyboardActive] = useState(false);

  // Inside your useEffect that sets up event listeners
  useEffect(() => {
    const handleResize = () => {
      // Check if the viewport height has changed
      setVirtualKeyboardActive(window.innerHeight < window.screen.height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`flex flex-col h-full max-md:overflow-auto ${
        (search || isVirtualKeyboardActive) && " overflow-hidden"
      }`}
    >
      {/* <Header /> */}
      <main className="flex-1 mt-[7.2rem] sm:mt-[10rem}">{children}</main>
      <Footer />
    </div>
  );
}
