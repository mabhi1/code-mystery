import { Dispatch, SetStateAction } from "react";
import ScreenHeader from "../screen-header";
import { CircleUserRoundIcon } from "lucide-react";

export default function MessageScreen({ setScreen }: { setScreen: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="flex flex-col">
      <ScreenHeader setScreen={setScreen}>Messages</ScreenHeader>
      <div className="flex gap-2 cursor-pointer items-center mt-5">
        <CircleUserRoundIcon className="w-10 h-10 text-muted-foreground" />
        <div className="flex-1 border-t py-1">
          <div className="flex justify-between">
            <span>27251</span>
            <span>Yesterday</span>
          </div>
          <div className="text-muted-foreground flex-1">You have received a zelle payment of $3417.00 from John...</div>
        </div>
      </div>
      <div className="flex gap-2 cursor-pointer items-center" onClick={() => setScreen("userMessageScreen")}>
        <CircleUserRoundIcon className="w-10 h-10 text-muted-foreground" />
        <div className="flex-1 border-y py-1">
          <div className="flex justify-between">
            <span>Unknown User</span>
            <span>4/1/24</span>
          </div>
          <div className="text-muted-foreground flex-1">
            Save the code to get your unique id. FYI, your name can be easily...
          </div>
        </div>
      </div>
    </div>
  );
}
