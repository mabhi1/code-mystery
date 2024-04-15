"use client";

import Link from "next/link";
import commonStrings from "@/lib/strings/common.json";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
      className={cn("hover:text-black text-slate-400 dark:hover:text-white", ifPath && "text-black dark:text-white")}
    >
      {children}
    </Link>
  );
};

export default function Sidebar() {
  const path = usePathname();

  return (
    <menu className="min-w-40 space-y-5">
      <div className="font-medium text-base">{commonStrings.challengesMenu.title}</div>
      <ul className="flex flex-col gap-2">
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
