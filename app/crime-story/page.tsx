"use client";

import PageHeader from "@/components/page/layout/page-header";
import Mobile from "@/components/page/crime-story/mobile/screens/main-screen";
import strings from "@/lib/strings/crime-story.json";
import { useState } from "react";
import LockScreen from "@/components/page/crime-story/mobile/screens/lock-screen";
import suspects from "@/lib/strings/list-of-suspects.json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileScreen from "@/components/page/crime-story/mobile/screens/file-screen";
import MessageScreen from "@/components/page/crime-story/mobile/screens/message-screen";
import UserMessageScreen from "@/components/page/crime-story/mobile/screens/user-message-screen";
import NotesScreen from "@/components/page/crime-story/mobile/screens/notes-screen";
import PhoneScreen from "@/components/page/crime-story/mobile/screens/phone-screen";
import VoicemailScreen from "@/components/page/crime-story/mobile/screens/voicemail-screen";

export default function CrimeStory() {
  const [screen, setScreen] = useState("lockScreen");
  return (
    <div className="flex flex-col lg:flex-row items-start gap-12">
      <div className="flex-1 space-y-5">
        <PageHeader>{strings.layout.title}</PageHeader>
        <div>
          As a secret agent, you&apos;re tasked with decrypting a criminal&apos;s device and identifying the culprit
          from a suspect list. With exclusive access granted to you alone, explore the device, examine each and every
          detail, and uncover the reality. Approach it with the mindset of a developer and submit the name.
        </div>
        <div className="flex gap-5">
          <Input type="text" placeholder="Enter the criminal's name" />
          <Button>Submit</Button>
        </div>
        <div className="underline underline-offset-4">List of suspects</div>
        <div className="grid grid-cols-2 h-96 gap-2 overflow-auto border p-2 rounded shadow">
          {suspects.map((suspect) => (
            <div key={suspect.id} id={suspect.id} className="p-2 space-y-2 rounded border">
              <div className="uppercase">{suspect.name}</div>
              <div className="flex gap-2 flex-wrap justify-between">
                <div className="capitalize min-w-12">{suspect.sex}</div>
                <div>DOB: {suspect.date_of_birth}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        {screen === "mainScreen" && <Mobile setScreen={setScreen} />}
        {screen === "lockScreen" && <Mobile comp={<LockScreen setScreen={setScreen} />} />}
        {screen === "fileScreen" && <Mobile comp={<FileScreen setScreen={setScreen} />} />}
        {screen === "messageScreen" && <Mobile comp={<MessageScreen setScreen={setScreen} />} />}
        {screen === "userMessageScreen" && <Mobile comp={<UserMessageScreen setScreen={setScreen} />} />}
        {screen === "notesScreen" && <Mobile comp={<NotesScreen setScreen={setScreen} />} />}
        {screen === "phoneScreen" && <Mobile comp={<PhoneScreen setScreen={setScreen} />} />}
        {screen === "voicemailScreen" && <Mobile comp={<VoicemailScreen setScreen={setScreen} />} />}
      </div>
    </div>
  );
}
