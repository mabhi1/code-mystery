"use client";

import strings from "@/lib/strings/index-page.json";
import { Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-[60vh]">
      <div className="p-8 border border-primary/50 rounded-lg bg-card/50 backdrop-blur-sm shadow-2xl max-w-2xl w-full">
        <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 mb-6">
           <Terminal className="w-6 h-6 text-primary animate-pulse" />
           <span className="font-mono text-lg font-bold tracking-widest text-primary">SYSTEM_MESSAGE</span>
        </div>
        
        <div className="space-y-6 text-center">
            <div className="text-3xl font-bold tracking-tighter text-primary">{strings.messages.heading1}</div>
            <div className="text-lg px-10 text-muted-foreground leading-relaxed">{strings.messages.heading2}</div>
            <div className="text-sm font-mono text-primary/80 border-t border-primary/30 pt-4 mt-6">
                {strings.messages.heading3} <span className="animate-pulse">_</span>
            </div>
        </div>
      </div>
    </div>
  );
}
