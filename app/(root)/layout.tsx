import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex flex-col h-full`}>
      <Header />
      <main className="flex-1 pt-[7.2rem] sm:pt-[10rem} bg-blue-500">
        {children}
      </main>
      <Footer />
    </div>
  );
}
