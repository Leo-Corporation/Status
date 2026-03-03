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
    description: "Official Status page for Léo Corporation's products and services.",
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
                    className={`bg-background grid min-h-screen grid-rows-[auto_1fr_auto] ${inter.className}`}
                >
                    <header className="sticky top-0 w-full border-b bg-white/20 p-2 backdrop-blur-xs backdrop-saturate-150 dark:bg-slate-900/20">
                        <div className="flex justify-center">
                            <Logo height={48} width={180} />
                        </div>
                    </header>
                    <main className="mx-auto w-full max-w-4xl px-2 py-12">{children}</main>
                    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-3 sm:flex-row md:px-6">
                        <p className="text-muted-foreground text-xs">
                            &copy; {new Date().getFullYear()} Léo Corporation. All rights reserved.
                        </p>
                        <nav className="flex items-center gap-4 sm:ml-auto sm:gap-6">
                            <ThemeSwitcher />
                            <Link
                                href="https://peyronnet.group/privacy"
                                className="text-xs underline-offset-4 hover:underline"
                                prefetch={false}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="https://github.com/grp-org/"
                                className="text-xs underline-offset-4 hover:underline"
                                prefetch={false}
                            >
                                GitHub
                            </Link>
                            <Link
                                href="https://x.com/PeyronnetGroup"
                                className="text-xs underline-offset-4 hover:underline"
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
