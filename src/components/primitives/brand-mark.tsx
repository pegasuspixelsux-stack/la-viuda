import { Lighthouse } from "lucide-react";

type BrandMarkProps = {
  /** "onDark" over the hero photo (white); "onLight" on a pale ground (navy). */
  tone?: "onDark" | "onLight";
  className?: string;
};

/**
 * Lighthouse glyph beside a stacked wordmark — a small "La Casa" over a larger
 * "de la Viuda". Monochrome: white over the hero, navy on a pale ground.
 * Used in the navigation and footer.
 */
export function BrandMark({ tone = "onLight", className = "" }: BrandMarkProps) {
  const color = tone === "onDark" ? "text-white" : "text-luxury-ink";

  return (
    <span className={`flex items-center gap-3 ${color} ${className}`}>
      <Lighthouse
        className="h-6 w-6 shrink-0"
        strokeWidth={1.25}
        aria-hidden
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[0.58rem] font-normal uppercase tracking-[0.42em]">
          La Casa
        </span>
        <span className="mt-1 font-serif text-[0.95rem] font-light uppercase tracking-[0.32em]">
          de la Viuda
        </span>
      </span>
    </span>
  );
}
