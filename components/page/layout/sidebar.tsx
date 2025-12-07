"use client";

import Link from "next/link";
import commonStrings from "@/lib/strings/common.json";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Folder, FolderOpen } from "lucide-react";

const MenuItem = ({ children, href, path }: { children: React.ReactNode; href: string; path: string }) => {
  const ifPath =
    children
      ?.toString()
      .split(" ")
      .map((text) => text.toLowerCase())
      .join("-") === path;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md transition-all font-mono text-xs hover:bg-green-500/10 hover:text-green-500", 
        ifPath ? "bg-green-500/20 text-green-500 border border-green-500/30" : "text-muted-foreground"
      )}
    >
      {ifPath ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
      {children}
    </Link>
  );
};

export default function Sidebar() {
  const path = usePathname();

  return (
    <menu className="min-w-48 space-y-6">
      <div className="font-mono text-sm text-muted-foreground uppercase tracking-widest border-b border-green-900/30 pb-2 mb-4">
        {commonStrings.challengesMenu.title}
      </div>
      <ul className="flex flex-col gap-1">
        {commonStrings.challengesMenu.options.map((option) => (
          <li key={option.url}>
            <MenuItem href={option.url} path={path.split("/")[1]}>
              {option.title}
            </MenuItem>
          </li>
        ))}
      </ul>
    </menu>
  );
}
