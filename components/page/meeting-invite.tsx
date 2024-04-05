import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import Hint from "./hint";

export default function MeetingInvite({ trigger }: { trigger: React.ReactNode }) {
  const dateTomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-2">
        <DialogHeader className="mb-2">
          <DialogTitle>Meeting Invite</DialogTitle>
        </DialogHeader>
        <div>Hi Max,</div>
        <div>
          The following is the invite of a confidential meeting. Any discussion related to this meeting is not
          encouraged.
        </div>
        <div className="underline underline-offset-2">Invite Details</div>
        <div>
          <span className="font-medium">When: </span>
          {format(dateTomorrow, "PPP")}
        </div>
        <div>
          <span className="font-medium">MeetingID: </span>
          TTFFTFFT
        </div>
        <div>
          The meeting id is encrypted due to security reasons. Think like a developer and decrypt it before using it.
        </div>
        <Hint>The meeting id seems to be a palindrome number</Hint>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
