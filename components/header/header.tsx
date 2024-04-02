import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <Link href="/">
        <div className="uppercase text-xl">
          Code Mystery<sub className="text-xs capitalize">For developers</sub>
        </div>
      </Link>
      <ModeToggle />
    </header>
  );
}
