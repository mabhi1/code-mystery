import Hint from "@/components/page/common/hint";
import PageHeader from "@/components/page/layout/page-header";
import ShowCalendar from "@/components/page/locate-deal/show-calendar";
import StateForm from "@/components/page/locate-deal/state-form";
import strings from "@/lib/strings/locate-deal.json";
import { Radio, Unlock } from "lucide-react";

export default function LocateDeal() {
  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader>{strings.layout.title}</PageHeader>
      
      <div className="bg-card border rounded-lg p-6 shadow-sm space-y-6">
         <div className="flex items-center gap-2 border-b pb-4">
             <Radio className="w-5 h-5 text-primary animate-pulse" />
             <span className="font-mono font-bold text-sm tracking-wider uppercase">Intercepted Transmission</span>
         </div>
         
         <div className="text-sm font-mono leading-relaxed bg-muted/50 p-4 rounded border border-primary/30 text-primary">
            <span className="opacity-50">&gt; DECRYPTING MESSAGE HEADER...</span><br/>
            <span className="opacity-50">&gt; SOURCE: UNKNOWN</span><br/><br/>
            A suspicious meeting for weapons deal is about to happen in a state of USA. You got a critical information of
            the state through <span className="text-black bg-green-500 px-1 rounded font-bold">POST</span> but in encrypted
            format. Your goal is to find the key and encryption technique, decrypt and find state name and submit it with
            the key. Apparently, a calendar found is associated with that meeting. Remember, always think like a developer.
         </div>

         <StateForm />

         <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 p-2 rounded">
            <Unlock className="w-3 h-3" />
            <Hint className="border-none bg-transparent p-0">Finding a hidden DOM element is a great way to start.</Hint>
         </div>
      </div>
      
      <div className="border-t border-dashed border-primary/30 pt-6">
         <ShowCalendar />
      </div>
    </div>
  );
}
