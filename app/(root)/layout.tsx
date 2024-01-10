import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-1 mt-[7.2rem] sm:mt-[10rem]">{children}</main>
      <Footer />
    </div>
  );
}
