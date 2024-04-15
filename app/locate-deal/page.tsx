import Hint from "@/components/page/common/hint";
import PageHeader from "@/components/page/layout/page-header";
import ShowCalendar from "@/components/page/locate-deal/show-calendar";
import StateForm from "@/components/page/locate-deal/state-form";
import strings from "@/lib/strings/locate-deal.json";

export default function LocateDeal() {
  return (
    <div className="space-y-5">
      <PageHeader>{strings.layout.title}</PageHeader>
      <div>
        A suspicious meeting for weapons deal is about to happen in a state of USA. You got a critical information of
        the state through <span className="text-muted bg-muted-foreground px-1 rounded">POST</span> but in encrypted
        format. Your goal is to find the key and encryption technique, decrypt and find state name and submit it.
        Apparently, a calendar found is associated with that meeting. Remember, always think like a developer
      </div>
      <StateForm />
      <Hint>Finding a hidden DOM element is a great way to start.</Hint>
      <ShowCalendar />
    </div>
  );
}
