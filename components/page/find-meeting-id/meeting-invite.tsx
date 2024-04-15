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
import Hint from "../common/hint";
import strings from "@/lib/strings/find-meeting-id.json";

export default function MeetingInvite({ trigger }: { trigger: React.ReactNode }) {
  const dateTomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-2">
        <DialogHeader className="mb-2">
          <DialogTitle>{strings.messages.meetingInviteTitle}</DialogTitle>
        </DialogHeader>
        <div>Hi {strings.messages.userName},</div>
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
          <span className="font-medium">Encrypted Meeting ID: </span>
          {strings.messages.meetingId}
        </div>
        <div>
          The meeting id is encrypted due to security reasons. Think like a developer and decrypt it before using it.
        </div>
        <Hint>{strings.hints.meetingInviteHint}</Hint>
        <div className="flex flex-col">
          <span>Thanks,</span>
          <span>John</span>
        </div>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button type="button">{strings.pageElements.closeButtonText}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
