import { Dispatch, SetStateAction } from "react";
import ScreenHeader from "../screen-header";
import { BookUserIcon, PhoneIcon, PlayIcon, StarIcon, Trash2Icon, VoicemailIcon } from "lucide-react";

export default function VoicemailScreen({ setScreen }: { setScreen: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="h-full flex flex-col pb-14">
      <ScreenHeader setScreen={setScreen}>Voicemail</ScreenHeader>
      <div className="flex flex-col mt-5">
        <span>+1 (341) 777-213</span>
        <span className="text-muted-foreground">April 1, 2024 at 9:06 AM</span>
        <div className="w-full mt-5 h-1 bg-slate-200 dark:bg-slate-800 relative after:absolute after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-slate-800 dark:after:bg-slate-50 after:top-1/2 after:left-0 after:-translate-y-1/2"></div>
        <div className="flex justify-between mt-1">
          <span>0:00</span>
          <span>0:13</span>
        </div>
        <div className="mt-3 flex gap-3">
          <PlayIcon className="w-4 cursor-pointer" />
          <PhoneIcon className="w-4 ml-auto cursor-pointer" />
          <Trash2Icon className="w-4 cursor-pointer" />
        </div>
        <div className="mt-5 text-sm">Transcription</div>
        <div>
          &quot;Hello, the key that you are looking for is 3417. Please, don&apos;t save this key anywhere. It leads
          straight to jail...&quot;
        </div>
      </div>
      <div className="grid grid-cols-4 mt-auto">
        <div className="p-1 flex flex-col justify-center items-center rounded-l-md text-muted-foreground cursor-pointer">
          <StarIcon className="w-4" />
          <span>Favourites</span>
        </div>
        <div
          className="p-1 flex flex-col justify-center items-center text-muted-foreground cursor-pointer"
          onClick={() => setScreen("phoneScreen")}
        >
          <PhoneIcon className="w-4" />
          <span>Recents</span>
        </div>
        <div className="p-1 flex flex-col justify-center items-center text-muted-foreground cursor-pointer">
          <BookUserIcon className="w-4" />
          <span>Contacts</span>
        </div>
        <div className="p-1 flex flex-col justify-center items-center rounded-r-md text-primary cursor-pointer">
          <VoicemailIcon className="w-5" />
          <span>Voicemail</span>
        </div>
      </div>
    </div>
  );
}
