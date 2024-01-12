import Image from "next/image";
import Link from "next/link";
import Search from "./Search";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 backdrop-blur-lg select-none hfPadding">
      <div
        className="flex items-center justify-between bg-gray-900
       backdrop-blur-lg rounded-2xl p-5 border border-gray-800"
      >
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/logo.png"
            alt="Palletric Logo"
            width={30}
            height={30}
            className=" max-sm:h-6 max-sm:w-6"
          />
          <h1 className="h1-bold">Palletric</h1>
        </Link>
        <Search />
      </div>
    </div>
  );
}
