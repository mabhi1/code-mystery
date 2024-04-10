import { Dispatch, SetStateAction } from "react";
import ScreenHeader from "../screen-header";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function FileScreen({ setScreen }: { setScreen: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="flex flex-col gap-5">
      <ScreenHeader setScreen={setScreen}>Files</ScreenHeader>
      <Link href="/crime-story//code-screen" className="flex flex-col gap-[1px] items-center w-fit">
        <div className="w-16 h-20 bg-white flex flex-col gap-1 border border-black/50 pt-1 rounded mb-1">
          <Separator className="bg-black/50 w-3/4 mx-auto" />
          <Separator className="bg-black/50 w-3/4 mx-auto" />
          <Separator className="bg-black/50 w-3/4 mx-auto" />
        </div>
        <span>Generate ID</span>
        <span className="text-muted-foreground">Yesterday</span>
        <span className="text-muted-foreground">1 KB</span>
      </Link>
    </div>
  );
}
