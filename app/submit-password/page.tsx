"use client";

import Hint from "@/components/page/hint";
import PageHeader from "@/components/page/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SubmitPassword() {
  const { theme } = useTheme();
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (theme === "light") {
      setPassword("");
      setShowHint(false);
    }
  }, [theme]);

  const checkPassword = () => {
    const passwordField = document.getElementById("password") as HTMLInputElement;
    const password = passwordField?.value.toLowerCase();
    if (passwordField && passwordField.value === "WRONG") toast.success("Perfect! You cracked it.");
    else if (password === "wrong") {
      if (!showHint) {
        setShowHint(true);
        toast.info("You are close but still something is missing.");
      } else {
        toast.info("Developer tools might help to match the case.");
      }
    } else if (password === "") toast.error("Please enter a password.");
    else toast.error("Check password. Your password is incorrect.");
  };

  return (
    <div className="flex items-start gap-5 flex-col">
      <PageHeader>Submit Password</PageHeader>
      <div>Click the submit button below to continue</div>
      {theme === "dark" && (
        <>
          <Label className="text-white" htmlFor="password">
            Enter the correct password below and submit the form
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value.toLowerCase())}
            className="border-white ring-offset-white focus-visible:ring-white text-white"
          />
        </>
      )}
      <Button onClick={checkPassword} id="button">
        Submit
      </Button>
      {theme === "dark" ? (
        <>
          {showHint ? (
            <Hint>
              Hint: Ever wondered what lies beneath those mysterious asterisks? Think like a developer and try to see
              what you write!
            </Hint>
          ) : (
            <Hint className="text-green-200">Congratulations! I see you&apos;ve found the password box! Nice job.</Hint>
          )}
        </>
      ) : (
        <Hint>
          Hint: Remember, only try debugging code at night, not your sleep schedule during the day. Happy coding,
          nocturnal ninja!
        </Hint>
      )}
    </div>
  );
}
