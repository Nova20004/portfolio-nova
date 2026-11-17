"use client";

import Image from "next/image";
import { Diagonal } from "@/components/Diagonal";
import { Reveal, RevealItem } from "@/components/Reveal";
import { T } from "@/components/T";
import { useLang } from "@/i18n/language";
import { motion } from "framer-motion";

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
  const { t } = useLang();

  return (
    <section id="home" className="section-anchor relative scroll-mt-24 overflow-hidden bg-paper lg:min-h-[760px]">
      <Diagonal variant="hero" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pb-10 pt-28 md:px-8 md:pt-32 lg:min-h-[760px] lg:justify-center">
        <Reveal className="max-w-xl text-ink lg:max-w-[26rem]">
          <RevealItem>
            <p className="mb-6 font-display text-[33px] font-light tracking-[0.34em] lg:text-[13px]">
              <T k="hero.eyebrow" />
            </p>
          </RevealItem>
          <RevealItem>
            <p className="font-display text-[clamp(1.15rem,2vw,3.65rem)] font-light tracking-[0.12em]">
              <T k="hero.hello" />
            </p>
          </RevealItem>
          <RevealItem>
            <h1 className="font-display text-[clamp(3.4rem,7vw,4.25rem)] font-extrabold leading-[0.92]">
              S c a r l i n o
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 font-ui text-[clamp(1rem,1.5vw,1.35rem)] font-medium tracking-wide">
              <T k="hero.role" />
            </p>
          </RevealItem>
          <RevealItem>
            <ul className="mt-10 flex flex-wrap gap-10" aria-label={t("social.label")}>
              {SOCIALS.map((item) => (
                <li key={item.label}>
                  <a
                    className="inline-flex flex-col gap-2"
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
        </Reveal>
      </div>

      <div className="pointer-events-none relative z-10 mx-6 -mt-2 flex items-end justify-center overflow-visible lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:w-[46%]">
        <div className="relative w-[300px] sm:w-[350px] lg:w-[510px]">
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
          <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-b from-transparent to-ink" />

          {/* Badge flottant 1 : Haut Gauche (CI/CD & Automation) */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:flex items-center gap-2.5 absolute top-[22%] -left-10 lg:-left-16 rounded-lg border border-white/20 bg-black/90 px-3.5 py-2 text-xs font-medium text-white shadow-2xl"
          >
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span className="tracking-wide">CI/CD · Automation</span>
          </motion.div>

          {/* Badge flottant 2 : Milieu Droit (Kubernetes & Cloud) */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="hidden sm:flex items-center gap-2.5 absolute top-[48%] -right-6 lg:-right-10 rounded-lg border border-white/20 bg-black/90 px-3.5 py-2 text-xs font-medium text-white shadow-2xl"
          >
            <span className="font-mono text-[11px] text-[#D7D7D7]">&gt;_</span>
            <span className="tracking-wide">Kubernetes · GitOps</span>
          </motion.div>

          {/* Badge flottant 3 : Bas Gauche (Terraform & IaC) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden sm:flex items-center gap-2.5 absolute bottom-[22%] -left-6 lg:-left-12 rounded-lg border border-white/20 bg-black/90 px-3.5 py-2 text-xs font-medium text-white shadow-2xl"
          >
            <span className="font-mono text-[11px] text-[#D7D7D7]">IaC</span>
            <span className="tracking-wide">Terraform · Ansible</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
