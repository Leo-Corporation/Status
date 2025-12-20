import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Logo from "@/components/logo";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeSwitcher from "@/components/theme-switcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Status | Léo Corporation",
    template: "%s | Léo Corporation",
  },
  description:
    "Official Status page for Léo Corporation's products and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body
          className={`min-h-screen grid grid-rows-[auto_1fr_auto] bg-background ${inter.className}`}
        >
          <header className="p-2 sticky top-0 w-full border-b bg-white/20 dark:bg-slate-900/20 backdrop-blur-xs backdrop-saturate-150">
            <div className="flex justify-center">
              <Logo height={48} width={180} />
            </div>
          </header>
          <main className="w-full max-w-4xl px-2 mx-auto py-12">
            {children}
          </main>
          <footer className="flex flex-col gap-2 sm:flex-row py-3 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Léo Corporation. All rights
              reserved.
            </p>
            <nav className="sm:ml-auto flex items-center gap-4 sm:gap-6">
              <ThemeSwitcher />
              <Link
                href="https://peyronnet.group/privacy"
                className="text-xs hover:underline underline-offset-4"
                prefetch={false}
              >
                Privacy Policy
              </Link>
              <Link
                href="https://github.com/grp-org/"
                className="text-xs hover:underline underline-offset-4"
                prefetch={false}
              >
                GitHub
              </Link>
              <Link
                href="https://x.com/PeyronnetGroup"
                className="text-xs hover:underline underline-offset-4"
                prefetch={false}
              >
                Follow Us
              </Link>
            </nav>
          </footer>
        </body>
      </ThemeProvider>
    </html>
  );
}
