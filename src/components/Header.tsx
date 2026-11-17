"use client";

import { useEffect, useState } from "react";
import { T } from "@/components/T";
import { useLang, type Lang } from "@/i18n/language";

const LINKS = [
  { href: "#about", key: "nav.about" },
  { href: "#skills", key: "nav.skills" },
  { href: "#projects", key: "nav.projects" },
] as const;

const SHELL = "mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-8";

function LangSwitch({ pressed }: { pressed: Lang }) {
  const { setLang, t } = useLang();
  return (
    <div className="inline-flex items-center gap-1.5 font-ui text-xs" role="group" aria-label={t("lang.group")}>
      {(["fr", "en"] as const).map((code, index) => (
        <span key={code} className="inline-flex items-center gap-1.5">
          {index > 0 ? <span aria-hidden="true">|</span> : null}
          <button
            type="button"
            className={`tracking-[0.14em] ${pressed === code ? "font-black underline underline-offset-4" : "font-medium opacity-70"}`}
            aria-pressed={pressed === code}
            onClick={() => setLang(code)}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

export function Header() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-20 transition-all duration-300 ${
          open ? "invisible" : ""
        } ${
          scrolled
            ? "bg-ink/75 backdrop-blur-md border-b border-white/10 text-snow shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
            : "mix-blend-difference text-white"
        }`}
      >
        <div className={SHELL}>
          <a
            href="#home"
            className="font-ui text-3xl font-black leading-none tracking-tighter md:text-4xl"
            aria-label="Scarlino — accueil"
          >
            S
          </a>

          <nav
            className="hidden flex-1 items-center justify-between min-[1024px]:flex min-[1024px]:ml-20 xl:ml-80"
            aria-label={t("nav.mainLabel")}
          >
            <div className="flex items-center gap-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex h-10 items-center px-3 font-ui text-[15px] font-bold tracking-wide transition-opacity hover:opacity-70"
                >
                  <T k={link.key} />
                </a>
              ))}
              <a
                href="#contact"
                className="ml-2 inline-flex h-10 items-center border border-current px-4 font-ui text-[13px] font-bold tracking-[0.08em] transition-colors hover:bg-white hover:text-black"
              >
                <T k="nav.contact" />
              </a>
            </div>

            <span>
              <LangSwitch pressed={lang} />
            </span>
          </nav>

          <div className="flex items-center gap-4 min-[1024px]:hidden">
            <LangSwitch pressed={lang} />
            <button
              type="button"
              className="inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={t("menu.open")}
              onClick={() => setOpen(true)}
            >
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div id="mobile-menu" className="fixed inset-0 z-[60] flex flex-col bg-ink px-6 py-5 text-snow">
          <div className="mb-10 flex h-16 items-center justify-between">
            <a
              href="#home"
              className="font-ui text-4xl font-black leading-none tracking-tighter"
              onClick={() => setOpen(false)}
            >
              S
            </a>
            <button type="button" className="h-10 w-10 text-4xl leading-none" aria-label={t("menu.close")} onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <nav className="flex flex-col" aria-label={t("nav.mobileLabel")}>
            {[...LINKS, { href: "#contact", key: "nav.contact" as const }].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-white/15 py-4 font-ui text-xl font-bold"
                onClick={() => setOpen(false)}
              >
                <T k={link.key} />
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <LangSwitch pressed={lang} />
          </div>
        </div>
      ) : null}
    </>
  );
}