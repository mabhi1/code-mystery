import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import commonString from "@/lib/strings/common.json";
import { ShieldAlert } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center gap-5 border-b border-green-900/30 pb-4">
      <Link href="/" className="mr-auto flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-md border border-primary/20">
            <ShieldAlert className="w-8 h-8 text-primary" />
        </div>
        <div className="flex flex-col">
          <h1 className="uppercase text-xl font-bold tracking-widest text-primary">{commonString.layout.title}</h1>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             <sub className="text-xs text-muted-foreground tracking-widest uppercase font-mono">{commonString.layout.headerSubText}</sub>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-xs font-mono font-bold tracking-widest">
            CLASSIFIED
          </div>
          <ModeToggle />
      </div>
    </header>
  );
}
