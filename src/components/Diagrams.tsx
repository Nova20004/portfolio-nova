import type { ReactNode } from "react";

function Label({
  x,
  y,
  children,
  size = 13,
  opacity = 1,
}: {
  x: number;
  y: number;
  children: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill="currentColor"
      opacity={opacity}
      fontSize={size}
      className="font-mono"
    >
      {children}
    </text>
  );
}

function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  dashed?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="currentColor"
        fillOpacity={0.05}
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      <Label x={x + w / 2} y={sub ? y + h / 2 - 8 : y + h / 2}>
        {label}
      </Label>
      {sub ? (
        <Label x={x + w / 2} y={y + h / 2 + 9} size={10} opacity={0.72}>
          {sub}
        </Label>
      ) : null}
    </g>
  );
}

function HArrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const dir = x2 >= x1 ? 1 : -1;
  const base = x2 - dir * 7;
  return (
    <g stroke="currentColor" fill="currentColor" strokeWidth={1}>
      <line x1={x1} y1={y} x2={base} y2={y} />
      <polyline points={`${x2},${y} ${base},${y - 3.5} ${base},${y + 3.5}`} stroke="none" />
    </g>
  );
}

function VArrow({ x, y1, y2, dashed = false }: { x: number; y1: number; y2: number; dashed?: boolean }) {
  const dir = y2 >= y1 ? 1 : -1;
  const base = y2 - dir * 7;
  return (
    <g stroke="currentColor" fill="currentColor" strokeWidth={1}>
      <line x1={x} y1={y1} x2={x} y2={base} strokeDasharray={dashed ? "3 3" : undefined} />
      <polyline points={`${x},${y2} ${x - 3.5},${base} ${x + 3.5},${base}`} stroke="none" />
    </g>
  );
}

function Frame({
  viewBox,
  children,
}: {
  viewBox: string;
  children: ReactNode;
}) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" className="h-auto w-full text-current">
      {children}
    </svg>
  );
}

export function DiagramCicd() {
  return (
    <Frame viewBox="0 0 640 210">
      <Box x={8} y={10} w={150} h={44} label="LINT (Ruff)" />
      <Box x={8} y={80} w={150} h={44} label="TESTS (Pytest)" />
      <Box x={8} y={150} w={150} h={44} label="TRIVY FS" />
      <HArrow x1={158} x2={186} y={32} />
      <HArrow x1={158} x2={186} y={102} />
      <HArrow x1={158} x2={186} y={172} />
      <line x1={186} y1={32} x2={186} y2={172} stroke="currentColor" strokeWidth={1} />
      <HArrow x1={186} x2={214} y={102} />
      <Box x={214} y={74} w={156} h={64} label="DOCKER" sub="TRIVY IMAGE" />
      <Label x={292} y={158} size={10} opacity={0.72}>
        CRITICAL GATE
      </Label>
      <HArrow x1={370} x2={396} y={106} />
      <Box x={396} y={84} w={72} h={44} label="GHCR" />
      <HArrow x1={468} x2={494} y={106} />
      <Box x={494} y={80} w={112} h={52} label="CD (PROD)" />
    </Frame>
  );
}

export function DiagramIac() {
  return (
    <Frame viewBox="0 0 420 188">
      <Box x={8} y={14} w={108} h={40} label="DEV" />
      <Box x={8} y={74} w={108} h={40} label="STAGING" />
      <Box x={8} y={134} w={108} h={40} label="PROD" />
      <HArrow x1={116} x2={168} y={34} />
      <HArrow x1={116} x2={168} y={94} />
      <HArrow x1={116} x2={168} y={154} />
      <line x1={168} y1={34} x2={168} y2={154} stroke="currentColor" strokeWidth={1} />
      <HArrow x1={168} x2={196} y={94} />
      <Box x={196} y={66} w={92} h={56} label="STATE" sub="LOCK" />
      <HArrow x1={288} x2={316} y={94} />
      <Box x={316} y={74} w={96} h={40} label="ANSIBLE" />
    </Frame>
  );
}

export function DiagramK8s() {
  return (
    <Frame viewBox="0 0 420 168">
      <Box x={8} y={18} w={64} h={44} label="GIT" />
      <HArrow x1={72} x2={92} y={40} />
      <Box x={92} y={18} w={78} h={44} label="ARGO" />
      <HArrow x1={170} x2={190} y={40} />
      <Box x={190} y={14} w={100} h={52} label="CANARY" sub="10%" />
      <HArrow x1={290} x2={310} y={40} />
      <Box x={310} y={14} w={102} h={52} label="BLUE" sub="GREEN" />
      <Label x={210} y={112} size={11} opacity={0.72}>
        k3s · ROLLOUT
      </Label>
    </Frame>
  );
}

export function DiagramObs() {
  return (
    <Frame viewBox="0 0 360 210">
      <Box x={12} y={82} w={72} h={44} label="APP" />
      <line x1={84} y1={104} x2={112} y2={104} stroke="currentColor" strokeWidth={1} />
      <line x1={112} y1={40} x2={112} y2={168} stroke="currentColor" strokeWidth={1} />
      <HArrow x1={112} x2={136} y={40} />
      <HArrow x1={112} x2={136} y={168} />
      <Box x={136} y={18} w={88} h={44} label="PROM" />
      <Box x={136} y={146} w={88} h={44} label="LOKI" />
      <HArrow x1={224} x2={248} y={40} />
      <HArrow x1={224} x2={248} y={168} />
      <line x1={248} y1={40} x2={248} y2={168} stroke="currentColor" strokeWidth={1} />
      <HArrow x1={248} x2={262} y={104} />
      <Box x={262} y={80} w={86} h={48} label="ALERT" />
      <VArrow x={305} y1={128} y2={156} />
      <Box x={262} y={156} w={86} h={40} label="HOOK" />
      <Label x={168} y={104} size={10} opacity={0.7}>
        GRAFANA
      </Label>
    </Frame>
  );
}

export function DiagramIdp() {
  return (
    <Frame viewBox="0 0 360 168">
      <Box x={12} y={28} w={64} h={44} label="DEV" />
      <HArrow x1={76} x2={100} y={50} />
      <Box x={100} y={28} w={118} h={44} label="/create-env" />
      <HArrow x1={218} x2={242} y={50} />
      <Box x={242} y={18} w={100} h={64} label="ENV" sub="TTL 24h" />
      <VArrow x={292} y1={82} y2={108} dashed />
      <Box x={242} y={108} w={100} h={40} label="DROP" dashed />
    </Frame>
  );
}
