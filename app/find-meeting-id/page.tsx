"use client";

import PageHeader from "@/components/page/page-header";
import { DatePicker } from "@/components/ui/date-picker";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import MeetingInvite from "@/components/page/meeting-invite";
import { toast } from "sonner";
import Hint from "@/components/page/hint";

export default function FindMeetingID() {
  const [date, setDate] = useState<Date>(new Date());
  const [day, setDay] = useState("tomorrow");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [hint, setHint] = useState(false);

  const calculateDay = () => {
    const dateToday = new Date();
    const dateTomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    if (
      dateTomorrow.getFullYear() == date.getFullYear() &&
      dateTomorrow.getMonth() == date.getMonth() &&
      dateTomorrow.getDate() == date.getDate()
    ) {
      setDay("today");
    } else if (
      dateToday.getFullYear() == date.getFullYear() &&
      dateToday.getMonth() == date.getMonth() &&
      dateToday.getDate() == date.getDate()
    ) {
      setDay("tomorrow");
    } else {
      setDay(`on ${format(dateTomorrow, "PPP")}`);
    }
  };

  useEffect(() => {
    calculateDay();
  }, [date]);

  const handleJoin = () => {
    if (!name) {
      toast.error("Please enter your name");
    } else if (name.toLowerCase() !== "max") {
      toast.error("Please enter your correct name");
    } else if (id !== "201102") {
      toast.error("Invalid meeting id");
    } else if (day !== "today") {
      toast.error("Please join on the day of meeting");
      setHint(true);
    } else {
      toast.success("Perfect! You cracked it.");
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader>Find Meeting ID</PageHeader>
      {day.length > 1 && (
        <div>
          Today is <DatePicker date={date} setDate={setDate} />. You have a meeting <span>{day}</span>. Find the meeting
          id and join. You can see the invite email for details.
        </div>
      )}
      <MeetingInvite trigger={<Button variant="secondary">View Meeting Invite</Button>} />
      <Card className="min-w-[20rem] w-2/5 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-light">Join Meeting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Input type="number" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter meeting ID" />
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          <div className="flex items-center space-x-2">
            <Checkbox id="audio" />
            <label
              htmlFor="audio"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Don't connect to my audio
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="video" />
            <label
              htmlFor="video"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Turn off my video
            </label>
          </div>
        </CardContent>
        <CardFooter className="mt-5 gap-5 items-center justify-end">
          <Button variant="outline">Cancel</Button>
          <Button disabled={id.length !== 6 || name.length === 0} onClick={handleJoin}>
            Join Now
          </Button>
        </CardFooter>
      </Card>
      {hint && <Hint>I don't know about yout but the date mentioned for today seems weird to me.</Hint>}
    </div>
  );
}
