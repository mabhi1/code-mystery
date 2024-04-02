import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import clsx from "clsx";
import Header from "@/components/header/header";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Mystery",
  description: "Solve mystery puzzles to learn basics of javascript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "w-full max-w-5xl mx-auto min-h-screen space-y-5 px-2")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <Separator />
          <main>{children}</main>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
