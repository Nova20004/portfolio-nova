"use client";

import Image from "next/image";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SectionShell, SectionTag, bodyClass, eyebrowClass, titleClass } from "@/components/SectionShell";
import { T } from "@/components/T";
import { useLang } from "@/i18n/language";
import type { MessageKey } from "@/i18n/fr";
import { CONTACT } from "@/lib/site";

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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.9L2.3 21.8l4.8-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.6 4.2 3.6 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("fr-FR", { timeZone: CONTACT.timeZone, hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

function Channel({
  icon,
  label,
  href,
  external = false,
  children,
}: {
  icon: ReactNode;
  label: MessageKey;
  href?: string;
  external?: boolean;
  children: ReactNode;
}) {
  const body = (
    <>
      <span className="inline-flex min-w-0 items-center gap-3">
        {icon}
        <span className={eyebrowClass}>
          <T k={label} />
        </span>
      </span>
      <span className="flex min-w-0 items-center gap-3 text-right">{children}</span>
    </>
  );

  return (
    <li className="border-b border-ink">
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-blood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blood"
        >
          {body}
        </a>
      ) : (
        <div className="flex items-center justify-between gap-4 py-4">{body}</div>
      )}
    </li>
  );
}

export function Contact() {
  const { t } = useLang();
  const localTime = useLocalTime();
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
            <div className="flex flex-col gap-1">
              <p className="font-ui text-base text-ink">
                <T k="footer.copy" />
              </p>
              <p className="font-mono text-[12px] tracking-[0.04em] text-ink/75">
                <span className="mr-2 inline-block h-1.5 w-1.5 bg-blood align-middle" aria-hidden="true" />
                {CONTACT.city}, {CONTACT.country} ·{" "}
                <a href={CONTACT.phoneHref} className="underline-offset-4 hover:text-blood hover:underline">
                  {CONTACT.phoneDisplay}
                </a>
              </p>
            </div>
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
              <SectionTag k="contact.index" />
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
                className="mt-2 h-[60px] w-full max-w-[18.75rem] border-b-[3px] border-blood bg-ink px-6 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-snow transition-colors duration-300 hover:bg-blood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blood"
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
            <p className={`${eyebrowClass} mt-10`}>
              <T k="contact.direct" />
            </p>
            <ul className="mt-5 border-t border-ink">
              <Channel icon={<PhoneIcon />} label="contact.phone" href={CONTACT.phoneHref}>
                <span className="font-mono text-[13px] tracking-[0.02em]">{CONTACT.phoneDisplay}</span>
              </Channel>
              <Channel icon={<WhatsAppIcon />} label="contact.whatsapp" href={CONTACT.whatsappHref} external>
                <span className="flex flex-col items-end">
                  <span className="font-mono text-[13px] tracking-[0.02em]">{CONTACT.whatsappDisplay}</span>
                  <span className="font-mono text-[11px] tracking-[0.02em] opacity-60">{CONTACT.whatsappLocal}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 bg-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-snow transition-colors group-hover:bg-blood">
                  <T k="contact.whatsappCta" />
                  <span aria-hidden="true">↗</span>
                </span>
              </Channel>
              <Channel icon={<PinIcon />} label="contact.location">
                <span className="flex flex-col items-end">
                  <span className="font-ui text-base md:text-[17px]">
                    {CONTACT.city}, {CONTACT.country}
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.04em] opacity-70">
                    <span aria-hidden="true" className="live-dot h-1.5 w-1.5 rounded-full bg-blood" />
                    <T k="contact.localTime" /> {localTime ?? "--:--"} · EAT UTC+3
                  </span>
                </span>
              </Channel>
            </ul>
          </RevealItem>
          <RevealItem>
            <dl className="mt-10 border-t border-ink">
              {FACTS.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-4 border-b border-ink py-3.5">
                  <dt className={eyebrowClass}>
                    <T k={fact.label} />
                  </dt>
                  <dd className="inline-flex items-center gap-2 text-right font-ui text-base md:text-[17px]">
                    {fact.label === "contact.status" ? (
                      <span aria-hidden="true" className="live-dot h-2 w-2 rounded-full bg-blood" />
                    ) : null}
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
