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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, setLocale, translations } = useLocale();

  const [activeSection, setActiveSection] = useState<(typeof NAV_ITEMS)[number]["id"]>(() => {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash.replace("#", "");
    return NAV_IDS.includes(hash as (typeof NAV_ITEMS)[number]["id"]) ? (hash as (typeof NAV_ITEMS)[number]["id"]) : "home";
  });

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    if (NAV_ITEMS.some((item) => item.id === hash)) {
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
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id as (typeof NAV_ITEMS)[number]["id"]);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.2, 0.4, 0.6] },
    );
    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    if (!isMenuOpen) return;
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
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6 md:py-4">
        <Link
          href="#home"
          className="group inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition hover:text-brand"
        >
          <span>Yunsu.dev</span>
          <span className="rounded-full border border-border/70 px-2 py-0.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground transition group-hover:border-brand group-hover:text-brand">
            Portfolio
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-border/70 bg-card text-foreground transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          <div className="flex rounded-full border border-border/70 bg-surface px-1 py-0.5">
            {LANGUAGES.map((language) => {
              const isActive = locale === language.code;
              return (
                <button
                  key={language.code}
                  type="button"
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                  )}
                  onClick={() => setLocale(language.code)}
                >
                  {language.label}
                </button>
              );
            })}
          </div>
          <nav className="relative hidden overflow-x-auto rounded-full border border-border/70 bg-card px-1 py-1 shadow-soft md:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className={cn(
                        "relative block rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        isActive ? "text-foreground" : undefined,
                      )}
                      onClick={() => setActiveSection(item.id)}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-foreground/10"
                          transition={{ type: "spring", stiffness: 220, damping: 28 }}
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
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/70 bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-soft transition duration-200 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {translations.navbar.cta}
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.nav
              className="absolute top-20 right-4 flex w-[88%] max-w-xs flex-col gap-3 rounded-2xl border border-border/70 bg-card p-6 shadow-soft"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } }}
              exit={{ opacity: 0, y: 12, transition: { duration: 0.18 } }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">Navigate</span>
                <span className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">Swipe down</span>
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
                        isActive ? "border-foreground text-foreground" : "border-border/70 text-muted-foreground",
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
                          "relative block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm",
                          isActive ? "text-foreground" : undefined,
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-soft transition duration-200 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
