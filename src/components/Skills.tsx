import Image from "next/image";
import { Diagonal } from "@/components/Diagonal";
import { Reveal, RevealItem } from "@/components/Reveal";
import { T } from "@/components/T";
import type { MessageKey } from "@/i18n/fr";

type Level = "mastered" | "learning" | "handsOn";

type Skill = {
  name: string;
  usage: MessageKey;
  level: Level;
  icons: { src: string; size: number }[];
};

const LEVEL_KEY: Record<Level, MessageKey> = {
  mastered: "skills.level.mastered",
  learning: "skills.level.learning",
  handsOn: "skills.level.handsOn",
};

const LEFT: Skill[] = [
  { name: "Linux", usage: "skills.linux", level: "mastered", icons: [{ src: "/assets/images/icons/linux.svg", size: 32 }] },
  {
    name: "Bash / Python",
    usage: "skills.bash",
    level: "mastered",
    icons: [
      { src: "/assets/images/icons/bash.svg", size: 21 },
      { src: "/assets/images/icons/python.svg", size: 21 },
    ],
  },
  { name: "Git / GitHub Actions", usage: "skills.git", level: "mastered", icons: [{ src: "/assets/images/icons/github-actions.svg", size: 32 }] },
  { name: "Docker", usage: "skills.docker", level: "mastered", icons: [{ src: "/assets/images/icons/docker.svg", size: 32 }] },
  { name: "Kubernetes / Helm", usage: "skills.k8s", level: "learning", icons: [{ src: "/assets/images/icons/kubernetes.svg", size: 32 }] },
];

const RIGHT: Skill[] = [
  { name: "Terraform", usage: "skills.terraform", level: "handsOn", icons: [{ src: "/assets/images/icons/terraform.svg", size: 32 }] },
  { name: "Ansible", usage: "skills.ansible", level: "mastered", icons: [{ src: "/assets/images/icons/ansible.svg", size: 32 }] },
  { name: "Cloud", usage: "skills.cloud", level: "learning", icons: [{ src: "/assets/images/icons/cloud.svg", size: 32 }] },
  {
    name: "Prometheus / Grafana",
    usage: "skills.obs",
    level: "handsOn",
    icons: [
      { src: "/assets/images/icons/prometheus.svg", size: 21 },
      { src: "/assets/images/icons/grafana.svg", size: 21 },
    ],
  },
  { name: "GitOps / Argo CD", usage: "skills.gitops", level: "mastered", icons: [{ src: "/assets/images/icons/kubernetes.svg", size: 32 }] },
];

function LevelBadge({ level, onDark }: { level: Level; onDark: boolean }) {
  const tone =
    level === "mastered"
      ? onDark
        ? "border border-current lg:border-transparent lg:bg-snow lg:text-ink"
        : "border border-current lg:border-transparent lg:bg-ink lg:text-snow"
      : level === "handsOn"
        ? onDark
          ? "border border-solid border-snow/80"
          : "border border-solid border-ink/70"
        : onDark
          ? "border border-dashed border-snow/55"
          : "border border-dashed border-ink/45";

  return (
    <span className={`inline-flex max-w-full shrink-0 items-center px-2 py-1 font-ui text-[0.62rem] font-bold uppercase leading-none tracking-[0.12em] ${tone}`}>
      <T k={LEVEL_KEY[level]} />
    </span>
  );
}

function SkillColumn({
  category,
  items,
  onDark,
}: {
  category: MessageKey;
  items: Skill[];
  onDark: boolean;
}) {
  return (
    <div className={onDark ? "text-snow" : "text-ink"}>
      <Reveal>
        <RevealItem>
          <p className="mb-6 font-ui text-[0.8rem] font-bold tracking-[0.06em]">
            <T k={category} />
          </p>
        </RevealItem>
        {items.map((item) => (
          <RevealItem key={item.name} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-current py-4 sm:gap-4">
            <span className="flex min-h-8 items-center gap-1">
              {item.icons.map((icon) => (
                <Image
                  key={icon.src}
                  src={icon.src}
                  alt=""
                  width={icon.size}
                  height={icon.size}
                  className={`object-contain brightness-0 ${onDark ? "invert" : ""} ${icon.size === 21 ? "h-[1.3rem] w-[1.3rem]" : "h-8 w-8"}`}
                />
              ))}
            </span>
            <span className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
              <span className="min-w-0">
                <strong className="block font-ui text-[clamp(1.05rem,1.5vw,1.8125rem)] font-bold">{item.name}</strong>
                <span className="text-[clamp(0.85rem,1.1vw,1.1875rem)]">
                  <T k={item.usage} />
                </span>
              </span>
              <LevelBadge level={item.level} onDark={onDark} />
            </span>
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-anchor isolate relative scroll-mt-24 overflow-hidden bg-paper" aria-labelledby="skills-title">
      <Diagonal variant="skills" />
      <div className="blend-copy relative z-10 mx-auto w-full min-w-0 max-w-7xl px-6 pb-16 pt-28 md:pb-20 md:pt-32 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,46%)_minmax(0,40%)] lg:items-end lg:justify-between">
          <Reveal>
            <RevealItem>
              <p className="mb-4 font-ui text-[clamp(0.7rem,1.1vw,1.125rem)] font-bold tracking-[0.04em] text-ink">
                <T k="skills.index" />
              </p>
            </RevealItem>
            <RevealItem>
              <h2 id="skills-title" className="font-ui text-[clamp(2rem,3.6vw,3.4375rem)] font-bold leading-[1.45] text-ink">
                <T k="skills.title" />
              </h2>
            </RevealItem>
          </Reveal>
          <Reveal>
            <RevealItem>
              <p className="max-w-[32rem] text-[clamp(1rem,1.5vw,1.625rem)] leading-[1.45] text-ink lg:justify-self-end lg:text-snow">
                <T k="skills.lead" />
              </p>
            </RevealItem>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[minmax(0,46%)_minmax(0,40%)] lg:justify-between lg:gap-12">
          <SkillColumn category="skills.catLeft" items={LEFT} onDark={false} />
          <SkillColumn category="skills.catRight" items={RIGHT} onDark />
        </div>

        <p className="mt-12 max-w-[38rem] font-ui text-[15px] font-bold tracking-[0.04em] text-snow lg:text-ink">
          <T k="skills.signature" />
        </p>
      </div>
    </section>
  );
}
