import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Meeting",
  description: "Find the meeting id and join the meeting",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
