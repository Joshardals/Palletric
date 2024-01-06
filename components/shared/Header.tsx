import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="container fixed top-0 left-0 right-0 backdrop-blur-lg">
      <div
        className="flex items-center justify-between bg-gray-900
       backdrop-blur-lg rounded-full p-5 border border-gray-800"
      >
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/logo.png"
            alt="Palletric Logo"
            width={30}
            height={30}
            className=""
          />
          <h1 className="h1-bold">Palletric</h1>
        </Link>

        <p>hey there</p>
      </div>
    </div>
  );
}
