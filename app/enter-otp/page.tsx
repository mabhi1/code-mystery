"use client";

import Hint from "@/components/page/hint";
import PageHeader from "@/components/page/page-header";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const defaultCode = `\n// Function to check if input matches with OTP\n// params {input} list of entered number\n// params {otp} generated otp\nfunction checkOTP(input, otp) {\n\tif (input && input.length === 6 && otp >= 100000 && otp < 10000000) {\n\t\tconst enteredOTP = input.join('');\n\t\treturn enteredOTP === otp;\n\t}\n}\n`;

export default function EnterOTP() {
  const [randomNumber, setRandomNumber] = useState(Math.floor(100000 + Math.random() * 900000));
  const [code, setCode] = useState(defaultCode);
  const [value, setValue] = useState("");
  const [showCode, setShowCode] = useState(false);
  const editorRef = useRef<HTMLInputElement>();

  const generateOTP = () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    setRandomNumber(generatedOTP);
    console.log(
      "%cIt is not a good idea to send OTP in console. Look at a more secure place in your browser.",
      "color:green"
    );
    sessionStorage.setItem("OTP", generatedOTP.toString());
  };

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const changeCode = (value: string | undefined) => {
    if (!value) return;
    setCode(value);
  };

  const checkOTP = async () => {
    if (!value || Number(value) !== randomNumber) {
      toast.error("Invalid OTP");
      return;
    }

    document.getElementById("submit-the-otp-hint")!.textContent =
      "Hint: Your OTP looks good. Looking at the source code might help.";

    const res = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      body: JSON.stringify({
        language: "javascript",
        version: "18.15.0",
        files: [
          {
            content: `${code}\nconsole.log(checkOTP([1,2,3,4,5,6], 123456))\nconsole.log(checkOTP([1,2,3,4,5,1], 123456))`,
          },
        ],
      }),
    });
    const data = await res.json();

    if (data.run.output !== "true\nfalse\n") {
      toast.info("You are close but still something is missing.");
      return;
    }

    toast.success("Perfect! You cracked it");
  };

  const resetCode = () => {
    setCode(defaultCode);
  };

  return (
    <div className="space-y-5">
      <PageHeader>Enter One Time Passcode</PageHeader>
      {showCode ? (
        <>
          <div>Language: JavaScript</div>
          <div className="text-lg rounded-md w-full h-fit overflow-hidden">
            <Editor
              height="30rem"
              width="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => changeCode(value)}
              theme="vs-dark"
              onMount={onMount}
            />
          </div>
          <Button onClick={resetCode}>Reset code</Button>
        </>
      ) : (
        <>
          <div>Generate and submit the received OTP</div>
          <div className="flex items-center gap-5">
            <Button onClick={generateOTP}>Get OTP</Button>
            <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button onClick={checkOTP}>Submit</Button>
            <Button onClick={() => setShowCode((showCode) => !showCode)} variant="secondary" className="ml-auto">
              {showCode ? "Save" : "Edit Source Code"}
            </Button>
          </div>
          <Hint id="submit-the-otp-hint">Hint: Look at a place where developers get important messages. </Hint>
        </>
      )}
    </div>
  );
}
