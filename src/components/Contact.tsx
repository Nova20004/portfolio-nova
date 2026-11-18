"use client";

import Image from "next/image";
import { type FormEvent, useState } from "react";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SectionShell, bodyClass, eyebrowClass, titleClass } from "@/components/SectionShell";
import { T } from "@/components/T";
import { useLang } from "@/i18n/language";
import type { MessageKey } from "@/i18n/fr";

const SOCIALS = [
  { href: "https://github.com/Nova20004", label: "GITHUB", handle: "@Nova20004", icon: "/assets/images/icons/github.svg", external: true },
  { href: "#", label: "LINKEDIN", handle: "/in/scarlino", icon: "/assets/images/icons/linkedin.svg", external: false },
  { href: "mailto:josephscarlino@gmail.com", label: "EMAIL", handle: "josephscarlino@gmail.com", icon: "/assets/images/icons/email.svg", external: false },
] as const;

const FACTS: { label: MessageKey; value: MessageKey }[] = [
  { label: "contact.status", value: "contact.statusValue" },
  { label: "contact.mode", value: "contact.modeValue" },
  { label: "contact.zone", value: "contact.zoneValue" },
  { label: "contact.langs", value: "contact.langsValue" },
];

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
    <SectionShell
      id="contact"
      titleId="contact-title"
      number="05"
      tone="light"
      footer={
        <footer className="border-t border-ink">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 md:px-8">
            <p className="font-ui text-base text-ink">
              <T k="footer.copy" />
            </p>
            <a href="#home" className={`${eyebrowClass} text-ink`}>
              <T k="footer.top" />
            </a>
          </div>
        </footer>
      }
    >
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
        <div className="min-w-0">
          <Reveal>
            <RevealItem>
              <p className={eyebrowClass}>
                <T k="contact.index" />
              </p>
            </RevealItem>
            <RevealItem>
              <h2 id="contact-title" className={titleClass}>
                <T k="contact.title" />
              </h2>
            </RevealItem>
            <RevealItem>
              <p className={`${bodyClass} mt-6`}>
                <T k="contact.intro" />
              </p>
            </RevealItem>
            <form className="mt-10 flex max-w-[40rem] flex-col gap-6" onSubmit={onSubmit}>
              <label className="flex flex-col gap-2">
                <span className={eyebrowClass}>
                  <T k="form.name" />
                </span>
                <input className="field-input font-ui text-base" type="text" name="name" required autoComplete="name" placeholder={t("form.namePh")} />
              </label>
              <label className="flex flex-col gap-2">
                <span className={eyebrowClass}>
                  <T k="form.email" />
                </span>
                <input className="field-input font-ui text-base" type="email" name="email" required autoComplete="email" placeholder={t("form.emailPh")} />
              </label>
              <label className="flex flex-col gap-2">
                <span className={eyebrowClass}>
                  <T k="form.phone" />
                </span>
                <input className="field-input font-ui text-base" type="tel" name="phone" autoComplete="tel" placeholder={t("form.phonePh")} />
              </label>
              <label className="flex flex-col gap-2">
                <span className={eyebrowClass}>
                  <T k="form.message" />
                </span>
                <textarea className="field-input min-h-28 resize-y font-ui text-base" name="message" rows={4} required placeholder={t("form.messagePh")} />
              </label>
              <input type="hidden" name="subject" value="DevOps / Automation" />
              <button
                type="submit"
                className="mt-2 h-[60px] w-full max-w-[18.75rem] bg-ink px-6 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-snow hover:bg-snow hover:text-ink hover:outline hover:outline-2 hover:outline-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <T k="form.submit" />
              </button>
              <p className="min-h-6 font-ui text-base" role="status" aria-live="polite">
                {status ? t(status) : ""}
              </p>
            </form>
          </Reveal>
        </div>

        <Reveal className="min-w-0 lg:pt-[4.5rem]">
          <RevealItem>
            <p className={eyebrowClass}>
              <T k="contact.find" />
            </p>
            <ul className="mt-5 border-t border-ink">
              {SOCIALS.map((item) => (
                <li key={item.label} className="border-b border-ink">
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center justify-between gap-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                  >
                    <span className="inline-flex min-w-0 items-center gap-3">
                      <Image src={item.icon} alt="" width={20} height={20} className="h-5 w-5 shrink-0 brightness-0" />
                      <span className={eyebrowClass}>{item.label}</span>
                    </span>
                    <span className="truncate font-mono text-[12px] tracking-[0.02em] opacity-70">{item.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem>
            <dl className="mt-10 border-t border-ink">
              {FACTS.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-4 border-b border-ink py-3.5">
                  <dt className={eyebrowClass}>
                    <T k={fact.label} />
                  </dt>
                  <dd className="text-right font-ui text-base md:text-[17px]">
                    <T k={fact.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </RevealItem>
        </Reveal>
      </div>
    </SectionShell>
  );
}
