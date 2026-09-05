import type { Transition, Variants } from "motion/react";

/**
 * Shared motion tokens. Two springs only: one for large elements settling into
 * place, one snappier curve for controls responding to a pointer. Ease-out /
 * spring exclusively — no artificial ease-in on entrances.
 */
export const spring = {
  gentle: { type: "spring", stiffness: 190, damping: 30, mass: 1 },
  control: { type: "spring", stiffness: 420, damping: 18, mass: 0.6 },
} satisfies Record<string, Transition>;

/** Expressive ease-out for clip/opacity tweens where a spring would overshoot. */
export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Line-by-line mask reveal for the hero display type. */
export const lineReveal: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: easeOut },
  },
};

/** Fade-and-rise used once per section below the fold. */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.gentle,
  },
};
