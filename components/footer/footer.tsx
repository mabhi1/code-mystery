import commonStrings from "@/lib/strings/common.json";

export default function Footer() {
  return (
    <div className="flex justify-between items-center text-xs text-muted-foreground font-mono border-t border-green-900/30 pt-4 opacity-70">
        <div>{commonStrings.layout.footer}</div>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>SECURE CONNECTION ESTABLISHED</span>
        </div>
    </div>
  );
}
