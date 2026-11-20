import type { ReactNode } from "react";
import { ParallaxNumeral } from "@/components/ParallaxNumeral";
import { T } from "@/components/T";
import type { MessageKey } from "@/i18n/fr";

type Tone = "light" | "dark";

export const eyebrowClass = "font-mono text-[12px] font-bold uppercase tracking-[0.18em]";

export const titleClass =
  "mt-4 font-display text-[clamp(2.1rem,3.8vw,3rem)] font-bold leading-[1.15]";

export const itemTitleClass =
  "font-display text-[clamp(1.25rem,1.5vw,1.5rem)] font-bold leading-snug";

export const bodyClass = "max-w-[62ch] font-ui text-base leading-[1.65] md:text-[17px]";

export const editorialNumberStyle = {
  fontFamily: "var(--font-anybody), sans-serif",
  fontFeatureSettings: '"zero" 1',
} as const;

export function SectionTag({ k }: { k: MessageKey }) {
  return (
    <p className={`${eyebrowClass} inline-flex items-center gap-3`}>
      <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-blood-glow" />
      <T k={k} />
    </p>
  );
}

export function SectionShell({
  id,
  titleId,
  number,
  tone,
  children,
  footer,
}: {
  id: string;
  titleId: string;
  number: string;
  tone: Tone;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const light = tone === "light";

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`editorial section-anchor relative scroll-mt-24 overflow-hidden border-t font-ui ${
        light ? "border-ink bg-paper text-ink" : "border-snow bg-ink text-snow"
      }`}
    >
      <ParallaxNumeral
        number={number}
        style={editorialNumberStyle}
        className={`section-index pointer-events-none absolute right-[-0.08em] top-[-0.12em] z-0 select-none overflow-hidden font-black leading-none tracking-tighter text-[clamp(9rem,26vw,24rem)] ${
          light ? "text-ink opacity-[0.055]" : "text-snow opacity-[0.065]"
        }`}
      />
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-6 py-20 md:px-8 md:py-28">{children}</div>
      {footer ? <div className="relative z-10">{footer}</div> : null}
    </section>
  );
}
