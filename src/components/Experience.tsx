import { Diagonal } from "@/components/Diagonal";
import { Reveal, RevealItem } from "@/components/Reveal";
import { T } from "@/components/T";
import type { MessageKey } from "@/i18n/fr";

type Entry = {
  num: string;
  title: MessageKey;
  when: MessageKey;
  org: MessageKey;
  body: MessageKey;
  tags: MessageKey;
};

const ENTRIES: Entry[] = [
  {
    num: "01",
    title: "exp1.title",
    when: "exp1.when",
    org: "exp1.org",
    body: "exp1.body",
    tags: "exp1.tags",
  },
  {
    num: "02",
    title: "exp2.title",
    when: "exp2.when",
    org: "exp2.org",
    body: "exp2.body",
    tags: "exp2.tags",
  },
  {
    num: "03",
    title: "exp3.title",
    when: "exp3.when",
    org: "exp3.org",
    body: "exp3.body",
    tags: "exp3.tags",
  },
  {
    num: "04",
    title: "exp4.title",
    when: "exp4.when",
    org: "exp4.org",
    body: "exp4.body",
    tags: "exp4.tags",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="section-anchor isolate relative scroll-mt-24 overflow-hidden bg-paper"
      aria-labelledby="experience-title"
    >
      {/* Diagonale d'origine : noir à gauche, gris clair à droite */}
      <Diagonal variant="experience" />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-6 pb-20 pt-28 md:pb-24 md:pt-32 lg:px-8">
        {/* En-tête centré en haut avec inversion automatique sur la diagonale */}
        <Reveal className="mx-auto mb-16 max-w-2xl text-center text-white mix-blend-difference md:mb-20">
          <RevealItem>
            <p className="mb-3 font-ui text-[clamp(0.75rem,1.1vw,1rem)] font-bold uppercase tracking-[0.18em]">
              <T k="exp.index" />
            </p>
          </RevealItem>
          <RevealItem>
            <h2
              id="experience-title"
              className="font-ui text-[clamp(2rem,3.8vw,3.4rem)] font-bold leading-[1.2] tracking-tight"
            >
              <T k="exp.title" />
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 text-[clamp(1rem,1.3vw,1.3rem)] leading-relaxed opacity-90">
              <T k="exp.lead" />
            </p>
          </RevealItem>
        </Reveal>

        {/* Grille 2 colonnes au même niveau : 01 & 03 à gauche (sur noir), 02 & 04 à droite (sur gris) */}
        <Reveal className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2 lg:gap-x-24 lg:gap-y-14">
          {ENTRIES.map((entry, index) => {
            const isLeftColumn = index % 2 === 0; // 01 (index 0) et 03 (index 2) à gauche, 02 et 04 à droite

            return (
              <RevealItem
                key={entry.num}
                className={`flex flex-col justify-between border-b pb-8 max-lg:text-white max-lg:mix-blend-difference max-lg:border-white/30 ${
                  isLeftColumn
                    ? "lg:border-white/25 lg:pr-6 lg:text-snow"
                    : "lg:border-ink/25 lg:pl-6 lg:text-ink"
                }`}
              >
                <div>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                    <span className="inline-flex min-w-0 items-center gap-2.5">
                      <span className="font-mono text-xs font-bold tracking-[0.16em]">{entry.num}</span>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase leading-none tracking-[0.14em] max-lg:border max-lg:border-current ${
                          isLeftColumn
                            ? "lg:bg-snow lg:text-ink"
                            : "lg:bg-ink lg:text-snow"
                        }`}
                      >
                        <T k="exp.badge" />
                      </span>
                    </span>
                    <span className="font-mono text-[0.7rem] tracking-[0.04em] opacity-80">
                      <T k={entry.when} />
                    </span>
                  </div>

                  <h3 className="font-ui text-[clamp(1.15rem,1.5vw,1.4rem)] font-bold leading-snug">
                    <T k={entry.title} />
                  </h3>

                  <p className="mt-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] opacity-80">
                    <T k={entry.org} />
                  </p>

                  <p className="mt-3.5 text-[clamp(0.95rem,1.15vw,1.125rem)] leading-[1.6] opacity-90">
                    <T k={entry.body} />
                  </p>
                </div>

                <p className="mt-4 font-mono text-[0.7rem] leading-relaxed tracking-[0.04em] opacity-75">
                  <T k={entry.tags} />
                </p>
              </RevealItem>
            );
          })}
        </Reveal>

        {/* Signature centrée en bas */}
        <Reveal className="mt-12 text-center text-white mix-blend-difference">
          <RevealItem>
            <p className="font-ui text-[15px] font-bold tracking-[0.06em]">
              <T k="exp.signature" />
            </p>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}