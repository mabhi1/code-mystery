import Link from "next/link";
import commonStrings from "@/lib/strings/common.json";

const MenuItem = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <Link href={href} className="hover:text-black text-slate-400 dark:hover:text-white">
      {children}
    </Link>
  );
};

export default function Sidebar() {
  return (
    <menu className="min-w-40 space-y-5">
      <div className="font-medium text-base">{commonStrings.challengesMenu.title}</div>
      <ul className="flex flex-col gap-2">
        <li>
          <MenuItem href={commonStrings.challengesMenu.submitPassword.url}>
            {commonStrings.challengesMenu.submitPassword.title}
          </MenuItem>
        </li>
        <li>
          <MenuItem href={commonStrings.challengesMenu.enterOTP.url}>
            {commonStrings.challengesMenu.enterOTP.title}
          </MenuItem>
        </li>
        <li>
          <MenuItem href={commonStrings.challengesMenu.findMeetingId.url}>
            {commonStrings.challengesMenu.findMeetingId.title}
          </MenuItem>
        </li>
      </ul>
    </menu>
  );
}
