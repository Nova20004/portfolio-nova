"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SectionShell, bodyClass, editorialNumberStyle, eyebrowClass, itemTitleClass, titleClass } from "@/components/SectionShell";
import { T } from "@/components/T";
import type { MessageKey } from "@/i18n/fr";

type Entry = {
  num: string;
  title: MessageKey;
  when: MessageKey;
  org: MessageKey;
  bullets: readonly [MessageKey, MessageKey, MessageKey];
  note: MessageKey;
  stack: MessageKey;
};

const ENTRIES: Entry[] = [
  {
    num: "01",
    title: "exp1.title",
    when: "exp1.when",
    org: "exp1.org",
    bullets: ["exp1.b1", "exp1.b2", "exp1.b3"],
    note: "exp1.note",
    stack: "exp1.tags",
  },
  {
    num: "02",
    title: "exp2.title",
    when: "exp2.when",
    org: "exp2.org",
    bullets: ["exp2.b1", "exp2.b2", "exp2.b3"],
    note: "exp2.note",
    stack: "exp2.tags",
  },
  {
    num: "03",
    title: "exp3.title",
    when: "exp3.when",
    org: "exp3.org",
    bullets: ["exp3.b1", "exp3.b2", "exp3.b3"],
    note: "exp3.note",
    stack: "exp3.tags",
  },
  {
    num: "04",
    title: "exp4.title",
    when: "exp4.when",
    org: "exp4.org",
    bullets: ["exp4.b1", "exp4.b2", "exp4.b3"],
    note: "exp4.note",
    stack: "exp4.tags",
  },
];

function Detail({ open, children }: { open: boolean; children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return open ? <div>{children}</div> : null;

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="detail"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Stage({ entry, last }: { entry: Entry; last: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <RevealItem>
      <article className="relative py-8 pl-8 md:py-10 md:pl-10">
        <span className="absolute left-0 top-11 h-2 w-2 bg-snow" aria-hidden="true" />
        {last ? null : <span className="absolute left-[3px] top-12 h-full w-px bg-snow/35" aria-hidden="true" />}

        <div className="grid gap-4 md:grid-cols-[11.5rem_minmax(0,1fr)] md:gap-12">
        <div>
          <p className={`${eyebrowClass} normal-case tracking-[0.08em] opacity-70`}>
            <T k={entry.when} />
          </p>
          <p className={`${eyebrowClass} mt-3 opacity-50`} style={editorialNumberStyle}>{entry.num}</p>
        </div>

        <div>
          <p className={eyebrowClass}>
            <T k="exp.badge" />
          </p>
          <h3 className={`${itemTitleClass} mt-3`}>
            <T k={entry.title} />
          </h3>
          <p className={`${eyebrowClass} mt-2 normal-case tracking-[0.08em] opacity-70`}>
            <T k={entry.org} />
          </p>

          <ul className="mt-5 space-y-2.5">
            {entry.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-[0.72em] h-px w-3 shrink-0 bg-current opacity-70" aria-hidden="true" />
                <span className={bodyClass}>
                  <T k={bullet} />
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className={`${eyebrowClass} mt-6 inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current`}
          >
            <span aria-hidden="true">{open ? "–" : "+"}</span>
            <T k={open ? "exp.collapse" : "exp.expand"} />
          </button>

          <Detail open={open}>
            <div className="mt-5 border-t border-snow/30 pt-5">
              <p className={eyebrowClass}>
                <T k="exp.stack" />
              </p>
              <p className="mt-3 font-mono text-[13px] leading-relaxed tracking-[0.03em]">
                <T k={entry.stack} />
              </p>
              <p className={`${bodyClass} mt-4`}>
                <T k={entry.note} />
              </p>
            </div>
          </Detail>
        </div>
        </div>
      </article>
    </RevealItem>
  );
}

export function Experience() {
  return (
    <SectionShell id="experience" titleId="experience-title" number="02" tone="dark">
      <Reveal className="max-w-3xl">
        <RevealItem>
          <p className={eyebrowClass}>
            <T k="exp.index" />
          </p>
        </RevealItem>
        <RevealItem>
          <h2 id="experience-title" className={titleClass}>
            <T k="exp.title" />
          </h2>
        </RevealItem>
        <RevealItem>
          <p className={`${bodyClass} mt-6`}>
            <T k="exp.lead" />
          </p>
        </RevealItem>
      </Reveal>

      <Reveal className="relative mt-12 border-t border-snow/35 md:mt-16">
        {ENTRIES.map((entry, index) => (
          <Stage key={entry.num} entry={entry} last={index === ENTRIES.length - 1} />
        ))}
      </Reveal>
    </SectionShell>
  );
}
