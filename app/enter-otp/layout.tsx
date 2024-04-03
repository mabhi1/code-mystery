import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enter OTP",
  description: "Generate and submit the correct otp",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
