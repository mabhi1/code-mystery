import { cn } from "@/lib/utils";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function ScreenHeader({
  children,
  setScreen,
  previousScreen,
  className,
}: {
  children: React.ReactNode;
  setScreen: Dispatch<SetStateAction<string>>;
  previousScreen?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <ArrowLeftIcon
        className="w-4 cursor-pointer"
        onClick={() => setScreen(previousScreen ? previousScreen : "mainScreen")}
      />
      <div className="w-fit mx-auto text-sm">{children}</div>
      <MenuIcon className="w-4" />
    </div>
  );
}
