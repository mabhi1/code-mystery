"use client";

import PageHeader from "@/components/page/layout/page-header";
import { DatePicker } from "@/components/ui/date-picker";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import MeetingInvite from "@/components/page/find-meeting-id/meeting-invite";
import { toast } from "sonner";
import Hint from "@/components/page/common/hint";
import commonStrings from "@/lib/strings/common.json";
import strings from "@/lib/strings/find-meeting-id.json";
import { checkMeetingDay, checkMeetingId, checkMeetingName } from "@/actions/find-meeting-id";
import { Calendar, Video, User, Hash } from "lucide-react";

export default function FindMeetingID() {
  const [date, setDate] = useState<Date>(new Date());
  const [day, setDay] = useState(strings.messages.tomorrowText);
  const [id, setId] = useState(commonStrings.texts.emptyString);
  const [name, setName] = useState(commonStrings.texts.emptyString);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const calculateDay = () => {
      const dateToday = new Date();
      const dateTomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      if (
        dateTomorrow.getFullYear() == date.getFullYear() &&
        dateTomorrow.getMonth() == date.getMonth() &&
        dateTomorrow.getDate() == date.getDate()
      ) {
        setDay(strings.messages.todayText);
      } else if (
        dateToday.getFullYear() == date.getFullYear() &&
        dateToday.getMonth() == date.getMonth() &&
        dateToday.getDate() == date.getDate()
      ) {
        setDay(strings.messages.tomorrowText);
      } else {
        setDay(format(dateTomorrow, "PPP"));
      }
    };

    calculateDay();
  }, [date]);

  const handleJoin = async () => {
    if (!name) {
      toast.error(strings.toastMessages.noNameMessage);
    } else if (await checkMeetingName(name)) {
      toast.error(strings.toastMessages.wrongNameMessage);
    } else if (await checkMeetingId(id)) {
      toast.error(strings.toastMessages.invalidMeetingIdMessage);
    } else if (await checkMeetingDay(day)) {
      toast.error(strings.toastMessages.wrongDayMessage);
      setHint(true);
    } else {
      toast.success(strings.toastMessages.success);
    }
  };

  const handleReset = () => {
    setId(commonStrings.texts.emptyString);
    setName(commonStrings.texts.emptyString);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
          <PageHeader>{strings.layout.title}</PageHeader>
          
          <div className="bg-card border rounded-lg p-6 space-y-4 shadow-sm relative overflow-hidden">
             <div className="flex items-center gap-2 border-b pb-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-mono font-bold text-sm tracking-wider">INTERCEPTED_INVITE.isc</span>
             </div>

             {day.length > 1 && (
                <div className="font-mono text-sm leading-relaxed text-muted-foreground">
                <span className="text-primary">&gt; </span>
                {strings.messages.dateMessage} <DatePicker date={date} setDate={setDate} />.{" "}
                {day === strings.messages.todayText
                    ? strings.messages.startMessage
                    : day === strings.messages.tomorrowText
                    ? strings.messages.tomorrowDateMessage
                    : `${strings.messages.otherDateMessage} ${day}`}
                . {strings.messages.meetingMessage}
                </div>
            )}
            
            <div className="pt-4 flex justify-between items-center border-t border-dashed border-green-900/30 mt-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Encryption: <span className="text-red-500">WEAK</span></div>
                <MeetingInvite trigger={<Button variant="outline" size="sm" className="font-mono font-bold bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary">{strings.pageElements.inviteButtonText}</Button>} />
            </div>
          </div>
          
          {hint && <Hint className="border-red-500/50 text-red-400 bg-red-500/10">{strings.hints.wrongDayHint}</Hint>}
      </div>

      <Card className="w-full shadow-lg border-primary/50 bg-card/40 backdrop-blur-sm">
        <CardHeader className="border-b border-green-900/30">
          <CardTitle className="text-xl font-mono font-light tracking-widest flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            {strings.messages.joinMeetingTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
             <label className="text-xs font-mono text-muted-foreground uppercase">Target ID</label>
             <div className="relative">
                <Input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder={strings.pageElements.meetingIdPlaceholderText}
                    className="font-mono pl-8"
                />
                <Hash className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
             </div>
          </div>
          
          <div className="space-y-2">
             <label className="text-xs font-mono text-muted-foreground uppercase">Alias Name</label>
             <div className="relative">
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={strings.pageElements.namePlaceholderText}
                    className="font-mono pl-8"
                />
                <User className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 border rounded p-3 bg-muted/50">
                <Checkbox id={strings.pageElements.audioCheckboxId} />
                <label
                htmlFor={strings.pageElements.audioCheckboxId}
                className="text-xs font-mono cursor-pointer flex items-center gap-2"
                >
                {strings.pageElements.audioCheckboxText}
                </label>
            </div>
            <div className="flex items-center space-x-2 border rounded p-3 bg-muted/50">
                <Checkbox id={strings.pageElements.videoCheckboxId} />
                <label
                htmlFor={strings.pageElements.videoCheckboxId}
                className="text-xs font-mono cursor-pointer flex items-center gap-2"
                >
                {strings.pageElements.videoCheckboxText}
                </label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-4 justify-end border-t border-green-900/30 pt-6">
          <Button variant="ghost" onClick={handleReset} className="font-mono text-xs">
            {strings.pageElements.resetButtonText}
          </Button>
          <Button disabled={id.length !== 6 || name.length === 0} onClick={handleJoin} className="font-mono w-32">
            {strings.pageElements.submitButtonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
