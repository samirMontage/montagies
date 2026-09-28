import { Clapperboard, Scissors, Sparkles, type LucideIcon } from "lucide-react";
import { TOOLS } from "../data/content";
import { Reveal, SpotCard } from "./ui";

const ICONS: Record<string, LucideIcon> = {
  clapperboard: Clapperboard,
  sparkles: Sparkles,
  scissors: Scissors,
};

export function Tools() {
  return (
    <section className="border-t border-white/5 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.32em] text-white/40 sm:text-[11px]">
            Работаю в
          </p>
        </Reveal>
        {/* На мобильных — горизонтальная прокрутка */}
        <Reveal delay={100}>
          <div className="no-bar -mx-6 mt-7 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-6 pb-1 sm:mx-0 sm:justify-center sm:gap-4 sm:overflow-visible sm:px-0">
            {TOOLS.map((tool) => {
              const Icon = ICONS[tool.icon];
              return (
                <SpotCard
                  key={tool.name}
                  className="group shrink-0 snap-center rounded-2xl"
                >
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/[0.07] hover:text-white hover:shadow-[0_18px_50px_rgba(0,212,255,0.14)] sm:px-7">
                    <Icon className="h-5 w-5 text-accent transition-transform duration-500 group-hover:rotate-[360deg]" />
                    {tool.name}
                  </span>
                </SpotCard>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
