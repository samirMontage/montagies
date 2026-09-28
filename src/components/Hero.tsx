import { ArrowDown, Send } from "lucide-react";
import { MEDIA, SITE, CONTACT } from "../data/content";
import { Reveal, Magnetic, ChessFigure } from "./ui";
import { useParallax } from "../hooks/useAnim";

export function Hero() {
  const contentRef = useParallax<HTMLDivElement>(0.1);
  const figureRef = useParallax<HTMLDivElement>(-0.06);

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Видео-фон */}
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover"
        src={MEDIA.heroVideo}
        poster={MEDIA.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/60 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(1,2,5,0.6)_100%)]" />

      {/* Декоративная фигура — ферзь (внешний слой центрирует, внутренний — параллакс) */}
      <div className="pointer-events-none absolute right-[-8%] top-1/2 -translate-y-1/2 opacity-45 lg:right-[2%] lg:opacity-60">
        <div ref={figureRef} className="w-[30rem] lg:w-[40rem]">
          <ChessFigure
            src="/images/queen.png"
            alt=""
            className="w-full drop-shadow-[0_0_80px_rgba(0,212,255,0.28)]"
          />
        </div>
      </div>

      {/* Контент */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-44 pt-24 text-center sm:pb-52 sm:pt-28 md:items-start md:pb-48 md:pt-32 md:text-left"
      >
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[9px] font-medium uppercase tracking-[0.26em] text-white/75 backdrop-blur sm:text-[11px] sm:tracking-[0.3em]">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-accent" />
            {SITE.role}
          </span>
        </Reveal>

        <Reveal delay={100} variant="wipe">
          <h1 className="mt-7 max-w-3xl text-balance text-[10vw] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[76px]">
            Монтаж, который{" "}
            <em className="font-serif font-normal italic text-accent">
              удерживает внимание
            </em>{" "}
            и продаёт
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-white/60 sm:text-lg">
            {SITE.description}
          </p>
        </Reveal>

        <Reveal delay={340}>
          <div className="mt-9 flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center">
            <Magnetic
              href="#work"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition-colors duration-300 hover:border-accent/60 hover:text-accent"
            >
              Смотреть работы
              <ArrowDown className="h-4 w-4 animate-bounce transition-colors group-hover:text-accent" />
            </Magnetic>
            <Magnetic
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-white hover:shadow-[0_0_46px_rgba(0,212,255,0.4)]"
            >
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Написать в Telegram
            </Magnetic>
          </div>
        </Reveal>
      </div>

      {/* Низ секции без статистики — чисто для визуального завершения */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-ink/90 to-transparent" aria-hidden />
    </section>
  );
}
