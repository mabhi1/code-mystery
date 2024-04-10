import { Dispatch, SetStateAction } from "react";
import ScreenHeader from "../screen-header";
import { CircleUserRoundIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function UserMessageScreen({ setScreen }: { setScreen: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="h-full flex flex-col gap-5 pb-14">
      <ScreenHeader setScreen={setScreen} previousScreen="messageScreen" className="border-b pb-5">
        <div className="flex flex-col justify-center items-center">
          <CircleUserRoundIcon className="w-6 h-6" />
          <span className="text-xs">Unknown User</span>
        </div>
      </ScreenHeader>
      <div className="flex-1 flex flex-col justify-between">
        <div className="w-3/4 p-3 bg-slate-200 dark:bg-slate-800 relative after:content-[''] rounded-t rounded-br after:absolute after:-bottom-1 after:left-0 after:w-2 after:h-4 after:bg-slate-200 dark:after:bg-slate-800 after:rounded-br-full">
          Save the code to get your unique ID. FYI, your name has been mapped with your ID in the DOM. Make sure to not
          reveal your zip code and key.
        </div>
        <Input placeholder="Enter your message" className="rounded-full" />
      </div>
    </div>
  );
}
