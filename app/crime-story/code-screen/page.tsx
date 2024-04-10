"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "@monaco-editor/react";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function CodeScreen() {
  return (
    <>
      <Link href="/crime-story">
        <Button variant="link" className="mb-5">
          <ArrowLeftIcon className="w-4 mr-1" />
          Back to challenge
        </Button>
      </Link>
      <div className="text-lg rounded-md w-full h-fit overflow-hidden">
        <Editor
          height="25rem"
          width="100%"
          defaultLanguage="python"
          defaultValue={`\ndef generateMyID(zip, key):\n\tsymbol_mapper = {\n\t1: '!',\n\t2: '@',\n\t3: '^',\n\t4: '$',\n\t5: '%',\n\t6: '#',\n\t7: '&'\n\t}\n\t\n\tid = []\n\tid.append(chr(int(zip[1]+zip[1]+zip[1])))\n\tid.append(zip[-1])\n\tid.append(symbol_mapper[int(key[0])])\n\tid.append(key[-1])\n\tid.append(chr(38*int(zip[0])))\n\tid.append(zip[0])\n\t\n\treturn ''.join(id)`}
          theme="vs-dark"
        />
      </div>
    </>
  );
}
