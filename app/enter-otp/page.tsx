"use client";

import Hint from "@/components/page/common/hint";
import PageHeader from "@/components/page/layout/page-header";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import strings from "@/lib/strings/enter-otp.json";
import { Cpu, Code as CodeIcon } from "lucide-react";

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
      if (Number(value) === randomNumber) setHint(strings.hints.sourceCodeHint);
      toast.info(strings.toastMessages.codeMismatch);
      return;
    }

    toast.success(strings.toastMessages.success);
  };

  const resetCode = () => {
    setCode(strings.pageElements.defaultCode);
  };

  return (
    <div className="flex justify-center min-h-[60vh] items-center">
      <div className="max-w-3xl w-full grid md:grid-cols-2 gap-8">
        
        {/* Secure Token Device UI */}
        <div className="bg-neutral-900 border-4 border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center gap-6">
            <div className="absolute top-4 w-12 h-1 bg-neutral-800 rounded-full" />
            <div className="w-full bg-[#9ea792] h-32 rounded-lg font-mono text-4xl flex items-center justify-center tracking-[0.5em] shadow-inner text-black relative font-bold font-digital">
               ******
               <div className="absolute top-2 left-2 text-[10px] tracking-normal opacity-50">SECURE_TOKEN_V2</div>
            </div>
            
            <Button 
                onClick={generateOTP} 
                className="w-full h-16 rounded-xl bg-neutral-800 hover:bg-neutral-700 border-b-4 border-neutral-950 active:border-b-0 active:translate-y-1 transition-all text-lg font-bold tracking-wider"
            >
                {strings.pageElements.otpButtonText}
            </Button>

            <div className="text-xs text-neutral-600 font-mono text-center">
                DEVICE SERIAL: {Math.random().toString(36).substring(7).toUpperCase()}
            </div>
        </div>

        {/* Input & Verification Panel */}
        <div className="space-y-6">
            <PageHeader>{strings.layout.title}</PageHeader>
            
            {showCode ? (
                <div className="space-y-4 bg-card border rounded-lg p-4 animate-in slide-in-from-right-4">
                  <div className="flex items-center gap-2 text-primary border-b border-primary/20 pb-2">
                     <CodeIcon className="w-4 h-4" />
                     <span className="font-mono text-sm font-bold">SOURCE_OVERRIDE</span>
                  </div>
                  <div className="text-lg rounded-md w-full h-[300px] overflow-hidden border border-green-900/50">
                    <Editor
                      height="100%"
                      width="100%"
                      defaultLanguage={strings.pageElements.codeExecuteLanguage}
                      value={code}
                      onChange={(value) => changeCode(value)}
                      theme="vs-dark"
                      onMount={onMount}
                      options={{ minimap: { enabled: false }, fontSize: 13, fontFamily: 'monospace' }}
                    />
                  </div>
                  <div className="flex justify-end items-center gap-4">
                    <Button onClick={() => setShowCode(false)} variant="outline" size="sm">
                        {strings.pageElements.saveButtonText}
                    </Button>
                    <Button onClick={resetCode} variant="ghost" size="sm">
                       {strings.pageElements.resetButtonText}
                    </Button>
                  </div>
                </div>
            ) : (
                <div className="space-y-6 p-6 bg-card border rounded-lg shadow-sm">
                   <div className="space-y-2">
                      <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Authentication Required</div>
                      <div className="text-xs text-muted-foreground">{strings.messages.pageMessage}</div>
                   </div>

                   <div className="flex justify-center py-4">
                        <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className="h-12 w-10 border-primary/30" />
                            <InputOTPSlot index={1} className="h-12 w-10 border-primary/30" />
                            <InputOTPSlot index={2} className="h-12 w-10 border-primary/30" />
                            <InputOTPSlot index={3} className="h-12 w-10 border-primary/30" />
                            <InputOTPSlot index={4} className="h-12 w-10 border-primary/30" />
                            <InputOTPSlot index={5} className="h-12 w-10 border-primary/30" />
                        </InputOTPGroup>
                        </InputOTP>
                   </div>

                    <div className="flex gap-4">
                        <Button onClick={checkOTP} className="flex-1" variant="default">
                            {strings.pageElements.submitButtonText}
                        </Button>
                        <Button onClick={() => setShowCode(true)} variant="secondary" size="icon">
                            <Cpu className="w-4 h-4" />
                        </Button>
                    </div>

                    <Hint>{hint}</Hint>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
