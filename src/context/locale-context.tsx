"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultLocale, messages, type Locale } from "@/data/i18n";

type LocaleContextValue = {
  locale: Locale;
  translations: (typeof messages)[Locale];
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  children: ReactNode;
};

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("locale");
      if (stored && stored in messages) {
        return stored as Locale;
      }
    }
    return defaultLocale;
  });

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("locale", nextLocale);
  }, []);

  const translations = useMemo(() => messages[locale], [locale]);

  const value = useMemo(
    () => ({
      locale,
      translations,
      setLocale,
    }),
    [locale, translations, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
