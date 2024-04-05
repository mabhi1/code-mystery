import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center gap-5 px-5 pt-5 max-w-7xl mx-auto">
      <Link href="/" className="mr-auto flex items-center">
        <Image src="/logo.png" alt="code mystery logo" height={50} width={50} />
        <div className="flex text-xl items-baseline">
          <h1 className="uppercase">Code Mystery</h1>
          <sub className="text-xs">For developers</sub>
        </div>
      </Link>
      <ModeToggle />
    </header>
  );
}
