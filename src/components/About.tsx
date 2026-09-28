import { MEDIA, ABOUT, SKILLS } from "../data/content";
import { Reveal, SectionMarker, Em } from "./ui";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Аватар */}
        <Reveal>
          <div className="relative mx-auto max-w-xs sm:max-w-sm">
            <div className="absolute -inset-10 animate-glow rounded-full bg-accent/15 blur-3xl" aria-hidden />
            {/* Вращающееся кольцо */}
            <div
              className="absolute -inset-4 animate-spin-slow rounded-[2.5rem] border border-dashed border-accent/25"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-panel p-2.5 backdrop-blur">
              <div className="group relative overflow-hidden rounded-[1.25rem]">
                <img
                  src={MEDIA.avatar}
                  alt={ABOUT.name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <span className="sheen absolute inset-0 overflow-hidden" />
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-4">
                <div>
                  <p className="text-base font-semibold text-white">{ABOUT.name}</p>
                  <p className="mt-0.5 text-[11px] text-white/50">
                    Video Editor · Reels & Longform
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1.5 text-[8px] font-medium uppercase tracking-[0.12em] text-emerald-300 sm:text-[9px]">
                  <span className="h-1.5 w-1.5 animate-blink rounded-full bg-emerald-400" />
                  {ABOUT.status}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Текст */}
        <div>
          <Reveal>
            <SectionMarker>обо мне</SectionMarker>
          </Reveal>
          <Reveal delay={80} variant="wipe">
            <h2 className="mt-5 text-[8vw] font-semibold leading-none tracking-tight sm:text-5xl">
              {ABOUT.heading} <Em>{ABOUT.headingAccent}</Em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-white/60 sm:text-base">
              {ABOUT.bio}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {SKILLS.map((skill) => (
                <li key={skill}>
                  <span className="inline-block cursor-default rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[13px] text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-accent/10 hover:text-accent">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
