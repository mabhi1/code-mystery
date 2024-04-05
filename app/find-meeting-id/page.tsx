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

  const handleJoin = () => {
    if (!name) {
      toast.error(strings.toastMessages.noNameMessage);
    } else if (name.toLowerCase() !== process.env.NEXT_PUBLIC_MEETING_ID_NAME) {
      toast.error(strings.toastMessages.wrongNameMessage);
    } else if (id !== process.env.NEXT_PUBLIC_MEETING_ID) {
      toast.error(strings.toastMessages.invalidMeetingIdMessage);
    } else if (day !== strings.messages.todayText) {
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
    <div className="space-y-5">
      <PageHeader>{strings.layout.title}</PageHeader>
      {day.length > 1 && (
        <div>
          {strings.messages.dateMessage} <DatePicker date={date} setDate={setDate} />.{" "}
          {day === strings.messages.todayText
            ? strings.messages.startMessage
            : day === strings.messages.tomorrowText
            ? strings.messages.tomorrowDateMessage
            : `${strings.messages.otherDateMessage} ${day}`}
          . {strings.messages.meetingMessage}
        </div>
      )}
      <MeetingInvite trigger={<Button variant="secondary">{strings.pageElements.inviteButtonText}</Button>} />
      <Card className="min-w-[20rem] w-2/5 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-light">{strings.messages.joinMeetingTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={strings.pageElements.meetingIdPlaceholderText}
          />
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={strings.pageElements.namePlaceholderText}
          />
          <div className="flex items-center space-x-2">
            <Checkbox id={strings.pageElements.audioCheckboxId} />
            <label
              htmlFor={strings.pageElements.audioCheckboxId}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {strings.pageElements.audioCheckboxText}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id={strings.pageElements.videoCheckboxId} />
            <label
              htmlFor={strings.pageElements.videoCheckboxId}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {strings.pageElements.videoCheckboxText}
            </label>
          </div>
        </CardContent>
        <CardFooter className="mt-5 gap-5 items-center justify-end">
          <Button variant="outline" onClick={handleReset}>
            {strings.pageElements.resetButtonText}
          </Button>
          <Button disabled={id.length !== 6 || name.length === 0} onClick={handleJoin}>
            {strings.pageElements.submitButtonText}
          </Button>
        </CardFooter>
      </Card>
      {hint && <Hint>{strings.hints.wrongDayHint}</Hint>}
    </div>
  );
}
