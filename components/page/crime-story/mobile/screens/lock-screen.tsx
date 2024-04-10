"use client";

import Hint from "@/components/page/common/hint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

export default function LockScreen({ setScreen }: { setScreen: Dispatch<SetStateAction<string>> }) {
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (otp === sessionStorage.getItem("OTP") && name.toLowerCase() === process.env.NEXT_PUBLIC_MEETING_ID_NAME) {
      setScreen("mainScreen");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="space-y-5 mt-20">
      <Image src="/org-logo.jpeg" alt="hacker" width={50} height={50} className="rounded-full mx-auto w-fit" />
      <div className="text-base">Enter your name and OTP to unlock</div>
      <div className="space-y-5 w-full">
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
      </div>
      <Button onClick={handleSubmit} className="w-full">
        Unlock Phone
      </Button>
      <Hint className="text-xs">Solve previous challenges for credentials</Hint>
      <div className="text-base font-medium text-red-800 mx-auto w-fit">{error}</div>
    </div>
  );
}
