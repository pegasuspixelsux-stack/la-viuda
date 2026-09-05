"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { sectionReveal, spring } from "@/components/lib/motion";

type RevealProps = Omit<ComponentPropsWithoutRef<typeof motion.div>, "children"> & {
  /** Delay in seconds before the reveal begins once in view. */
  delay?: number;
  children?: ReactNode;
};

/**
 * One quiet fade-and-rise as the element scrolls into view, fired once.
 * Collapses to a plain container when the visitor prefers reduced motion.
 */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div {...(rest as ComponentPropsWithoutRef<"div">)}>{children}</div>;
  }

  return (
    <motion.div
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ ...spring.gentle, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
