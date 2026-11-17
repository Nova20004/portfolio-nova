import { Diagonal } from "@/components/Diagonal";
import { Reveal, RevealItem } from "@/components/Reveal";
import { T } from "@/components/T";
import type { MessageKey } from "@/i18n/fr";

const SERVICES: { n: string; title: MessageKey; body: MessageKey }[] = [
  { n: "01", title: "about.s1t", body: "about.s1d" },
  { n: "02", title: "about.s2t", body: "about.s2d" },
  { n: "03", title: "about.s3t", body: "about.s3d" },
];

export function About() {
  return (
    <section id="about" className="section-anchor relative scroll-mt-24 overflow-hidden bg-paper" aria-labelledby="about-title">
      <Diagonal variant="about" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pb-16 pt-28 md:gap-14 md:px-8 md:pb-20 md:pt-32 lg:grid-cols-[minmax(0,46%)_minmax(0,40%)] lg:items-start lg:justify-between">
        <Reveal className="max-w-[38rem] text-snow max-lg:pb-10">
          <RevealItem>
            <p className="mb-4 font-ui text-[clamp(0.7rem,1.1vw,1.125rem)] font-bold tracking-[0.04em]">
              <T k="about.index" />
            </p>
          </RevealItem>
          <RevealItem>
            <h2 id="about-title" className="font-ui text-[clamp(2rem,3.6vw,3.4375rem)] font-bold leading-[1.45]">
              <T k="about.title" />
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-7 text-[clamp(1rem,1.4vw,1.5rem)] leading-[1.5]">
              <T k="about.intro" />
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-10 text-[clamp(0.95rem,1.2vw,1.25rem)] leading-[1.5]">
              <T k="about.statement" />
            </p>
          </RevealItem>
        </Reveal>

        <div className="text-ink max-lg:pt-8">
          <Reveal>
            {SERVICES.map((service) => (
              <RevealItem key={service.n} className="mb-7 border-b-2 border-ink pb-7">
                <p className="mb-1.5 font-ui text-base font-bold">{service.n}</p>
                <h3 className="mb-2 font-ui text-[clamp(1.1rem,1.5vw,1.5rem)] font-bold">
                  <T k={service.title} />
                </h3>
                <p className="text-[clamp(1rem,1.3vw,1.375rem)] leading-[1.5]">
                  <T k={service.body} />
                </p>
              </RevealItem>
            ))}
            <RevealItem>
              <p className="mt-8 font-ui text-[15px] font-bold tracking-[0.04em]">
                <T k="about.signature" />
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
