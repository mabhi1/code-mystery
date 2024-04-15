"use client";

import Hint from "@/components/page/common/hint";
import PageHeader from "@/components/page/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="flex items-start gap-5 flex-col">
      <PageHeader>{strings.layout.title}</PageHeader>
      <div className="dark:hidden">{strings.messages.lightModeMessage}</div>
      <div className="hidden dark:flex items-start gap-5 flex-col w-3/4 min-w-28">
        <Label className="text-white" htmlFor={strings.pageElements.passwordInputId}>
          {strings.pageElements.passwordLabel}
        </Label>
        <Input
          id={strings.pageElements.passwordInputId}
          type={strings.pageElements.passwordInputId}
          value={password}
          onChange={(event) => setPassword(event.target.value.toLowerCase())}
          className="border-white ring-offset-white focus-visible:ring-white text-white"
        />
      </div>
      <Button onClick={checkPassword}>{strings.pageElements.submitButtonText}</Button>
      {showHint && <Hint className="hidden dark:block">{strings.hints.darkModeHint}</Hint>}
      <Hint className="dark:hidden">{strings.hints.lightModeHint}</Hint>
    </div>
  );
}
