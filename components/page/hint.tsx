import clsx from "clsx";
import React from "react";

export default function Hint({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("text-sm font-medium leading-5", className)}>{children}</div>;
}
