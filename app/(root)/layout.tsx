import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen max-md:overflow-auto bg-red-500">
      <Header />
      <main className="flex-1 mt-[7.2rem] sm:mt-[10rem] bg-blue-500">
        {children}
      </main>
      <Footer />
    </div>
  );
}
