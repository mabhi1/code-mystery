import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import clsx from "clsx";
import Header from "@/components/header/header";
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
      <body className={clsx(inter.className, "flex min-h-screen text-sm bg-background text-foreground overflow-hidden")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* CRT Scanline & Vignette Overlay */}
          <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
          <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

          {/* Main Terminal Container */}
          <div className="flex-1 p-2 md:p-6 h-screen flex flex-col relative z-0">
             <div className="flex-1 border border-border rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.05)] bg-card/90 flex flex-col overflow-hidden relative">
                
                {/* Top Status Bar / Header */}
                <header className="border-b border-border bg-muted/50 px-6 py-4 flex-shrink-0">
                   <Header />
                </header>

                {/* Main Workspace */}
                <div className="flex-1 flex overflow-hidden">
                   {/* Navigation Pane */}
                   <aside className="hidden md:block w-64 border-r border-border bg-muted/20 p-6 overflow-y-auto">
                      <Sidebar />
                   </aside>

                   {/* Active Challenge Viewport */}
                   <main className="flex-1 relative overflow-hidden bg-[linear-gradient(to_bottom,rgba(0,20,0,0.1),transparent)] flex flex-col">
                       {/* Scrollable Content */}
                       <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
                          <div className="max-w-5xl mx-auto w-full">
                              {children}
                          </div>
                       </div>
                   </main>
                </div>

                {/* System Footer Status */}
                <footer className="border-t border-border bg-muted/50 py-2 px-6 text-xs flex-shrink-0">
                   <Footer />
                </footer>
             </div>
             
             {/* Mobile Error */}
             <div className="md:hidden absolute inset-0 bg-background z-50 flex items-center justify-center p-10 text-center text-primary font-mono border-4 border-primary">
                <div className="space-y-4">
                    <div className="text-4xl font-bold animate-pulse">ERROR_418</div>
                    <div className="text-xl">MOBILE_TERMINAL_NOT_SUPPORTED</div>
                    <div className="text-sm opacity-70">{strings.messages.mobileDeviceError}</div>
                </div>
             </div>
          </div>

          <Toaster position="top-right" theme="dark" className="font-mono" />
        </ThemeProvider>
      </body>
    </html>
  );
}
