import clsx from "clsx";
import React from "react";

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
      Hint: {children}
    </div>
  );
}
