"use client";

import { useCallback, useState } from "react";
import { Diagonal } from "@/components/Diagonal";
import { Modal, type ModalMode } from "@/components/Modal";
import {
  PreviewCluster,
  PreviewConfig,
  PreviewIac,
  PreviewObs,
  PreviewOps,
  PreviewPipeline,
} from "@/components/Previews";
import { Reveal, RevealItem } from "@/components/Reveal";
import { T } from "@/components/T";
import type { MessageKey } from "@/i18n/fr";

type Card = {
  id: string;
  num: string;
  title: MessageKey;
  desc: MessageKey;
  stack: string;
  tone: "dark" | "light";
  href?: string;
  preview: "pipeline" | "cluster" | "iac" | "config" | "obs" | "ops";
};

const CARDS: Card[] = [
  {
    id: "01",
    num: "01",
    title: "proj1.title",
    desc: "proj1.desc",
    stack: "GitHub Actions · Docker · FastAPI · Pytest · Ruff · Trivy · GHCR",
    tone: "dark",
    href: "https://github.com/Nova20004/cicd-gitops-pipeline",
    preview: "pipeline",
  },
  {
    id: "02",
    num: "02",
    title: "proj2.title",
    desc: "proj2.desc",
    stack: "Kubernetes · Helm · ArgoCD · K3s · Ingress · GitOps",
    tone: "dark",
    href: "https://github.com/Nova20004/k8s-gitops-cluster",
    preview: "cluster",
  },
  {
    id: "03",
    num: "03",
    title: "proj3.title",
    desc: "proj3.desc",
    stack: "Terraform · Cloud · Ansible",
    tone: "dark",
    preview: "iac",
  },
  {
    id: "04",
    num: "04",
    title: "proj4.title",
    desc: "proj4.desc",
    stack: "Ansible · Linux",
    tone: "light",
    preview: "config",
  },
  {
    id: "05",
    num: "05",
    title: "proj5.title",
    desc: "proj5.desc",
    stack: "Prometheus · Grafana · Alertmanager · Python · Webhooks",
    tone: "light",
    href: "https://github.com/Nova20004/observability-auto-healing-stack",
    preview: "obs",
  },
  {
    id: "06",
    num: "06",
    title: "proj6.title",
    desc: "proj6.desc",
    stack: "Python · Bash",
    tone: "light",
    preview: "ops",
  },
];

function Preview({ kind, tone }: { kind: Card["preview"]; tone: "light" | "dark" }) {
  const shellTone = tone === "dark" ? "light" : "dark";
  if (kind === "pipeline") return <PreviewPipeline tone={shellTone} />;
  if (kind === "cluster") return <PreviewCluster tone={shellTone} />;
  if (kind === "iac") return <PreviewIac tone={shellTone} />;
  if (kind === "config") return <PreviewConfig tone={shellTone} />;
  if (kind === "obs") return <PreviewObs tone={shellTone} />;
  return <PreviewOps tone={shellTone} />;
}

function CardView({ card, onOpen }: { card: Card; onOpen: () => void }) {
  const className =
    card.tone === "dark"
      ? "block w-full border border-snow bg-ink text-left text-snow transition hover:-translate-y-1 hover:bg-snow hover:text-ink lg:bg-transparent"
      : "block w-full border border-ink bg-paper text-left text-ink transition hover:-translate-y-1 hover:bg-ink hover:text-snow lg:bg-transparent";

  const body = (
    <>
      <Preview kind={card.preview} tone={card.tone} />
      <span className="block px-6 pb-5 pt-4">
        <span className="mb-1 block font-ui text-sm font-bold">{card.num}</span>
        <span className="mb-2 block font-ui text-[clamp(1.1rem,1.4vw,1.4375rem)] font-bold">
          <T k={card.title} />
        </span>
        <span className="mb-2 block font-ui text-[0.8rem] font-bold">{card.stack}</span>
        <span className="block text-[0.95rem]">
          <T k={card.desc} />
        </span>
      </span>
    </>
  );

  if (card.href) {
    return (
      <a className={className} href={card.href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onOpen}>
      {body}
    </button>
  );
}

export function Projects() {
  const [mode, setMode] = useState<ModalMode | null>(null);
  const close = useCallback(() => setMode(null), []);
  const left = CARDS.filter((card) => card.tone === "dark");
  const right = CARDS.filter((card) => card.tone === "light");

  return (
    <section id="projects" className="section-anchor isolate relative scroll-mt-24 overflow-hidden bg-paper" aria-labelledby="projects-title">
      <Diagonal variant="projects" />
      <div className="relative mx-auto w-full min-w-0 max-w-7xl px-6 pb-16 pt-28 md:pb-20 md:pt-32 lg:z-10 lg:px-8">
        <div className="blend-copy relative z-10 mb-12 grid gap-8 lg:grid-cols-[minmax(0,46%)_minmax(0,40%)] lg:items-end lg:justify-between">
          <Reveal>
            <RevealItem>
              <p className="mb-4 font-ui text-[clamp(0.7rem,1.1vw,1.125rem)] font-bold tracking-[0.04em] text-snow">
                <T k="projects.index" />
              </p>
            </RevealItem>
            <RevealItem>
              <h2 id="projects-title" className="font-ui text-[clamp(2rem,3.6vw,3.4375rem)] font-bold leading-[1.45] text-snow">
                <T k="projects.title" />
              </h2>
            </RevealItem>
          </Reveal>
          <Reveal>
            <RevealItem>
              <p className="max-w-[34rem] text-[clamp(1rem,1.5vw,1.5625rem)] leading-[1.45] text-snow lg:justify-self-end lg:text-ink">
                <T k="projects.lead" />
              </p>
            </RevealItem>
          </Reveal>
        </div>

        <div className="relative z-10 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-[minmax(0,46%)_minmax(0,40%)] lg:justify-between">
          <Reveal className="flex flex-col gap-5">
            {left.map((card) => (
              <RevealItem key={card.id}>
                <CardView card={card} onOpen={() => setMode("pending")} />
              </RevealItem>
            ))}
          </Reveal>
          <Reveal className="flex flex-col gap-5">
            {right.map((card) => (
              <RevealItem key={card.id}>
                <CardView card={card} onOpen={() => setMode("pending")} />
              </RevealItem>
            ))}
          </Reveal>
        </div>

        <div className="relative z-10 mt-12 grid md:grid-cols-2 md:gap-8 lg:grid-cols-[minmax(0,46%)_minmax(0,40%)] lg:justify-between">
          <div className="hidden md:block" />
          <div className="flex flex-col items-start gap-5">
            <button
              type="button"
              className="border border-ink bg-paper px-5 py-3.5 font-ui text-sm font-bold tracking-[0.04em] text-ink hover:bg-ink hover:text-snow"
              onClick={() => setMode("all")}
            >
              <T k="projects.more" />
            </button>
            <p className="font-ui text-[15px] font-bold tracking-[0.04em] text-ink">
              <T k="projects.signature" />
            </p>
          </div>
        </div>
      </div>
      {mode ? <Modal mode={mode} onClose={close} /> : null}
    </section>
  );
}
