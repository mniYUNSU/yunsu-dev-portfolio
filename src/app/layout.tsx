import type { Metadata } from "next";
import { generateDefaultSeo, type DefaultSeoProps } from "next-seo/pages";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgressBar } from "@/components/layout/scroll-progress";
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

const defaultSeo: DefaultSeoProps = {
  titleTemplate: "%s | Yunsu.dev",
  defaultTitle: "Yunsu.dev – Developer Portfolio",
  description:
    "Yunsu is a senior front-end engineer crafting performant, accessible interfaces with Next.js, React, and TypeScript.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yunsu.dev",
    siteName: "Yunsu.dev",
    images: [
      {
        url: "https://yunsu.dev/og-image.png",
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
      <head>{defaultSeoTags}</head>
      <body
        className={cn(
          "bg-background text-foreground flex justify-center antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ScrollProgressBar />
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-border/40 border-t">
            <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-neutral-500 md:flex-row dark:text-neutral-400">
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
      </body>
    </html>
  );
}
