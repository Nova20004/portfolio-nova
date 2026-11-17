"use client";

import Image from "next/image";
import { type FormEvent, useState } from "react";
import { Diagonal } from "@/components/Diagonal";
import { Reveal, RevealItem } from "@/components/Reveal";
import { T } from "@/components/T";
import { useLang } from "@/i18n/language";
import type { MessageKey } from "@/i18n/fr";

const SOCIALS = [
  { href: "https://github.com/Nova20004", label: "GITHUB", icon: "/assets/images/icons/github.svg", external: true },
  { href: "#", label: "LINKEDIN", icon: "/assets/images/icons/linkedin.svg", external: false },
  { href: "mailto:josephscarlino@gmail.com", label: "EMAIL", icon: "/assets/images/icons/email.svg", external: false },
] as const;

export function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<MessageKey | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus("form.invalid");
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const body = [
      `Nom: ${String(data.get("name") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      `Tel: ${String(data.get("phone") ?? "")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    setStatus("form.sending");
    try {
      window.location.href = `mailto:josephscarlino@gmail.com?subject=${encodeURIComponent("DevOps / Automation")}&body=${encodeURIComponent(body)}`;
      setStatus("form.success");
      form.reset();
    } catch {
      setStatus("form.error");
    }
  }

  return (
    <section id="contact" className="section-anchor relative scroll-mt-24 overflow-hidden bg-paper" aria-labelledby="contact-title">
      <Diagonal variant="contact" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pb-8 pt-28 md:px-8 md:pt-32 lg:grid-cols-[minmax(0,46%)_minmax(0,38%)] lg:items-stretch lg:justify-between">
        {/* Colonne Gauche : Formulaire */}
        <div className="max-w-[40rem] text-ink">
          <Reveal>
            <RevealItem>
              <p className="mb-4 font-ui text-[clamp(0.7rem,1.1vw,1.125rem)] font-bold tracking-[0.04em]">
                <T k="contact.index" />
              </p>
            </RevealItem>
            <RevealItem>
              <h2 id="contact-title" className="font-ui text-[clamp(2rem,3.6vw,3.4375rem)] font-bold leading-[1.45]">
                <T k="contact.title" />
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="my-6 text-[clamp(1rem,1.3vw,1.375rem)] leading-[1.45]">
                <T k="contact.intro" />
              </p>
            </RevealItem>
            <RevealItem>
              <form className="flex max-w-[620px] flex-col gap-5" onSubmit={onSubmit} noValidate={false}>
                <label className="flex flex-col gap-3">
                  <span className="font-ui text-sm font-bold tracking-[0.03em]">
                    <T k="form.name" />
                  </span>
                  <input className="field-input" type="text" name="name" required autoComplete="name" placeholder={t("form.namePh")} />
                </label>
                <label className="flex flex-col gap-3">
                  <span className="font-ui text-sm font-bold tracking-[0.03em]">
                    <T k="form.email" />
                  </span>
                  <input className="field-input" type="email" name="email" required autoComplete="email" placeholder={t("form.emailPh")} />
                </label>
                <label className="flex flex-col gap-3">
                  <span className="font-ui text-sm font-bold tracking-[0.03em]">
                    <T k="form.phone" />
                  </span>
                  <input className="field-input" type="tel" name="phone" autoComplete="tel" placeholder={t("form.phonePh")} />
                </label>
                <label className="flex flex-col gap-3">
                  <span className="font-ui text-sm font-bold tracking-[0.03em]">
                    <T k="form.message" />
                  </span>
                  <textarea className="field-input min-h-28 resize-y" name="message" rows={3} required placeholder={t("form.messagePh")} />
                </label>
                <input type="hidden" name="subject" value="DevOps / Automation" />
                <button
                  type="submit"
                  className="mt-2 h-[60px] w-fit min-w-[18.75rem] bg-ink px-6 font-ui text-sm font-bold tracking-[0.04em] text-snow hover:bg-snow hover:text-ink hover:outline hover:outline-2 hover:outline-ink"
                >
                  <T k="form.submit" />
                </button>
                <p className="min-h-6 text-sm" role="status" aria-live="polite">
                  {status ? t(status) : ""}
                </p>
              </form>
            </RevealItem>
          </Reveal>
        </div>

        {/* Colonne Droite : Alignée au pixel près avec la colonne de gauche */}
        <Reveal className="flex h-full flex-col justify-between text-snow max-lg:bg-ink max-lg:p-6">
          {/* Bloc supérieur : Titres & sous-textes alignés sur ceux de gauche */}
          <div>
            <RevealItem>
              <p className="mb-4 font-ui text-[clamp(0.7rem,1.1vw,1.125rem)] font-bold tracking-[0.04em] text-snow/60">
                <T k="contact.eyebrow" />
              </p>
            </RevealItem>

            <RevealItem>
              <p className="font-ui text-[clamp(2rem,3.6vw,3.4375rem)] font-bold leading-[1.45]">
                <T k="contact.statement" />
              </p>
            </RevealItem>

            <RevealItem>
              <p className="my-6 text-[clamp(1rem,1.3vw,1.375rem)] leading-[1.45] text-snow/75">
                <T k="contact.aside" />
              </p>
            </RevealItem>

            {/* Réseaux & Informations clés en 2 rangées de 3 cartes architecturales */}
            <RevealItem>
              <p className="mt-10 lg:mt-16 mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-snow/50">
                <T k="contact.find" />
              </p>

              {/* Rangée 1 : Réseaux sociaux (01 - 03) */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {SOCIALS.map((item, idx) => (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-snow/20 bg-snow/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-snow hover:bg-snow hover:text-ink"
                  >
                    <div className="flex items-center justify-between">
                      <Image
                        src={item.icon}
                        alt=""
                        width={22}
                        height={22}
                        className="h-5 w-5 brightness-0 invert transition-all group-hover:invert-0"
                      />
                      <span className="font-mono text-[11px] text-snow/40 group-hover:text-ink/60">
                        0{idx + 1} ↗
                      </span>
                    </div>

                    <div className="mt-6">
                      <span className="block font-ui text-xs font-extrabold tracking-[0.12em] uppercase">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] text-snow/50 group-hover:text-ink/70">
                        {item.label === "GITHUB"
                          ? "@Nova20004"
                          : item.label === "LINKEDIN"
                          ? "/in/scarlino"
                          : "direct mail"}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Rangée 2 : 3 cartes supplémentaires espacées (04 - 06) */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* Carte 04 : Disponibilité */}
                <div className="group flex flex-col justify-between rounded-xl border border-snow/20 bg-snow/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-snow hover:bg-snow hover:text-ink">
                  <div className="flex items-center justify-between">
                    <span className="h-2.5 w-2.5 rounded-full bg-snow animate-pulse group-hover:bg-ink" />
                    <span className="font-mono text-[11px] text-snow/40 group-hover:text-ink/60">
                      04
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="block font-ui text-xs font-extrabold tracking-[0.12em] uppercase">
                      STATUT
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] text-snow/50 group-hover:text-ink/70">
                      Open to work
                    </span>
                  </div>
                </div>

                {/* Carte 05 : Mode de travail */}
                <div className="group flex flex-col justify-between rounded-xl border border-snow/20 bg-snow/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-snow hover:bg-snow hover:text-ink">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-snow group-hover:text-ink">
                      UTC+3
                    </span>
                    <span className="font-mono text-[11px] text-snow/40 group-hover:text-ink/60">
                      05
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="block font-ui text-xs font-extrabold tracking-[0.12em] uppercase">
                      REMOTE
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] text-snow/50 group-hover:text-ink/70">
                      FR / EN · Global
                    </span>
                  </div>
                </div>

                {/* Carte 06 : Lien rapide vers les projets */}
                <a
                  href="#projects"
                  className="group flex flex-col justify-between rounded-xl border border-snow/20 bg-snow/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-snow hover:bg-snow hover:text-ink"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-snow group-hover:text-ink">
                      &gt;_
                    </span>
                    <span className="font-mono text-[11px] text-snow/40 group-hover:text-ink/60">
                      06 ↗
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="block font-ui text-xs font-extrabold tracking-[0.12em] uppercase">
                      REPOS
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] text-snow/50 group-hover:text-ink/70">
                      CI/CD &amp; K8s
                    </span>
                  </div>
                </a>
              </div>
            </RevealItem>
          </div>

          {/* Bloc inférieur aligné sur le bas du formulaire */}
          <RevealItem>
            <div className="mt-10 select-none">
              <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-snow/20 bg-gradient-to-br from-snow/[0.08] via-snow/[0.03] to-transparent p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-snow/60">
                    <span className="inline-block h-2 w-2 rounded-sm bg-snow" />
                    <span>SYSTEMS & AUTOMATION</span>
                  </div>
                  <p className="font-ui text-3xl sm:text-4xl font-black tracking-tight text-snow">
                    Scarlino<span className="text-snow/40">.</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["CI/CD", "Kubernetes", "Terraform", "Observability"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-snow/15 bg-ink/80 px-2 py-0.5 font-mono text-[10px] text-snow/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Badge Monogramme S architectural */}
                <div className="relative z-10 flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-snow/25 bg-ink/90 shadow-inner">
                  <span
                    aria-hidden="true"
                    className="font-ui text-6xl font-black leading-none tracking-tighter text-snow"
                  >
                    S
                  </span>
                </div>
              </div>
            </div>
          </RevealItem>
        </Reveal>
      </div>

      <footer className="relative z-10 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 md:px-8">
        <p className="text-[1.0625rem] text-snow lg:text-ink">
          <T k="footer.copy" />
        </p>
        <a href="#home" className="font-ui text-[0.9375rem] font-bold text-snow">
          <T k="footer.top" />
        </a>
      </footer>
    </section>
  );
}