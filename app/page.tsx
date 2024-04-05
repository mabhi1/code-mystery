import strings from "@/lib/strings/index-page.json";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="text-xl text-center">{strings.messages.heading1}</div>
      <div className="text-base px-10 text-center">{strings.messages.heading2}</div>
      <div className="text-base text-center">{strings.messages.heading3}</div>
    </div>
  );
}
