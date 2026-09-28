import { Asterisk } from "lucide-react";
import { MARQUEE_ITEMS } from "../data/content";

/* Бесконечная бегущая строка навыков */
export function Marquee() {
  return (
    <div className="group relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-4 sm:py-5">
      <div className="flex w-max animate-marquee-slow group-hover:[animation-play-state:paused]">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 items-center"
          >
            {MARQUEE_ITEMS.map((item) => (
              <span key={`${dup}-${item}`} className="flex items-center">
                <span className="text-shimmer whitespace-nowrap px-6 text-[11px] font-semibold uppercase tracking-[0.32em] sm:text-sm">
                  {item}
                </span>
                <Asterisk className="h-4 w-4 animate-spin-slow text-accent" strokeWidth={2.5} />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent sm:w-28" />
    </div>
  );
}
