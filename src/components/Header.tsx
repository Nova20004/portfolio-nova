"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { T } from "@/components/T";
import { useLang, type Lang } from "@/i18n/language";

const LINKS = [
  { href: "#about", key: "nav.about" },
  { href: "#experience", key: "nav.experience" },
  { href: "#skills", key: "nav.skills" },
  { href: "#projects", key: "nav.projects" },
] as const;

const CV_PATH = "/cv/CV-Joseph-Scarlino.pdf";

const SHELL =
  "mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-8 min-[1024px]:grid min-[1024px]:grid-cols-[1fr_auto_1fr]";

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

function DownloadIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M8 2v8.5M4.5 7.5 8 11l3.5-3.5M2.5 13.5h11" strokeLinecap="square" />
    </svg>
  );
}

const SECTION_IDS = ["about", "experience", "skills", "projects", "contact"] as const;

function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: reduce ? scrollYProgress : smooth }} />;
}

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = SECTION_IDS.flatMap((id) => {
      const node = document.getElementById(id);
      return node ? [node] : [];
    });
    if (sections.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        const current = SECTION_IDS.find((id) => visible.has(id)) ?? null;
        setActive(current);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.01] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Header() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
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
          {/* Gauche : Logo S */}
          <div className="flex items-center justify-start">
            <a
              href="#home"
              className="font-ui text-3xl font-black leading-none tracking-tighter md:text-4xl"
              aria-label="Scarlino — accueil"
            >
              S
            </a>
          </div>

          {/* Centre : Liens de navigation centrés */}
          <nav
            className="hidden items-center justify-center gap-2 min-[1024px]:flex"
            aria-label={t("nav.mainLabel")}
          >
            {LINKS.map((link) => {
              const current = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "location" : undefined}
                  className="relative inline-flex h-10 items-center px-3 font-ui text-[15px] font-bold tracking-wide transition-opacity hover:opacity-70"
                >
                  <T k={link.key} />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-1 h-[2px] origin-left bg-blood-glow transition-transform duration-300 ease-out ${
                      current && scrolled ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
            <a
              href="#contact"
              aria-current={active === "contact" ? "location" : undefined}
              className={`ml-2 inline-flex h-10 items-center gap-2 border px-4 font-ui text-[13px] font-bold tracking-[0.08em] transition-colors hover:border-blood-glow hover:bg-blood hover:text-white ${
                active === "contact" && scrolled ? "border-blood-glow" : "border-current"
              }`}
            >
              {scrolled ? <span aria-hidden="true" className="live-dot h-1.5 w-1.5 rounded-full bg-blood-glow" /> : null}
              <T k="nav.contact" />
            </a>
          </nav>

          {/* Droite : Bouton CV + LangSwitch + Burger Mobile */}
          <div className="flex items-center justify-end gap-3 sm:gap-4">
            <a
              href={CV_PATH}
              download="CV-Joseph-Scarlino.pdf"
              aria-label={lang === "fr" ? "Télécharger mon CV (PDF)" : "Download my Resume (PDF)"}
              className="hidden items-center gap-1.5 border border-current px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-black sm:inline-flex"
            >
              <span>{lang === "fr" ? "CV" : "RESUME"}</span>
              <DownloadIcon />
            </a>

            <LangSwitch pressed={lang} />

            <button
              type="button"
              className="inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px] min-[1024px]:hidden"
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
            <button
              type="button"
              className="h-10 w-10 text-4xl leading-none"
              aria-label={t("menu.close")}
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col" aria-label={t("nav.mobileLabel")}>
            {[...LINKS, { href: "#contact", key: "nav.contact" as const }].map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href.slice(1) ? "location" : undefined}
                className="flex items-center gap-3 border-b border-white/15 py-4 font-ui text-xl font-bold"
                onClick={() => setOpen(false)}
              >
                {active === link.href.slice(1) ? <span aria-hidden="true" className="h-2 w-2 bg-blood-glow" /> : null}
                <T k={link.key} />
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-6 pt-8">
            <a
              href={CV_PATH}
              download="CV-Joseph-Scarlino.pdf"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 border border-white px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-snow transition-colors hover:bg-white hover:text-ink"
            >
              <span>{lang === "fr" ? "TÉLÉCHARGER MON CV (PDF)" : "DOWNLOAD RESUME (PDF)"}</span>
              <DownloadIcon />
            </a>
            <LangSwitch pressed={lang} />
          </div>
        </div>
      ) : null}
    </>
  );
}