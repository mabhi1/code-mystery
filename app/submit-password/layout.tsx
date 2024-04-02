import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Password",
  description: "Find the correct password and submit it",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
