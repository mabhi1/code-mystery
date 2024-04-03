import Link from "next/link";

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
      <div className="font-medium text-base">Challenges</div>
      <ul className="flex flex-col gap-2">
        <li>
          <MenuItem href="submit-password">Submit Password</MenuItem>
        </li>
        <li>
          <MenuItem href="enter-otp">Enter OTP</MenuItem>
        </li>
      </ul>
    </menu>
  );
}
