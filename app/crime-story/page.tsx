"use client";

import PageHeader from "@/components/page/layout/page-header";
import Mobile from "@/components/page/crime-story/mobile/screens/main-screen";
import strings from "@/lib/strings/crime-story.json";
import { useState } from "react";
import LockScreen from "@/components/page/crime-story/mobile/screens/lock-screen";
import suspects from "@/lib/json-db/list-of-suspects.json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileScreen from "@/components/page/crime-story/mobile/screens/file-screen";
import MessageScreen from "@/components/page/crime-story/mobile/screens/message-screen";
import UserMessageScreen from "@/components/page/crime-story/mobile/screens/user-message-screen";
import NotesScreen from "@/components/page/crime-story/mobile/screens/notes-screen";
import PhoneScreen from "@/components/page/crime-story/mobile/screens/phone-screen";
import VoicemailScreen from "@/components/page/crime-story/mobile/screens/voicemail-screen";
import { toast } from "sonner";
import { checkCriminalName } from "@/actions/crime-story";
import { Search, FileSearch } from "lucide-react";

export default function CrimeStory() {
  const [screen, setScreen] = useState(localStorage.getItem("code-screen") === "open" ? "mainScreen" : "lockScreen");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (await checkCriminalName(name)) {
      toast.error("Invalid name");
    } else {
      toast.success("Perfect! You cracked it.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader>{strings.layout.title}</PageHeader>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Forensics Dashboard */}
        <div className="space-y-6">
           <div className="bg-card border rounded-lg p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b pb-2 text-primary">
                 <Search className="w-5 h-5" />
                 <span className="font-mono font-bold text-sm tracking-wider uppercase">Case File #492-AX</span>
              </div>
              
              <div className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-mono text-primary font-bold">MISSION_BRIEF: </span>
                   As a secret agent, you&apos;re tasked with decrypting a criminal&apos;s device and identifying the culprit
                  from a suspect list. With exclusive access granted to you alone, explore the device, examine each and every
                  detail, and uncover the reality. Approach it with the mindset of a developer and submit the name.
              </div>

              <div className="flex gap-4 items-center bg-muted/50 p-4 rounded-md border border-dashed">
                 <Input
                    type="text"
                    placeholder="ENTER SUSPECT ALIAS"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-mono uppercase tracking-widest bg-background"
                 />
                 <Button onClick={handleSubmit} variant="secondary">
                    <FileSearch className="w-4 h-4 mr-2" /> VERIFY
                 </Button>
              </div>
           </div>

           <div className="border rounded-lg overflow-hidden bg-card/40">
              <div className="bg-muted/50 p-2 border-b flex items-center justify-between">
                 <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">Suspect Database</span>
                 <span className="text-xs text-muted-foreground">{suspects.length} RECORDS FOUND</span>
              </div>
              <div className="grid grid-cols-2 h-80 gap-px bg-border overflow-auto">
                {suspects.map((suspect) => (
                    <div key={suspect.id} id={suspect.id} className="bg-card p-3 space-y-1 hover:bg-muted/50 transition-colors">
                        <div className="font-mono text-sm font-bold uppercase text-primary truncate">{suspect.name}</div>
                        <div className="flex flex-col text-[10px] text-muted-foreground font-mono">
                           <span>SEX: {suspect.sex}</span>
                           <span>DOB: {suspect.date_of_birth}</span>
                        </div>
                    </div>
                ))}
              </div>
           </div>
        </div>

        {/* Device Emulator */}
        <div>
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
    </div>
  );
}
