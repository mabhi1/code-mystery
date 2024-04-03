import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center gap-5">
      <Link href="/" className="mr-auto">
        <div className="flex text-xl items-baseline">
          <h1 className="uppercase">Code Mystery</h1>
          <sub className="text-xs">For developers</sub>
        </div>
      </Link>
      <ModeToggle />
    </header>
  );
}
