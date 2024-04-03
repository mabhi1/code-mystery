import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="text-xl text-center">Welcome to the code mystery challenges for developers.</div>
      <div className="text-base px-10 text-center">
        Read all the prompts carefully. See all the hints. Think like a developer and try to solve the challenges. You
        might need the basics of web development techniques to go throught the challenges. Don&apos;t hesitate to search
        the web if you are stuck anywhere. All the best 🙂
      </div>
      <div className="text-base text-center">Navigate through the menu to start</div>
    </div>
  );
}
