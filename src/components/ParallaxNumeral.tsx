"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties } from "react";

export function ParallaxNumeral({ number, className, style }: { number: string; className: string; style: CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "22%"]);

  return (
    <motion.p ref={ref} aria-hidden="true" className={className} style={reduce ? style : { ...style, y, willChange: "transform" }}>
      {number}
    </motion.p>
  );
}
