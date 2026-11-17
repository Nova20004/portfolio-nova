"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Variant = "hero" | "about" | "skills" | "projects" | "contact";

export function Diagonal({ variant }: { variant: Variant }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-1.5%", "1.5%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-0.4, 0.4]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`diag diag-${variant}`}
      style={reduce ? undefined : { y, rotate }}
    />
  );
}
