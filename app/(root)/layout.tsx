import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* although I removed some stylings from the main element : pt-[7.2rem] sm:pt-[10rem} */}

      <main className="flex-1 pt-[7.2rem] sm:pt-[10rem}">{children}</main>

      <Footer />
    </div>
  );
}
