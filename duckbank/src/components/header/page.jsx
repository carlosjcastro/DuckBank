import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo/duckbank2.png";

export default function Header() {
  return (
    <div className="mb-4 h-20 w-full flex items-center fixed bg-[#143D60] z-10">
      <div className="ml-4">
        <Link href="/">
          <Image
            // className=""
            src={logo}
            alt="Logo de DuckBank"
            width={60}
            height={60}
          />
        </Link>
      </div>
      <div className="flex">
        <Link href="/">
          <h1 className="text-center ml-2 font-bold text-2xl text-[#f3f4f4]">
            DuckBank
          </h1>
        </Link>
      </div>
    </div>
  );
}
