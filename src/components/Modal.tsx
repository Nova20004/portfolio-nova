"use client";

import { useEffect, useRef } from "react";
import { T } from "@/components/T";
import { useLang } from "@/i18n/language";
import type { MessageKey } from "@/i18n/fr";

const REPOS = [
  { href: "https://github.com/Nova20004/cicd-gitops-pipeline", label: "cicd-gitops-pipeline" },
  { href: "https://github.com/Nova20004/k8s-gitops-cluster", label: "k8s-gitops-cluster" },
  { href: "https://github.com/Nova20004/observability-auto-healing-stack", label: "observability-auto-healing-stack" },
];

export type ModalMode = "all" | "pending";

export function Modal({
  mode,
  onClose,
}: {
  mode: ModalMode;
  onClose: () => void;
}) {
  const { t } = useLang();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleKey: MessageKey = mode === "all" ? "modal.allTitle" : "modal.title";
  const textKey: MessageKey = mode === "all" ? "modal.allText" : "modal.text";

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    panel.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const nodes = focusable();
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-5">
      <button type="button" className="absolute inset-0 bg-ink/80" aria-label={t("modal.close")} onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="relative z-10 w-full max-w-[34rem] border-2 border-snow bg-ink p-8 text-snow outline-none"
      >
        <button type="button" className="absolute right-4 top-3 text-3xl leading-none" onClick={onClose} aria-label={t("modal.close")}>
          ×
        </button>
        <p className="mb-3 font-ui text-xs font-bold tracking-[0.08em]">
          <T k="modal.kicker" />
        </p>
        <h2 id="modal-title" className="mb-3 font-ui text-2xl font-bold">
          <T k={titleKey} />
        </h2>
        <p className="mb-6 text-base leading-relaxed">
          <T k={textKey} />
        </p>
        <div className="mb-6 flex flex-wrap gap-3">
          <a
            className="inline-flex min-w-52 items-center justify-center bg-snow px-6 py-4 font-ui text-sm font-bold tracking-[0.04em] text-ink"
            href="https://github.com/Nova20004"
            target="_blank"
            rel="noopener noreferrer"
          >
            <T k="modal.cta" />
          </a>
          <button type="button" className="border border-snow px-5 py-4 font-ui text-sm font-bold" onClick={onClose}>
            <T k="modal.close" />
          </button>
        </div>
        <ul className="flex flex-col gap-2 border-t border-snow pt-4">
          {REPOS.map((repo) => (
            <li key={repo.href}>
              <a className="font-ui text-sm font-bold underline" href={repo.href} target="_blank" rel="noopener noreferrer">
                {repo.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
