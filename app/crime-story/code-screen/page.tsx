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
          height="40rem"
          width="100%"
          defaultLanguage="python"
          defaultValue={`\n# run the function below to get your ID\n# complete all TODO tasks\n# debug and remove all the errors\ndef generateMyID(zip_code, key):\n\n\tdef getAlphabet(s):\n\t\tnumbers = ''.join(s.split("."))\n\t\ts = sum(map(lambda x: int(x), numbers))\n\t\treturn chr(ord('a') + s - 1)\n\n\tdef getFibonacci(n):\n\t\t# TODO\n\t\t# get nth fbonacci number\n\n\tfib_number = getFibonacci(zip_code[:3])\n\n\t# a fake ipv4 address\n\tfake_ipv4 = "111.153.341.231"\n\n\t# remove first three numbers from the above ipv4\n\trem_ipv4 = fake_ipv4.lstrip("111.")\n\n\t# list to store each character of the id\n\tmy_id = []\n\tmy_id.append(getAlphabet(rem_ipv4))\n\tmy_id.append(str(int(rem_ipv4[0]) + int(key[2])))\n\tmy_id.append('^')\n\tmy_id.append(fib_number[-3:])\n\n\t# return the id as a string\n\treturn ''.join(my_id)\n`}
          theme="vs-dark"
        />
      </div>
    </>
  );
}
