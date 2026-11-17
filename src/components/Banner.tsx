import { Reveal, RevealItem } from "@/components/Reveal";
import { T } from "@/components/T";

const INDICATORS = ["banner.i1", "banner.i2", "banner.i3"] as const;

export function Banner() {
  return (
    <section id="banner" className="section-anchor relative scroll-mt-24 overflow-hidden bg-ink text-snow" aria-labelledby="banner-title">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-5" aria-hidden />
      <p
        className="pointer-events-none absolute -right-[2%] top-1/2 -translate-y-1/2 select-none font-display text-[clamp(4.5rem,14vw,11rem)] font-extrabold leading-none tracking-tight text-white/[0.06]"
        aria-hidden
      >
        SYS // OPS
      </p>
      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 border-b border-white/15 pb-10 md:grid-cols-2 md:items-start md:gap-12">
          <Reveal>
            <RevealItem>
              <h2 id="banner-title" className="max-w-[16ch] font-ui text-[clamp(1.45rem,2.3vw,2.05rem)] font-bold leading-[1.25]">
                <T k="banner.title" />
              </h2>
            </RevealItem>
          </Reveal>
          <Reveal>
            <RevealItem>
              <p className="max-w-[46rem] border-white/15 text-[clamp(1rem,1.35vw,1.25rem)] leading-[1.55] md:border-l md:pl-8">
                <T k="banner.text" />
              </p>
            </RevealItem>
          </Reveal>
        </div>
        <ul className="grid gap-0 sm:grid-cols-3">
          {INDICATORS.map((key, index) => (
            <li
              key={key}
              className={`py-5 font-ui text-[12px] font-bold tracking-[0.16em] text-snow/90 sm:px-5 sm:first:pl-0 ${
                index > 0 ? "border-t border-white/15 sm:border-l sm:border-t-0" : ""
              }`}
            >
              <T k={key} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
