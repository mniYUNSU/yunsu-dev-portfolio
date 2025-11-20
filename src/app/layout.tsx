import type { Metadata } from "next";
import Script from "next/script";
import { generateDefaultSeo, type DefaultSeoProps } from "next-seo/pages";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgressBar } from "@/components/layout/scroll-progress";
import { SmoothScrollHandler } from "@/components/layout/smooth-scroll-handler";
import { ScrollToTopButton } from "@/components/layout/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProvider } from "@/context/locale-context";
import { cn } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://yunsu.dev";
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

const defaultSeo: DefaultSeoProps = {
  titleTemplate: "%s | Yunsu.dev",
  defaultTitle: "Yunsu.dev – Developer Portfolio",
  description:
    "Yunsu is a senior front-end engineer crafting performant, accessible interfaces with Next.js, React, and TypeScript.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Yunsu.dev",
    images: [
      {
        url: `${BASE_URL}/og/default.png`,
        width: 1200,
        height: 630,
        alt: "Yunsu – Developer Portfolio",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
    handle: "@yunsu",
    site: "@yunsu",
  },
};

export const metadata: Metadata = {
  title: {
    default: "Yunsu.dev – Developer Portfolio",
    template: "%s | Yunsu.dev",
  },
  description:
    "Portfolio of Yunsu, a senior Next.js and front-end engineer focused on building immersive product experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultSeoTags = generateDefaultSeo(defaultSeo);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {defaultSeoTags}
        {PLAUSIBLE_DOMAIN ? (
          <Script
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body
        className={cn(
          "bg-background text-foreground flex min-h-screen flex-col antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <LocaleProvider>
          <SmoothScrollHandler />
          <ScrollProgressBar />
          <div className="relative flex flex-1 flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-border/40 border-t">
              <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-neutral-500 sm:px-6 md:flex-row md:py-12 dark:text-neutral-400">
                <span>
                  &copy; {new Date().getFullYear()} Yunsu. All rights reserved.
                </span>
                <div className="flex items-center gap-4">
                  <a
                    className="hover:text-primary transition"
                    href="https://github.com/yunsux"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    className="hover:text-primary transition"
                    href="https://www.linkedin.com/in/yunsu"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </footer>
          </div>
          <ScrollToTopButton />
          <Toaster />
        </LocaleProvider>
      </body>
    </html>
  );
}
