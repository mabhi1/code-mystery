import { Metadata } from "next";
import strings from "@/lib/strings/crime-story.json";

export const metadata: Metadata = {
  title: strings.layout.title,
  description: strings.layout.description,
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
