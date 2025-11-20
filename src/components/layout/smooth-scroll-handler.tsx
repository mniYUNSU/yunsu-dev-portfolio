"use client";

import { useEffect } from "react";

export function SmoothScrollHandler() {
  useEffect(() => {
    if ("scrollBehavior" in document.documentElement.style) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) {
        return;
      }
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") {
        return;
      }
      const element = document.querySelector(hash);
      if (!element) {
        return;
      }
      event.preventDefault();
      const top =
        (element as HTMLElement).getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: "auto" });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
