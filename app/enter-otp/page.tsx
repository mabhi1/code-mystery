"use client";

import Hint from "@/components/page/common/hint";
import PageHeader from "@/components/page/layout/page-header";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import strings from "@/lib/strings/enter-otp.json";

export default function EnterOTP() {
  const [randomNumber, setRandomNumber] = useState(Math.floor(100000 + Math.random() * 900000));
  const [code, setCode] = useState(strings.pageElements.defaultCode);
  const [value, setValue] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [hint, setHint] = useState(strings.hints.defaultHint);
  const editorRef = useRef<HTMLInputElement>();

  const generateOTP = () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    setRandomNumber(generatedOTP);
    console.log(strings.hints.consoleHint, `color:${strings.pageElements.consoleColor}`);
    sessionStorage.setItem(strings.pageElements.sessionVariable, generatedOTP.toString());
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
      toast.error(strings.toastMessages.invalidOTP);
      return;
    }

    setHint(strings.hints.sourceCodeHint);

    const res = await fetch(process.env.NEXT_PUBLIC_CODE_EXECUTE_URL!, {
      method: "POST",
      body: JSON.stringify({
        language: strings.pageElements.codeExecuteLanguage,
        version: strings.pageElements.codeExecuteLanguageVersion,
        files: [
          {
            content: `${code}${strings.pageElements.codeTestCases}`,
          },
        ],
      }),
    });
    const data = await res.json();

    if (data.run.output !== strings.pageElements.codeResult) {
      toast.info(strings.toastMessages.codeMismatch);
      return;
    }

    toast.success(strings.toastMessages.success);
  };

  const resetCode = () => {
    setCode(strings.pageElements.defaultCode);
  };

  return (
    <div className="space-y-5">
      <PageHeader>{strings.layout.title}</PageHeader>
      {showCode ? (
        <>
          <div>{strings.pageElements.codeEditorTitle}</div>
          <div className="text-lg rounded-md w-full h-fit overflow-hidden">
            <Editor
              height="30rem"
              width="100%"
              defaultLanguage={strings.pageElements.codeExecuteLanguage}
              value={code}
              onChange={(value) => changeCode(value)}
              theme="vs-dark"
              onMount={onMount}
            />
          </div>
          <div className="flex justify-end items-center gap-5">
            <Button onClick={() => setShowCode(false)}>{strings.pageElements.saveButtonText}</Button>
            <Button onClick={resetCode} variant="secondary">
              {strings.pageElements.resetButtonText}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>{strings.messages.pageMessage}</div>
          <div className="flex items-center gap-5">
            <Button onClick={generateOTP}>{strings.pageElements.otpButtonText}</Button>
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
            <Button onClick={checkOTP}>{strings.pageElements.submitButtonText}</Button>
            <Button onClick={() => setShowCode(true)} variant="secondary" className="ml-auto">
              {strings.pageElements.editCodeButtonText}
            </Button>
          </div>
          <Hint>{hint}</Hint>
        </>
      )}
    </div>
  );
}
