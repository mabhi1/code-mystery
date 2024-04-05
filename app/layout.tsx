import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import clsx from "clsx";
import Header from "@/components/header/header";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/page/sidebar";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Mystery",
  description: "Solve mystery puzzles by using basics of web development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "w-full min-h-screen flex flex-col gap-5 text-sm")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <Separator className="w-full max-w-7xl mx-auto" />
          <div className="flex-1 gap-20 h-fit hidden sm:flex px-5 max-w-7xl mx-auto w-full">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
          <div className="flex-1 sm:hidden p-5 text-xl">
            Please continue on a larger device. Some of the functions are disabled for smaller devices.
          </div>
          <Toaster position="top-center" />
          <Separator className="w-full max-w-7xl mx-auto" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
