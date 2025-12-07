"use client";

import PageHeader from "@/components/page/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import strings from "@/lib/strings/secret-transmission.json";
import { useState } from "react";
import { toast } from "sonner";
import { Radio, Wifi, Lock, Terminal, Activity, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SecretTransmission() {
  const [answer, setAnswer] = useState("");
  const [intercepted, setIntercepted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `> ${new Date().toLocaleTimeString()} - ${message}`]);
  };

  const handleIntercept = async () => {
    setLoading(true);
    addLog("INITIATING INTERCEPT SEQUENCE...");
    
    try {
      const res = await fetch("/api/secret-transmission");
      if (res.ok) {
        setTimeout(() => {
          setLoading(false);
          setIntercepted(true);
          addLog("SIGNAL DETECTED.");
          addLog("PACKET CAPTURED. HEADER 'X-Clue' FOUND.");
          toast.success("Signal Intercepted!", {
             description: "Check your network tool to decode the message."
          });
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      addLog("INTERCEPT FAILED.");
    }
  };

  const handleSubmit = () => {
    if (answer.toLowerCase() === strings.pageElements.secretAnswer) {
      toast.success(strings.toastMessages.success);
      addLog("DECRYPTION SUCCESSFUL. ACCESS GRANTED.");
    } else {
      toast.error(strings.toastMessages.error);
      addLog("DECRYPTION FAILED. INVALID KEY.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader>{strings.layout.title}</PageHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Control Panel */}
        <div className="space-y-6">
           <div className="bg-card border rounded-lg p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Radio className={cn("w-5 h-5", loading && "animate-pulse")} />
                <span>INTERCEPT CONTROLS</span>
              </div>
              
              <div className="text-muted-foreground text-sm">
                {strings.messages.intro}
              </div>

              <div className="pt-4">
                <Button 
                    onClick={handleIntercept} 
                    disabled={loading}
                    className={cn("w-full transition-all", loading && "opacity-80")}
                >
                    {loading ? (
                    <span className="flex items-center gap-2">
                        <Activity className="w-4 h-4 animate-spin" /> SCANNING...
                    </span>
                    ) : (
                    <span className="flex items-center gap-2">
                        <Wifi className="w-4 h-4" /> {intercepted ? "RE-SCAN SIGNAL" : strings.pageElements.interceptButton}
                    </span>
                    )}
                </Button>
              </div>
           </div>

           <div className="bg-card border rounded-lg p-6 shadow-sm space-y-4 opacity-100 transition-opacity">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Lock className="w-5 h-5" />
                <span>DECRYPTION MODULE</span>
              </div>
              
              <div className="flex gap-2">
                <Input 
                  placeholder={strings.pageElements.inputPlaceholder} 
                  value={answer} 
                  onChange={(e) => setAnswer(e.target.value)}
                  className="font-mono" 
                />
                <Button onClick={handleSubmit} variant="default">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
           </div>
        </div>

        {/* Terminal/Log Panel */}
        <div className="bg-black text-green-500 font-mono text-xs p-4 rounded-lg border border-primary/50 shadow-inner h-[300px] flex flex-col">
            <div className="flex items-center gap-2 border-b border-green-900/50 pb-2 mb-2 opacity-50">
               <Terminal className="w-3 h-3" />
               <span>{strings.pageElements.terminalTitle}</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1">
               <div className="opacity-50">{strings.pageElements.systemReady}</div>
               {logs.map((log, i) => (
                 <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                    {log}
                 </div>
               ))}
               {loading && <div className="animate-pulse">_</div>}
            </div>
        </div>
      </div>
    </div>
  );
}
