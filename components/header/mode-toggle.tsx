"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setTheme("light")} className="hidden dark:flex">
        <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => setTheme("dark")} className="dark:hidden">
        <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
      </Button>
    </>
  );
}
