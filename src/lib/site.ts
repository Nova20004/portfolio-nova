export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nova20004.github.io").replace(/\/$/, "");

export const PERSON = {
  name: "Joseph Scarlino",
  alias: "Scarlino",
  jobTitleFr: "Spécialiste DevOps & Infrastructure",
  jobTitleEn: "DevOps & Infrastructure Specialist",
  email: "josephscarlino@gmail.com",
  github: "https://github.com/Nova20004",
} as const;

export const CONTACT = {
  phoneDisplay: "+261 33 03 943 76",
  phoneHref: "tel:+261330394376",
  phoneE164: "+261330394376",
  whatsappDisplay: "+261 37 68 424 20",
  whatsappLocal: "037 68 424 20",
  whatsappHref: "https://wa.me/261376842420",
  city: "Antananarivo",
  country: "Madagascar",
  countryCode: "MG",
  timeZone: "Indian/Antananarivo",
} as const;

export const PUBLISHED_REPOS = [
  {
    name: "cicd-gitops-pipeline",
    title: "GitOps CI/CD Automated Pipeline",
    description:
      "GitHub Actions pipeline with a parallel quality gate (Ruff, Pytest, Trivy), non-root multi-stage Docker build, blocking CRITICAL CVE scan, GHCR publish and CD.",
    url: "https://github.com/Nova20004/cicd-gitops-pipeline",
    languages: ["Python", "YAML", "Dockerfile"],
  },
  {
    name: "terraform-multienv-iac",
    title: "Multi-Environment Infrastructure as Code",
    description:
      "Reusable Terraform modules with a PostgreSQL remote backend and advisory locks, plus idempotent Ansible configuration for dev, staging and prod.",
    url: "https://github.com/Nova20004/terraform-multienv-iac",
    languages: ["HCL", "YAML", "Shell"],
  },
  {
    name: "observability-self-healing",
    title: "SRE Observability & Self-Healing Engine",
    description:
      "Prometheus, Grafana, Loki and Alertmanager stack driving an authenticated runbook engine: pre-mortem log capture, load-shedding, verified restarts and circuit breaker.",
    url: "https://github.com/Nova20004/observability-self-healing",
    languages: ["Python", "YAML", "Dockerfile"],
  },
  {
    name: "self-service",
    title: "Self-Service Ephemeral Environments Platform",
    description:
      "envctl CLI and /create-env FastAPI endpoint spinning up an app and its PostgreSQL database behind a dedicated Traefik URL, with resource quotas and automatic TTL cleanup.",
    url: "https://github.com/Nova20004/self-service",
    languages: ["Python", "YAML", "Dockerfile"],
  },
] as const;
