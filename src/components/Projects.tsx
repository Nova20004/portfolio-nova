"use client";

import { useCallback, useState, type ReactElement } from "react";
import { DiagramCicd, DiagramIac, DiagramIdp, DiagramK8s, DiagramObs } from "@/components/Diagrams";
import { Modal, type ModalMode } from "@/components/Modal";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SectionShell, bodyClass, editorialNumberStyle, eyebrowClass, itemTitleClass, titleClass } from "@/components/SectionShell";
import { T } from "@/components/T";
import type { MessageKey } from "@/i18n/fr";

type Project = {
  id: string;
  title: MessageKey;
  problem: MessageKey;
  solution: MessageKey;
  result: MessageKey;
  tech: string;
  href?: string;
  Diagram: () => ReactElement;
};

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "proj1.title",
    problem: "proj1.problem",
    solution: "proj1.solution",
    result: "proj1.result",
    tech: "FastAPI · GitHub Actions · Ruff · Pytest · Trivy · Docker · GHCR",
    href: "https://github.com/Nova20004/cicd-gitops-pipeline",
    Diagram: DiagramCicd,
  },
  {
    id: "02",
    title: "proj2.title",
    problem: "proj2.problem",
    solution: "proj2.solution",
    result: "proj2.result",
    tech: "Terraform · Docker · PostgreSQL State Lock · Ansible · Linux",
    href: "https://github.com/Nova20004/terraform-multienv-iac",
    Diagram: DiagramIac,
  },
  {
    id: "03",
    title: "proj3.title",
    problem: "proj3.problem",
    solution: "proj3.solution",
    result: "proj3.result",
    tech: "k3s · Argo CD · Argo Rollouts · Helm · GitOps",
    href: "https://github.com/Nova20004/k8s-gitops-cluster",
    Diagram: DiagramK8s,
  },
  {
    id: "04",
    title: "proj4.title",
    problem: "proj4.problem",
    solution: "proj4.solution",
    result: "proj4.result",
    tech: "Prometheus · Grafana · Loki · Alertmanager · Webhook",
    href: "https://github.com/Nova20004/observability-auto-healing-stack",
    Diagram: DiagramObs,
  },
  {
    id: "05",
    title: "proj5.title",
    problem: "proj5.problem",
    solution: "proj5.solution",
    result: "proj5.result",
    tech: "Self-service · Namespace · TTL 24h · GitOps",
    Diagram: DiagramIdp,
  },
];

function Fact({ label, children }: { label: MessageKey; children: React.ReactNode }) {
  return (
    <div>
      <p className={eyebrowClass}>
        <T k={label} />
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const showcaseGridStyle = {
  backgroundImage:
    "linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
  maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
  WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
} as const;

function ProjectRow({ project, onPending }: { project: Project; onPending: () => void }) {
  const Diagram = project.Diagram;

  return (
    <RevealItem>
      <article className="relative grid gap-10 border-t border-snow/30 py-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-4 z-0 h-[28rem] lg:h-[24rem]"
          style={showcaseGridStyle}
        />
        <div className="relative z-10 border-y border-snow/30 py-6 lg:sticky lg:top-28 lg:self-start">
          <Diagram />
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <h3 className={itemTitleClass}>
              <T k={project.title} />
            </h3>
            <p
              className="select-none text-4xl font-black leading-none tracking-tight text-white/35 sm:text-5xl md:text-6xl"
              style={editorialNumberStyle}
            >
              {project.id}
            </p>
          </div>
          <div className="mt-7 grid gap-6">
            <Fact label="projects.problem">
              <p className={bodyClass}>
                <T k={project.problem} />
              </p>
            </Fact>
            <Fact label="projects.solution">
              <p className={bodyClass}>
                <T k={project.solution} />
              </p>
            </Fact>
            <Fact label="projects.tech">
              <p className="max-w-[62ch] font-mono text-[13px] leading-relaxed tracking-[0.03em]">{project.tech}</p>
            </Fact>
            <Fact label="projects.result">
              <p className={bodyClass}>
                <T k={project.result} />
              </p>
            </Fact>
          </div>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${eyebrowClass} mt-7 inline-flex border-b border-current pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current`}
            >
              <T k="projects.repo" />
            </a>
          ) : (
            <button
              type="button"
              onClick={onPending}
              className={`${eyebrowClass} mt-7 inline-flex border-b border-current pb-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current`}
            >
              <T k="projects.pending" />
            </button>
          )}
        </div>
      </article>
    </RevealItem>
  );
}

export function Projects() {
  const [mode, setMode] = useState<ModalMode | null>(null);
  const close = useCallback(() => setMode(null), []);

  return (
    <SectionShell id="projects" titleId="projects-title" number="04" tone="dark">
      <Reveal className="max-w-3xl">
        <RevealItem>
          <p className={eyebrowClass}>
            <T k="projects.index" />
          </p>
        </RevealItem>
        <RevealItem>
          <h2 id="projects-title" className={titleClass}>
            <T k="projects.title" />
          </h2>
        </RevealItem>
        <RevealItem>
          <p className={`${bodyClass} mt-6`}>
            <T k="projects.lead" />
          </p>
        </RevealItem>
      </Reveal>

      <Reveal className="mt-14 md:mt-16">
        {PROJECTS.map((project) => (
          <ProjectRow key={project.id} project={project} onPending={() => setMode("pending")} />
        ))}
      </Reveal>

      <button
        type="button"
        onClick={() => setMode("all")}
        className={`${eyebrowClass} mt-4 inline-flex border-b border-current pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current`}
      >
        <T k="projects.more" />
      </button>
      {mode ? <Modal mode={mode} onClose={close} /> : null}
    </SectionShell>
  );
}
