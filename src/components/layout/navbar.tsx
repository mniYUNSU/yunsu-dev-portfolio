"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  // Breakpoints: mobile shows sheet menu, md reveals inline nav, lg keeps CTA persistent.
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "border-border/40 sticky top-0 z-40 border-b transition-all duration-300",
        hasScrolled
          ? "bg-background/85 shadow-[0_12px_30px_-24px_rgba(15,15,35,0.65)] backdrop-blur"
          : "bg-background/70",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6 md:py-4">
        <Link
          href="#home"
          className="group text-foreground hover:text-brand inline-flex items-center gap-2 text-sm font-semibold tracking-tight transition"
        >
          <span>Yunsu.dev</span>
          <span className="border-border/60 group-hover:border-brand/60 group-hover:text-brand/80 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-widest text-neutral-500 uppercase transition dark:text-neutral-300">
            Portfolio
          </span>
        </Link>

        <button
          type="button"
          className="text-foreground focus-visible:ring-brand/60 focus-visible:ring-offset-background border-border/50 bg-surface/80 hover:text-brand inline-flex size-11 items-center justify-center rounded-xl border transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>

        <nav
          className="border-border/60 bg-background/70 relative ml-auto hidden overflow-x-auto rounded-full border px-1 py-1 shadow-[0_10px_30px_-25px_rgba(15,15,35,0.65)] md:block"
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

        <div className="hidden shrink-0 sm:flex">
          <Link
            href="#contact"
            className="bg-brand text-brand-foreground shadow-soft hover:shadow-elevated focus-visible:ring-brand/70 focus-visible:ring-offset-background inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="bg-background/60 fixed inset-0 z-30 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.nav
              className="border-border/60 bg-surface/95 absolute top-20 right-4 flex w-[88%] max-w-xs flex-col gap-2 rounded-2xl border p-6 shadow-[0_32px_80px_-40px_rgba(15,15,35,0.7)]"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, x: 24 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.22, ease: [0.33, 1, 0.68, 1] },
              }}
              exit={{ opacity: 0, x: 24, transition: { duration: 0.18 } }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-300">
                  Navigate
                </span>
                <span className="border-border/60 rounded-full border px-3 py-1 text-xs text-neutral-500 dark:text-neutral-300">
                  Swipe down
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={`#${item.id}`}
                        className={cn(
                          "focus-visible:ring-brand/60 focus-visible:ring-offset-background relative block rounded-xl px-4 py-3 text-base font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:text-sm",
                          isActive
                            ? "bg-brand/10 text-brand"
                            : "text-neutral-600 dark:text-neutral-200",
                        )}
                        onClick={() => {
                          setActiveSection(item.id);
                          setIsMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="#contact"
                className="bg-brand text-brand-foreground shadow-soft hover:shadow-elevated focus-visible:ring-brand/70 focus-visible:ring-offset-background inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                onClick={() => setIsMenuOpen(false)}
              >
                Let&apos;s Talk
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
