import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import clsx from "clsx";
import Header from "@/components/header/header";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/page/layout/sidebar";
import Footer from "@/components/footer/footer";
import strings from "@/lib/strings/index-page.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: strings.layout.title,
  description: strings.layout.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "flex min-h-screen text-sm")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex-1 w-full max-w-7xl mx-auto p-5 flex flex-col gap-5">
            <Header />
            <Separator />
            <div className="flex-1 gap-20 h-fit hidden sm:flex">
              <Sidebar />
              <main className="flex-1">{children}</main>
            </div>
            <div className="flex-1 sm:hidden p-5 text-xl">{strings.messages.mobileDeviceError}</div>
            <Toaster position="top-center" />
            <Separator />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
