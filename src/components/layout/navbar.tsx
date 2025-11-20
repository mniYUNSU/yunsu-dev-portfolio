"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/context/locale-context";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "home", labelKey: "home" },
  { id: "about", labelKey: "about" },
  { id: "projects", labelKey: "projects" },
  { id: "skills", labelKey: "skills" },
  { id: "experience", labelKey: "experience" },
  { id: "contact", labelKey: "contact" },
] as const;

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

const LANGUAGES = [
  { code: "ko", label: "KO" },
  { code: "ja", label: "JA" },
  { code: "en", label: "EN" },
] as const;

export function Navbar() {
  // Breakpoints: mobile shows sheet menu, md reveals inline nav, lg keeps CTA persistent.
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, setLocale, translations } = useLocale();
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
    <header className="sticky top-4 z-50 px-4">
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 rounded-2xl border border-white/30 bg-white/55 px-4 py-3 shadow-window backdrop-blur-[32px] transition-all duration-500 dark:border-white/10 dark:bg-white/10 sm:px-6 md:py-4",
          hasScrolled ? "shadow-window" : "shadow-soft",
        )}
      >
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
          className="text-foreground focus-visible:ring-brand/60 focus-visible:ring-offset-background inline-flex size-11 items-center justify-center rounded-xl border border-white/40 bg-white/50 transition hover:text-brand focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden dark:border-white/10 dark:bg-white/10"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          <div className="flex rounded-full border border-white/25 bg-white/40 px-1 py-0.5 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
            {LANGUAGES.map((language) => {
              const isActive = locale === language.code;
              return (
                <button
                  key={language.code}
                  type="button"
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "bg-brand text-brand-foreground"
                      : "text-neutral-500 hover:text-brand dark:text-neutral-300",
                  )}
                  onClick={() => setLocale(language.code)}
                >
                  {language.label}
                </button>
              );
            })}
          </div>
          <nav
            className="relative hidden overflow-x-auto rounded-full border border-white/25 bg-white/35 px-1 py-1 shadow-soft backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 md:block"
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
                      {translations.navbar.links[item.labelKey]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="hidden shrink-0 sm:flex">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/40 px-4 py-2 text-sm font-semibold text-foreground shadow-soft transition duration-200 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/10"
          >
            {translations.navbar.cta}
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/55 backdrop-blur-[28px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.nav
              className="absolute right-4 top-20 flex w-[88%] max-w-xs flex-col gap-3 rounded-3xl border border-white/25 bg-white/20 p-6 shadow-window backdrop-blur-[32px] dark:border-white/10 dark:bg-white/5"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, x: 24 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] },
              }}
              exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
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
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((language) => {
                  const isActive = locale === language.code;
                  return (
                    <button
                      key={language.code}
                      type="button"
                      className={cn(
                        "flex-1 rounded-xl border px-4 py-2 text-sm font-semibold transition",
                        isActive
                          ? "border-brand bg-brand/10 text-brand"
                          : "border-border/60 text-neutral-600 dark:text-neutral-200",
                      )}
                      onClick={() => setLocale(language.code)}
                    >
                      {language.label}
                    </button>
                  );
                })}
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
                        {translations.navbar.links[item.labelKey]}
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
                {translations.navbar.cta}
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
