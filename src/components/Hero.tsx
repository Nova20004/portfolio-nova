"use client";

import Image from "next/image";
import { Diagonal } from "@/components/Diagonal";
import { Reveal, RevealItem } from "@/components/Reveal";
import { T } from "@/components/T";
import { useLang } from "@/i18n/language";
import { motion, useReducedMotion } from "framer-motion";

const SOCIALS = [
  {
    href: "https://github.com/Nova20004",
    label: "GITHUB",
    icon: "/assets/images/icons/github.svg",
    external: true,
  },
  {
    href: "#",
    label: "LINKEDIN",
    icon: "/assets/images/icons/linkedin.svg",
    external: false,
  },
  {
    href: "mailto:josephscarlino@gmail.com",
    label: "EMAIL",
    icon: "/assets/images/icons/email.svg",
    external: false,
  },
] as const;

export function Hero() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();

  return (
    <section id="home" className="section-anchor isolate relative scroll-mt-24 overflow-hidden bg-paper lg:min-h-[760px]">
      <Diagonal variant="hero" />
      <div className="blend-copy relative z-10 mx-auto flex w-full min-w-0 max-w-7xl flex-col items-center px-6 pb-10 pt-28 text-ink md:pt-32 lg:min-h-[760px] lg:items-start lg:justify-center lg:px-8">
        <Reveal className="hero-copy">
          <RevealItem>
            <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
              <span className="hidden h-[2px] w-8 bg-blood sm:inline-block" aria-hidden="true" />
              <p className="font-mono text-[clamp(0.65rem,2.3vw,0.8rem)] font-bold uppercase tracking-[0.14em] text-ink sm:tracking-[0.2em]">
                <T k="hero.eyebrow" />
              </p>
            </div>
          </RevealItem>
          <RevealItem>
            <p className="max-w-full font-display text-[clamp(0.95rem,3.4vw,1.65rem)] font-light tracking-[0.04em] sm:tracking-[0.08em]">
              <T k="hero.hello" />
            </p>
          </RevealItem>
          <RevealItem>
            <h1 className="max-w-full font-display text-[clamp(1.85rem,8vw,4.25rem)] font-extrabold leading-[0.95] tracking-tight sm:tracking-normal">
              S c a r l i n o
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-3 max-w-full font-ui text-[clamp(0.82rem,3.1vw,1.35rem)] font-medium leading-snug">
              <T k="hero.role" />
            </p>
          </RevealItem>
          <RevealItem>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-4 sm:gap-x-8 lg:justify-start" aria-label={t("social.label")}>
              {SOCIALS.map((item) => (
                <li key={item.label}>
                  <a
                    className="inline-flex flex-col items-center gap-2 lg:items-start"
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={item.label}
                  >
                    <Image src={item.icon} alt="" width={36} height={36} className="h-8 w-8 brightness-0" />
                    <span className="font-ui text-[10px] font-bold tracking-[0.06em] lg:text-xs">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
              <a
                href="#projects"
                className="accent-cta group inline-flex h-12 items-center gap-3 border-2 border-blood px-5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-[background-color,color,box-shadow] duration-300 hover:bg-blood hover:text-white hover:shadow-[0_10px_30px_-10px_rgba(200,30,43,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blood"
              >
                <T k="hero.cta" />
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
                  →
                </span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center border-b border-current pb-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
              >
                <T k="hero.ctaContact" />
              </a>
            </div>
          </RevealItem>

          {/* Bloc d'ancrage bas de colonne : statut & spécialité */}
          <RevealItem>
            <div className="mx-auto mt-9 inline-flex items-center divide-x divide-current/25 border-y border-current/25 py-3.5 lg:mx-0">
              <div className="pr-5 text-left">
                <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.2em] opacity-65">
                  PIPELINES
                </span>
                <span className="mt-1 block font-ui text-xs font-extrabold uppercase tracking-wider">
                  GitOps · CI/CD
                </span>
              </div>

              <div className="pl-5 text-left">
                <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.2em] opacity-65">
                  {lang === "fr" ? "STATUT" : "STATUS"}
                </span>
                <span className="mt-1 inline-flex items-center gap-2 whitespace-nowrap font-ui text-xs font-extrabold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blood-glow opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blood" />
                  </span>
                  Open to work
                </span>
              </div>
            </div>
          </RevealItem>
        </Reveal>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="pointer-events-none relative z-20 mt-6 w-full lg:absolute lg:inset-y-24 lg:right-[max(1rem,calc((100%-80rem)/2))] lg:mt-0 lg:w-[min(46%,32rem)]">
        <div className="relative left-1/2 w-[min(68vw,22rem)] -translate-x-1/2 sm:w-80 md:w-96 lg:left-auto lg:w-full lg:translate-x-0">
          {/* Photo Portrait */}
          <Image
            src="/images/joseph-portrait.png"
            alt={t("hero.photoAlt")}
            width={800}
            height={800}
            unoptimized
            priority
            className="h-auto w-full object-contain grayscale contrast-110"
          />
          <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-b from-transparent to-transparent lg:to-ink" />

          {/* Badge flottant 1 : Haut Gauche (CI/CD & Automation) */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-2 top-[18%] hidden items-center gap-2.5 rounded-lg border border-white/20 bg-black/90 px-3.5 py-2 text-xs font-medium text-white shadow-2xl md:flex lg:-left-8"
          >
            <span className="live-dot h-2 w-2 rounded-full bg-blood-glow" />
            <span className="tracking-wide">CI/CD · Automation</span>
          </motion.div>

          {/* Badge flottant 2 : Milieu Droit (Kubernetes & Cloud) */}
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-2 top-[46%] hidden items-center gap-2.5 rounded-lg border border-white/20 bg-black/90 px-3.5 py-2 text-xs font-medium text-white shadow-2xl md:flex lg:-right-4"
          >
            <span className="font-mono text-[11px] text-[#D7D7D7]">&gt;_</span>
            <span className="tracking-wide">Kubernetes · GitOps</span>
          </motion.div>

          {/* Badge flottant 3 : Bas Gauche (Terraform & IaC) */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[18%] left-2 hidden items-center gap-2.5 rounded-lg border border-white/20 bg-black/90 px-3.5 py-2 text-xs font-medium text-white shadow-2xl md:flex lg:-left-6"
          >
            <span className="font-mono text-[11px] text-[#D7D7D7]">IaC</span>
            <span className="tracking-wide">Terraform · Ansible</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}