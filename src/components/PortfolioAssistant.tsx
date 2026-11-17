"use client";

import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/i18n/language";
import type { MessageKey } from "@/i18n/fr";

type Reply = {
  text: MessageKey;
  go?: "projects" | "contact";
};

type Bubble = {
  id: number;
  from: "bot" | "user";
  text: string;
  go?: "projects" | "contact";
};

const CHIPS: { label: MessageKey; reply: Reply }[] = [
  { label: "chat.chip.projects", reply: { text: "chat.reply.projects", go: "projects" } },
  { label: "chat.chip.path", reply: { text: "chat.reply.path" } },
  { label: "chat.chip.contact", reply: { text: "chat.reply.contact", go: "contact" } },
];

function fold(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function answer(raw: string): Reply {
  const q = fold(raw);
  if (/cicd-gitops|k8s-gitops|observability-auto-healing|github|depot|repo/.test(q)) {
    return { text: "chat.reply.github", go: "projects" };
  }
  if (/projet|project|devops|pipeline|carte/.test(q)) {
    return { text: "chat.reply.projects", go: "projects" };
  }
  if (/parcours|competence|skill|kubernetes|terraform|ansible|observ|ci\/?cd|stack|docker/.test(q)) {
    return /stack|docker|linux|helm|prometheus/.test(q) ? { text: "chat.reply.stack" } : { text: "chat.reply.path" };
  }
  if (/contact|dispo|mission|poste|job|hire|available|recrut|ecrire|joindre/.test(q)) {
    return { text: "chat.reply.contact", go: "contact" };
  }
  return { text: "chat.reply.fallback" };
}

function goTo(target: "projects" | "contact") {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PortfolioAssistant() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Bubble[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const nextId = useRef(1);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open]);

  function push(from: Bubble["from"], text: string, go?: Bubble["go"]) {
    const id = nextId.current++;
    setMessages((current) => [...current, { id, from, text, go }]);
  }

  function ask(label: string, reply: Reply) {
    push("user", label);
    push("bot", t(reply.text), reply.go);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;
    const reply = answer(value);
    setDraft("");
    push("user", value);
    push("bot", t(reply.text), reply.go);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.section
            id="portfolio-assistant"
            role="dialog"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-[min(74vh,34rem)] w-[min(340px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-white/20 bg-ink text-snow shadow-[0_24px_60px_rgba(0,0,0,0.85)] sm:w-[385px]"
          >
            {/* En-tête Console avec Logo S */}
            <header className="flex items-center justify-between border-b border-white/15 bg-white/[0.04] px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-snow font-display text-base font-black text-ink">
                  S
                </div>
                <div>
                  <p id={titleId} className="font-ui text-xs font-bold uppercase tracking-[0.14em] text-snow">
                    {t("chat.title")}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-snow animate-pulse" />
                    <span>SCARLINO // GUIDE</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 font-ui text-sm font-bold text-white/75 transition-colors hover:bg-snow hover:text-ink"
                onClick={() => setOpen(false)}
                aria-label={t("chat.close")}
              >
                ×
              </button>
            </header>

            {/* Zone des messages */}
            <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
              <div className="mr-6 rounded-2xl rounded-bl-sm border border-white/15 bg-white/[0.06] px-3.5 py-3 text-[13px] leading-relaxed text-snow/90">
                {t("chat.welcome")}
              </div>

              {messages.map((message) =>
                message.from === "user" ? (
                  <p
                    key={message.id}
                    className="ml-8 self-end rounded-2xl rounded-br-sm bg-snow px-3.5 py-2.5 text-[13px] font-medium leading-relaxed text-ink"
                  >
                    {message.text}
                  </p>
                ) : (
                  <div
                    key={message.id}
                    className="mr-6 rounded-2xl rounded-bl-sm border border-white/15 bg-white/[0.06] px-3.5 py-3 text-[13px] leading-relaxed text-snow/90"
                  >
                    <p>{message.text}</p>
                    {message.go ? (
                      <button
                        type="button"
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-snow/30 bg-ink px-3 py-1.5 font-ui text-[11px] font-bold tracking-[0.06em] text-snow transition-colors hover:bg-snow hover:text-ink"
                        onClick={() => {
                          goTo(message.go!);
                          setOpen(false);
                        }}
                      >
                        <span>{t(message.go === "projects" ? "chat.go.projects" : "chat.go.contact")}</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    ) : null}
                  </div>
                ),
              )}
            </div>

            {/* Suggestions rapides en pilules arrondies */}
            <div className="flex flex-wrap gap-1.5 border-t border-white/10 bg-white/[0.02] px-4 py-2.5">
              {CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className="rounded-full border border-white/25 px-3 py-1 text-left font-ui text-[11px] font-semibold tracking-wide text-snow/90 transition-colors hover:border-snow hover:bg-snow hover:text-ink"
                  onClick={() => ask(t(chip.label), chip.reply)}
                >
                  {t(chip.label)}
                </button>
              ))}
            </div>

            {/* Formulaire de saisie */}
            <form className="flex items-center gap-2 border-t border-white/15 bg-ink px-3.5 py-3" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="assistant-input">
                {t("chat.placeholder")}
              </label>
              <input
                id="assistant-input"
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={t("chat.placeholder")}
                className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-xs text-snow outline-none transition-colors placeholder:text-white/45 focus:border-snow"
              />
              <button
                type="submit"
                aria-label={t("chat.send")}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-snow font-ui text-sm font-black text-ink transition-transform hover:scale-105 active:scale-95"
              >
                ↑
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Bulle flottante signature avec Monogramme S */}
      <button
        type="button"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-snow/35 bg-ink text-snow shadow-[0_12px_30px_rgba(0,0,0,0.65)] transition-all duration-300 hover:scale-105 hover:bg-snow hover:text-ink"
        aria-expanded={open}
        aria-controls="portfolio-assistant"
        aria-label={open ? t("chat.close") : t("chat.open")}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="font-display text-lg font-black tracking-tighter">
          {open ? "×" : "S"}
        </span>
        {!open && (
          <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-ink bg-snow" />
        )}
      </button>
    </div>
  );
}