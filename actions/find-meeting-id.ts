"use server";

import strings from "@/lib/strings/find-meeting-id.json";

export async function checkMeetingName(name: string) {
  return name.toLowerCase() !== process.env.MEETING_ID_NAME;
}

export async function checkMeetingId(id: string) {
  return id !== process.env.MEETING_ID;
}

export async function checkMeetingDay(day: string) {
  return day !== strings.messages.todayText;
}
