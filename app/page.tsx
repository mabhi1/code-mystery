import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="text-2xl">Welcome to the code mystery challenges for developers.</div>
      <div className="text-lg">
        Read all the prompts carefully. See all the hints. Think like a developer and try to solve the challenges. You
        might need the basics of web development techniques to go throught the challenges. Don&apos;t hesitate to search
        the web if you are stuck anywhere. All the best 🙂.
      </div>
      <Link href="/submit-password" passHref legacyBehavior>
        <Button>Click to start the challenge</Button>
      </Link>
    </div>
  );
}
