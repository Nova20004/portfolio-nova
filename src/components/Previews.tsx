function Shell({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`border-b px-3 py-2.5 font-mono text-[10px] leading-relaxed tracking-tight sm:text-[11px] ${
        dark ? "border-snow/40 bg-ink text-snow" : "border-ink/30 bg-paper text-ink"
      }`}
    >
      {children}
    </div>
  );
}

export function PreviewPipeline({ tone }: { tone: "light" | "dark" }) {
  const steps = ["Lint", "Tests", "Trivy", "Docker", "GHCR"];
  return (
    <Shell tone={tone}>
      <p className="mb-1.5 opacity-80">.github/workflows/ci.yml</p>
      <p>{steps.join(" → ")}</p>
      <p className="mt-1 flex gap-3">
        {steps.map((step) => (
          <span key={step}>✓ {step}</span>
        ))}
      </p>
    </Shell>
  );
}

export function PreviewCluster({ tone }: { tone: "light" | "dark" }) {
  return (
    <Shell tone={tone}>
      <p>$ argocd app sync</p>
      <p>$ kubectl get pods -n production</p>
      <p className="mt-1">
        Synced · <span className="pulse-live font-bold">Healthy</span>
        <span className="term-cursor" />
      </p>
    </Shell>
  );
}

export function PreviewIac({ tone }: { tone: "light" | "dark" }) {
  return (
    <Shell tone={tone}>
      <p>$ terraform apply</p>
      <p>$ ansible-playbook site.yml</p>
      <p className="mt-1">
        0 drift · Apply complete
        <span className="term-cursor" />
      </p>
    </Shell>
  );
}

export function PreviewConfig({ tone }: { tone: "light" | "dark" }) {
  return (
    <Shell tone={tone}>
      <p>playbook.yml · hardening</p>
      <p>Linux &amp; SSH</p>
      <p className="mt-1">
        changed=4 failed=0
        <span className="term-cursor" />
      </p>
    </Shell>
  );
}

export function PreviewObs({ tone }: { tone: "light" | "dark" }) {
  return (
    <Shell tone={tone}>
      <p>CPU 14.2% · RAM 3.8GB</p>
      <p className="mt-1">
        Auto-Healing: <span className="pulse-live font-bold">ACTIVE</span>
      </p>
      <p>
        <span className="pulse-live font-bold">HEALTHY</span>
        <span className="term-cursor" />
      </p>
    </Shell>
  );
}

export function PreviewOps({ tone }: { tone: "light" | "dark" }) {
  return (
    <Shell tone={tone}>
      <p>python · bash</p>
      <p>cron / webhook</p>
      <p className="mt-1">
        backup &amp; cleanup OK
        <span className="term-cursor" />
      </p>
    </Shell>
  );
}
