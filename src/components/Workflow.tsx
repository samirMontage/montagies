import { STEPS } from "../data/content";
import { Reveal, SectionMarker, Em, SpotCard, ChessFigure } from "./ui";
import { useParallax } from "../hooks/useAnim";

export function Workflow() {
  const figureRef = useParallax<HTMLDivElement>(-0.05);

  return (
    <section
      id="workflow"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/5 py-20 sm:py-28"
    >
      {/* Фигура-конь на фоне */}
      <div
        ref={figureRef}
        className="pointer-events-none absolute -left-24 top-1/3 w-[30rem] opacity-20"
      >
        <ChessFigure src="/images/rook.png" alt="" className="w-full" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionMarker>схема работы</SectionMarker>
        </Reveal>
        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal delay={80} variant="wipe">
            <h2 className="text-[8vw] font-semibold leading-none tracking-tight sm:text-5xl">
              Как мы <Em>работаем</Em>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Прозрачный процесс без сюрпризов: вы всегда знаете, что происходит
              с проектом.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.id} delay={i * 110} className="h-full">
              <SpotCard className="group h-full bg-ink transition-colors duration-500 hover:bg-panel">
                <article className="relative h-full p-6 sm:p-7">
                  <span className="block font-serif text-5xl font-light italic leading-none text-white/10 transition-all duration-500 group-hover:text-accent/50 sm:text-6xl">
                    {step.id}
                  </span>
                  <span className="absolute right-5 top-6 h-2 w-2 rounded-full bg-white/15 transition-all duration-500 group-hover:animate-glow group-hover:bg-accent group-hover:shadow-[0_0_18px_rgba(0,212,255,0.9)]" />
                  <h3 className="mt-7 text-base font-semibold text-white sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-white/55 sm:text-sm">
                    {step.text}
                  </p>
                  <span className="mt-6 block h-px w-8 bg-accent transition-all duration-700 group-hover:w-full" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                </article>
              </SpotCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
