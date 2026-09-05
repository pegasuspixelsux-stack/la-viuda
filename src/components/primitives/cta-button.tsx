"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { spring } from "@/components/lib/motion";

type Variant = "solid" | "outline";

const base =
  "group inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] " +
  "transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-luxury-dark";

const variants: Record<Variant, string> = {
  solid: "bg-luxury-gold text-luxury-dark hover:bg-luxury-sand",
  outline:
    "border border-luxury-gold/50 text-luxury-gold hover:border-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark",
};

type CtaButtonProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd"
> & {
  variant?: Variant;
  children: ReactNode;
};

/**
 * Anchor styled as a call to action. Presses in on tap and lifts on hover with
 * the control spring; both are dropped under reduced-motion, leaving the colour
 * transition intact.
 */
export function CtaButton({
  variant = "solid",
  className = "",
  children,
  ...rest
}: CtaButtonProps) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={reduced ? undefined : { scale: 1.03 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={spring.control}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
