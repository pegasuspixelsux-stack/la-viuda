"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  /** Utility classes for the frame — aspect ratio, extra spacing. */
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Framed image that drifts vertically against the scroll. The inner layer is
 * over-sized so the translation never exposes an edge. Holds still under
 * reduced-motion.
 */
export function ParallaxImage({
  src,
  alt,
  className = "aspect-[4/5]",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}: ParallaxImageProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden border border-luxury-gold/15 ${className}`}
    >
      <motion.div
        className="absolute inset-x-0 -inset-y-[8%]"
        style={reduced ? undefined : { y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
