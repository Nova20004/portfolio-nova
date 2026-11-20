import Image from "next/image";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SectionShell, SectionTag, bodyClass, eyebrowClass, itemTitleClass, titleClass } from "@/components/SectionShell";
import { T } from "@/components/T";
import type { MessageKey } from "@/i18n/fr";

type Level = "mastered" | "learning";

type Skill = {
  name: string;
  usage: MessageKey;
  level: Level;
  icons: { src: string; size: number }[];
};

const LEVEL_KEY: Record<Level, MessageKey> = {
  mastered: "skills.level.mastered",
  learning: "skills.level.learning",
};

const MASTERED: Skill[] = [
  { name: "GitOps / Argo CD", usage: "skills.gitops", level: "mastered", icons: [{ src: "/assets/images/icons/kubernetes.svg", size: 32 }] },
  { name: "CI/CD · GitHub Actions", usage: "skills.git", level: "mastered", icons: [{ src: "/assets/images/icons/github-actions.svg", size: 32 }] },
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
  { name: "Docker", usage: "skills.docker", level: "mastered", icons: [{ src: "/assets/images/icons/docker.svg", size: 32 }] },
  { name: "Ansible", usage: "skills.ansible", level: "mastered", icons: [{ src: "/assets/images/icons/ansible.svg", size: 32 }] },
];

const LEARNING: Skill[] = [
  { name: "Cloud", usage: "skills.cloud", level: "learning", icons: [{ src: "/assets/images/icons/cloud.svg", size: 32 }] },
  { name: "Kubernetes / Helm", usage: "skills.k8s", level: "learning", icons: [{ src: "/assets/images/icons/kubernetes.svg", size: 32 }] },
  { name: "Terraform", usage: "skills.terraform", level: "learning", icons: [{ src: "/assets/images/icons/terraform.svg", size: 32 }] },
  {
    name: "Observability",
    usage: "skills.obs",
    level: "learning",
    icons: [
      { src: "/assets/images/icons/prometheus.svg", size: 21 },
      { src: "/assets/images/icons/grafana.svg", size: 21 },
    ],
  },
];

function LevelBadge({ level }: { level: Level }) {
  const tone =
    level === "mastered"
      ? "bg-ink text-snow"
      : "border border-dashed border-ink text-ink";

  return (
    <span className={`inline-flex shrink-0 items-center px-2.5 py-1 font-mono text-[11px] font-bold uppercase leading-none tracking-[0.14em] ${tone}`}>
      <T k={LEVEL_KEY[level]} />
    </span>
  );
}

function SkillGroup({ label, items }: { label: MessageKey; items: Skill[] }) {
  return (
    <div>
      <p className={`${eyebrowClass} border-b border-ink pb-3`}>
        <T k={label} />
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.name} className="border-b border-ink/25 py-5">
            <RevealItem>
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-10 shrink-0 items-center gap-1">
                  {item.icons.map((icon) => (
                    <Image
                      key={icon.src}
                      src={icon.src}
                      alt=""
                      width={icon.size}
                      height={icon.size}
                      className={`object-contain brightness-0 ${icon.size === 21 ? "h-5 w-5" : "h-7 w-7"}`}
                    />
                  ))}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className={itemTitleClass}>{item.name}</h3>
                    <p className={`${bodyClass} mt-1`}>
                      <T k={item.usage} />
                    </p>
                  </div>
                  <LevelBadge level={item.level} />
                </div>
              </div>
            </RevealItem>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <SectionShell id="skills" titleId="skills-title" number="03" tone="light">
      <Reveal className="max-w-3xl">
        <RevealItem>
          <SectionTag k="skills.index" />
        </RevealItem>
        <RevealItem>
          <h2 id="skills-title" className={titleClass}>
            <T k="skills.title" />
          </h2>
        </RevealItem>
        <RevealItem>
          <p className={`${bodyClass} mt-6`}>
            <T k="skills.lead" />
          </p>
        </RevealItem>
      </Reveal>

      <Reveal className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
        <SkillGroup label="skills.level.mastered" items={MASTERED} />
        <SkillGroup label="skills.level.learning" items={LEARNING} />
      </Reveal>
    </SectionShell>
  );
}
