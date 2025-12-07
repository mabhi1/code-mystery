"use client";

import Hint from "@/components/page/common/hint";
import PageHeader from "@/components/page/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import commonStrings from "@/lib/strings/common.json";
import strings from "@/lib/strings/submit-password.json";
import { matchPassword } from "@/actions/submit-password";

export default function SubmitPassword() {
  const [password, setPassword] = useState(commonStrings.texts.emptyString);
  const [showHint, setShowHint] = useState(1);

  const checkPassword = async () => {
    try {
      const passwordField = document.getElementById(strings.pageElements.passwordInputId) as HTMLInputElement;
      const password = passwordField?.value.toLowerCase();
      if (passwordField) {
        const matchedResult = passwordField && (await matchPassword(passwordField.value, password, true));
        const unmatchedResult = await matchPassword(passwordField.value, password, false);
        if (matchedResult) toast.success(strings.toastMessages.success);
        else if (unmatchedResult) {
          if (showHint <= 5) {
            setShowHint((prev) => prev + 1);
            toast.info(strings.toastMessages.hintHidden);
          } else {
            setShowHint(1);
            toast.info(strings.toastMessages.hintShown);
          }
        } else if (!password || password === commonStrings.texts.emptyString)
          toast.error(strings.toastMessages.noPassword);
        else toast.error(strings.toastMessages.wrongPassword);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-full max-w-md space-y-8 p-8 bg-card border rounded-lg shadow-lg relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4a556812_1px,transparent_1px),linear-gradient(to_bottom,#4a556812_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
            <PageHeader>{strings.layout.title}</PageHeader>
            
            <div className="dark:hidden font-mono text-red-500 font-bold border-2 border-red-500 p-4 rounded uppercase text-center animate-pulse">
                {strings.messages.lightModeMessage}
            </div>
            
            <div className="hidden dark:flex flex-col gap-6">
                <div className="space-y-2">
                    <Label className="text-muted-foreground font-mono uppercase text-xs tracking-widest" htmlFor={strings.pageElements.passwordInputId}>
                    {strings.pageElements.passwordLabel}
                    </Label>
                    <div className="relative group">
                        <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                        id={strings.pageElements.passwordInputId}
                        type={strings.pageElements.passwordInputId}
                        value={password}
                        onChange={(event) => setPassword(event.target.value.toLowerCase())}
                        className="pl-9 font-mono tracking-widest bg-background/50 border-input focus-visible:ring-primary/50 text-foreground"
                        placeholder="ENTER ACCESS CODE"
                        />
                    </div>
                </div>
                
                <Button onClick={checkPassword} className="w-full font-mono font-bold tracking-widest">
                    {strings.pageElements.submitButtonText}
                </Button>
            </div>

            {showHint && <Hint className="hidden dark:block border-primary/50 bg-primary/10 text-primary">{strings.hints.darkModeHint}</Hint>}
            <Hint className="dark:hidden border-red-500/50 bg-red-500/10 text-red-500">{strings.hints.lightModeHint}</Hint>
        </div>
      </div>
    </div>
  );
}
