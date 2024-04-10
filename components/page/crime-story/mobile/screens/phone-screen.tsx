import { Dispatch, SetStateAction } from "react";
import ScreenHeader from "../screen-header";
import { BookUserIcon, PhoneIcon, PhoneMissedIcon, PhoneOutgoingIcon, StarIcon, VoicemailIcon } from "lucide-react";

export default function PhoneScreen({ setScreen }: { setScreen: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="h-full flex flex-col pb-14">
      <ScreenHeader setScreen={setScreen}>Recents</ScreenHeader>
      <div className="flex justify-between items-center border-y py-1 mt-5">
        <div className="flex flex-col">
          <div className="flex gap-1 items-center">
            <PhoneOutgoingIcon className="w-3" />
            <span>+1 (803) 333-444</span>
          </div>
          <span className="text-muted-foreground">Unknown</span>
        </div>
        <span className="text-muted-foreground">Saturday</span>
      </div>
      <div className="flex justify-between items-center border-b py-1">
        <div className="flex flex-col">
          <div className="flex gap-1 items-center">
            <PhoneMissedIcon className="w-3 text-red-800 dark:text-red-300" />
            <span className="text-red-800 dark:text-red-300">+1 (341) 777-213</span>
          </div>
          <span className="text-muted-foreground">Phone</span>
        </div>
        <span className="text-muted-foreground">4/1/24</span>
      </div>
      <div className="grid grid-cols-4 mt-auto">
        <div className="p-1 flex flex-col justify-center items-center rounded-l-md text-muted-foreground cursor-pointer">
          <StarIcon className="w-4" />
          <span>Favourites</span>
        </div>
        <div className="p-1 flex flex-col justify-center items-center text-primary cursor-pointer">
          <PhoneIcon className="w-4" />
          <span>Recents</span>
        </div>
        <div className="p-1 flex flex-col justify-center items-center text-muted-foreground cursor-pointer">
          <BookUserIcon className="w-4" />
          <span>Contacts</span>
        </div>
        <div
          className="p-1 flex flex-col justify-center items-center rounded-r-md text-muted-foreground cursor-pointer"
          onClick={() => setScreen("voicemailScreen")}
        >
          <VoicemailIcon className="w-5" />
          <span>Voicemail</span>
        </div>
      </div>
    </div>
  );
}
