"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SectionShell, SectionTag, bodyClass, editorialNumberStyle, eyebrowClass, itemTitleClass, titleClass } from "@/components/SectionShell";
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

type Point = { x: number; y: number };

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

function curveThrough(points: Point[]) {
  if (points.length === 0) return "";
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const from = points[index];
    const to = points[index + 1];
    const mid = (from.y + to.y) / 2;
    d += ` C ${from.x.toFixed(2)} ${mid.toFixed(2)}, ${to.x.toFixed(2)} ${mid.toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
  }
  return d;
}

function pathMetrics(d: string, progress: number) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svg.style.position = "absolute";
  svg.style.visibility = "hidden";
  path.setAttribute("d", d);
  svg.appendChild(path);
  document.body.appendChild(svg);
  const length = path.getTotalLength() || 1;
  const point = path.getPointAtLength(Math.min(1, Math.max(0, progress)) * length);
  svg.remove();
  return { length, beacon: { x: point.x, y: point.y } };
}

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

function Stage({
  entry,
  lit,
  nodeRef,
}: {
  entry: Entry;
  lit: boolean;
  nodeRef: (node: HTMLSpanElement | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const side = Number(entry.num) % 2 === 1 ? "left" : "right";

  return (
    <article
      className={`relative py-8 pl-14 transition-opacity duration-500 md:grid md:grid-cols-[minmax(0,1fr)_8.5rem_minmax(0,1fr)] md:py-10 md:pl-0 ${
        lit ? "opacity-100" : "opacity-45"
      }`}
    >
      <span
        ref={nodeRef}
        aria-hidden="true"
        className={`absolute top-11 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full transition-[background-color,box-shadow,transform] duration-500 ${
          lit ? "accent-glow scale-125 bg-blood-glow" : "bg-snow"
        } ${
          side === "left" ? "left-4 md:left-[calc(50%-4.25rem)]" : "left-10 md:left-[calc(50%+4.25rem)]"
        }`}
      />
      <div className={side === "left" ? "md:col-start-1 md:pr-8" : "md:col-start-3 md:pl-8"}>
        <p className="text-[2.4rem] font-black leading-none tracking-tight text-snow" style={editorialNumberStyle}>
          {entry.num}
        </p>
        <p className={`${eyebrowClass} mt-4 normal-case tracking-[0.08em] opacity-70`}>
          <T k={entry.when} />
        </p>
        <p className={`${eyebrowClass} mt-4`}>
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
          <span
            aria-hidden="true"
            className={`inline-flex h-5 w-5 items-center justify-center border text-[13px] leading-none transition-[transform,border-color,background-color] duration-300 motion-reduce:transition-none ${
              open ? "rotate-45 border-blood-glow bg-blood text-white" : "border-current"
            }`}
          >
            +
          </span>
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
    </article>
  );
}

export function Experience() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const [journey, setJourney] = useState({
    d: "",
    length: 1,
    progress: 0,
    beacon: { x: 0, y: 0 },
    reached: [false, false, false, false],
  });

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const measure = () => {
      const box = track.getBoundingClientRect();
      const points = nodes.current.flatMap((node) => {
        if (!node) return [];
        const rect = node.getBoundingClientRect();
        return [{ x: rect.left + rect.width / 2 - box.left, y: rect.top + rect.height / 2 - box.top }];
      });
      if (points.length < 2) return;

      const d = curveThrough(points);
      const height = Math.max(box.height, 1);
      const progress = reduce ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.68 - box.top) / (height + window.innerHeight * 0.12)));
      const { length, beacon } = pathMetrics(d, progress);
      const span = Math.max(points[points.length - 1].y - points[0].y, 1);
      const reached = points.map((point) => progress + 0.04 >= (point.y - points[0].y) / span);

      setJourney({ d, length, progress, beacon, reached });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const observer = new ResizeObserver(onScroll);
    observer.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, [reduce]);

  const drawn = journey.length * (1 - journey.progress);

  return (
    <SectionShell id="experience" titleId="experience-title" number="02" tone="dark">
      <Reveal className="max-w-3xl">
        <RevealItem>
          <SectionTag k="exp.index" />
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

      <div ref={trackRef} className="relative mt-12 overflow-x-clip border-t border-snow/35 md:mt-16">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <path d={journey.d} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          <path
            d={journey.d}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={journey.length}
            strokeDashoffset={drawn}
          />
          {journey.d && journey.progress > 0 ? (
            <g>
              <circle className="beacon-ring" cx={journey.beacon.x} cy={journey.beacon.y} r="10" fill="none" stroke="#C81E2B" strokeWidth="1.5" />
              <circle cx={journey.beacon.x} cy={journey.beacon.y} r="12" fill="rgba(200,30,43,0.22)" />
              <circle
                cx={journey.beacon.x}
                cy={journey.beacon.y}
                r="5"
                fill="#C81E2B"
                style={{ filter: "drop-shadow(0 0 6px rgba(200,30,43,0.95))" }}
              />
            </g>
          ) : null}
        </svg>

        {ENTRIES.map((entry, index) => (
          <Stage
            key={entry.num}
            entry={entry}
            lit={journey.reached[index] ?? false}
            nodeRef={(node) => {
              nodes.current[index] = node;
            }}
          />
        ))}
      </div>
    </SectionShell>
  );
}
