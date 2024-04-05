import clsx from "clsx";
import React from "react";
import commonStrings from "@/lib/strings/common.json";

export default function Hint({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={clsx("text-sm leading-5", className)} id={id}>
      {commonStrings.texts.hint}: {children}
    </div>
  );
}
