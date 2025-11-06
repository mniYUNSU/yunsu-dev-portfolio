"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar() {
  const [activeSection, setActiveSection] = useState<
    (typeof NAV_ITEMS)[number]["id"]
  >(() => {
    if (typeof window === "undefined") {
      return "home";
    }
    const hash = window.location.hash.replace("#", "");
    return NAV_IDS.includes(hash as (typeof NAV_IDS)[number])
      ? (hash as (typeof NAV_ITEMS)[number]["id"])
      : "home";
  });

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    if (NAV_IDS.includes(hash as (typeof NAV_IDS)[number])) {
      setActiveSection(hash as (typeof NAV_ITEMS)[number]["id"]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [handleHashChange]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Prioritize the section with the highest visible area to keep the nav highlight intuitive.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id as typeof activeSection);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    NAV_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="#home"
          className="group text-foreground hover:text-brand inline-flex items-center gap-2 text-sm font-semibold tracking-tight transition"
        >
          <span>Yunsu.dev</span>
          <span className="border-border/60 group-hover:border-brand/60 group-hover:text-brand/80 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-widest text-neutral-500 uppercase transition dark:text-neutral-300">
            Portfolio
          </span>
        </Link>

        <nav
          className="border-border/60 bg-background/70 relative ml-auto max-w-full overflow-x-auto rounded-full border px-1 py-1 shadow-[0_10px_30px_-25px_rgba(15,15,35,0.65)]"
          aria-label="Primary"
        >
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    className={cn(
                      "focus-visible:ring-brand/60 focus-visible:ring-offset-background relative block rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                      isActive
                        ? "text-brand"
                        : "text-neutral-500 transition-colors dark:text-neutral-300",
                    )}
                    onClick={() => setActiveSection(item.id)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-pill"
                        className="bg-brand/15 absolute inset-0 -z-10 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 250,
                          damping: 30,
                        }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden shrink-0 md:flex">
          <Link
            href="#contact"
            className="bg-brand text-brand-foreground shadow-soft hover:shadow-elevated focus-visible:ring-brand/70 focus-visible:ring-offset-background inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
