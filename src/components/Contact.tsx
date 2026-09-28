import { Send } from "lucide-react";
import { CONTACT } from "../data/content";
import { Reveal, SectionMarker, Em, Magnetic, ChessFigure } from "./ui";
import { useParallax } from "../hooks/useAnim";

export function Contact() {
  const figureRef = useParallax<HTMLDivElement>(0.07);

  return (
    <section className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      {/* Большая фигура-ферзь за заголовком */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 sm:opacity-30">
        <div ref={figureRef} className="w-[24rem] sm:w-[32rem] lg:w-[38rem]">
          <ChessFigure
            src="/images/queen.png"
            alt=""
            className="w-full drop-shadow-[0_0_90px_rgba(0,212,255,0.3)]"
          />
        </div>
      </div>
      <div
        className="absolute left-1/2 top-1/2 h-96 w-[44rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-accent/12 blur-[130px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <SectionMarker>открыт для проектов</SectionMarker>
        </Reveal>
        <Reveal delay={90} variant="wipe">
          <h2 className="mt-6 text-balance text-[9vw] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            У вас есть видение.
            <br />
            У меня есть <Em>инструменты</Em>.
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-[15px] leading-relaxed text-white/60 sm:text-base">
            Напишите в Telegram — обсудим задачу, референсы и сроки. Отвечаю в
            течение пары часов.
          </p>
        </Reveal>
        <Reveal delay={270}>
          <div className="mt-10 flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center sm:justify-center">
            <Magnetic
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-white hover:shadow-[0_0_60px_rgba(0,212,255,0.45)]"
            >
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Написать в Telegram
            </Magnetic>
            <Magnetic
              href="#work"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur transition-colors duration-300 hover:border-accent/60 hover:text-accent"
            >
              Ещё раз посмотреть работы
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
