"use client";

import Hint from "@/components/page/common/hint";
import PageHeader from "@/components/page/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import commonStrings from "@/lib/strings/common.json";
import strings from "@/lib/strings/submit-password.json";

export default function SubmitPassword() {
  const { theme } = useTheme();
  const [password, setPassword] = useState(commonStrings.texts.emptyString);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (theme === commonStrings.theme.lightTheme) {
      setPassword(commonStrings.texts.emptyString);
      setShowHint(false);
    }
  }, [theme]);

  const checkPassword = () => {
    const passwordField = document.getElementById(strings.pageElements.passwordInputId) as HTMLInputElement;
    const password = passwordField?.value.toLowerCase();
    if (passwordField && passwordField.value === process.env.NEXT_PUBLIC_SUBMIT_PASSWORD_KEY?.toUpperCase())
      toast.success(strings.toastMessages.success);
    else if (password === process.env.NEXT_PUBLIC_SUBMIT_PASSWORD_KEY) {
      if (!showHint) {
        setShowHint(true);
        toast.info(strings.toastMessages.hintHidden);
      } else {
        toast.info(strings.toastMessages.hintShown);
      }
    } else if (!password || password === commonStrings.texts.emptyString) toast.error(strings.toastMessages.noPassword);
    else toast.error(strings.toastMessages.wrongPassword);
  };

  return (
    <div className="flex items-start gap-5 flex-col">
      <PageHeader>{strings.layout.title}</PageHeader>
      {theme === commonStrings.theme.lightTheme && <div>{strings.messages.lightModeMessage}</div>}
      {theme === commonStrings.theme.darkTheme && (
        <>
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
        </>
      )}
      <Button onClick={checkPassword}>{strings.pageElements.submitButtonText}</Button>
      {theme === commonStrings.theme.darkTheme ? (
        showHint && <Hint>{strings.hints.darkModeHint}</Hint>
      ) : (
        <Hint>{strings.hints.lightModeHint}</Hint>
      )}
    </div>
  );
}
