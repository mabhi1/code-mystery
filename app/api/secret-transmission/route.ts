import { NextResponse } from "next/server";
import strings from "@/lib/strings/secret-transmission.json";

export async function GET() {
  // Base64 encode the riddle: "What is the color of the sky?"
  // Result: V2hhdCBpcyB0aGUgY29sb3Igb2YgdGhlIHNreT8=
  const secretClue = Buffer.from(strings.messages.riddle).toString("base64");

  return NextResponse.json(
    { message: "Transmission received. But where is the content?" },
    {
      headers: {
        "X-Clue": secretClue,
      },
    }
  );
}
