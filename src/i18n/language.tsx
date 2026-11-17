"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { en } from "./en";
import { fr, type MessageKey } from "./fr";

export type Lang = "fr" | "en";

const STORAGE_KEY = "scarlino-lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: MessageKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "fr";
  } catch {
    return "fr";
  }
}

function writeDocumentLang(next: Lang) {
  const root = document.documentElement;
  root.lang = next;
  root.dataset.lang = next;
  document.title = (next === "en" ? en : fr)["meta.title"];
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", (next === "en" ? en : fr)["meta.description"]);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  const apply = useCallback((next: Lang, persist: boolean) => {
    writeDocumentLang(next);
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* stockage indisponible */
      }
    }
    setLangState(next);
  }, []);

  useLayoutEffect(() => {
    apply(readStoredLang(), false);
  }, [apply]);

  const setLang = useCallback((next: Lang) => apply(next, true), [apply]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key) => (lang === "en" ? en[key] : fr[key]),
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLang must be used within LanguageProvider");
  return value;
}
