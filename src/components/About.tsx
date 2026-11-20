import { Reveal, RevealItem } from "@/components/Reveal";
import { SectionShell, SectionTag, bodyClass, editorialNumberStyle, eyebrowClass, itemTitleClass, titleClass } from "@/components/SectionShell";
import { T } from "@/components/T";
import type { MessageKey } from "@/i18n/fr";

const FOCUSES: { n: string; title: MessageKey; body: MessageKey }[] = [
  { n: "01", title: "about.s1t", body: "about.s1d" },
  { n: "02", title: "about.s2t", body: "about.s2d" },
  { n: "03", title: "about.s3t", body: "about.s3d" },
];

export function About() {
  return (
    <SectionShell id="about" titleId="about-title" number="01" tone="light">
      <Reveal className="max-w-3xl">
        <RevealItem>
          <SectionTag k="about.index" />
        </RevealItem>
        <RevealItem>
          <h2 id="about-title" className={titleClass}>
            <T k="about.title" />
          </h2>
        </RevealItem>
        <RevealItem>
          <p className={`${bodyClass} mt-6`}>
            <T k="about.intro" />
          </p>
        </RevealItem>
      </Reveal>

      <ul className="mt-16 grid border-t border-ink md:grid-cols-3">
        {FOCUSES.map((focus, index) => (
          <li
            key={focus.n}
            className={`border-b border-ink py-8 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0 ${
              index > 0 ? "md:border-l" : ""
            }`}
          >
            <p className={eyebrowClass} style={editorialNumberStyle}>{focus.n}</p>
            <h3 className={`${itemTitleClass} mt-3`}>
              <T k={focus.title} />
            </h3>
            <p className={`${bodyClass} mt-3`}>
              <T k={focus.body} />
            </p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
