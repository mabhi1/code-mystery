"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import commonStrings from "@/lib/strings/common.json";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  if (theme === commonStrings.theme.darkTheme)
    return (
      <Button variant="outline" size="icon" onClick={() => setTheme(commonStrings.theme.lightTheme)}>
        <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
      </Button>
    );
  else
    return (
      <Button variant="outline" size="icon" onClick={() => setTheme(commonStrings.theme.darkTheme)}>
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      </Button>
    );
}
