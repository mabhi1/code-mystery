import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import commonString from "@/lib/strings/common.json";

export default function Header() {
  return (
    <header className="flex justify-between items-center gap-5">
      <Link href="/" className="mr-auto flex items-center">
        <Image src="/logo.png" alt={commonString.layout.title} height={50} width={50} />
        <div className="flex text-xl items-baseline">
          <h1 className="uppercase">{commonString.layout.title}</h1>
          <sub className="text-xs">{commonString.layout.headerSubText}</sub>
        </div>
      </Link>
      <ModeToggle />
    </header>
  );
}
