import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { CONTACT, FAQ } from "../data/content";
import { Reveal, SectionMarker, Em, ChessFigure } from "./ui";
import { useParallax } from "../hooks/useAnim";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const figureRef = useParallax<HTMLDivElement>(-0.06);

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-white/[0.02] py-20 sm:py-28">
      {/* Фигура-конь, как в референсе */}
      <div
        ref={figureRef}
        className="pointer-events-none absolute -bottom-10 -left-16 w-52 opacity-30 sm:w-72 lg:-left-6 lg:w-96 lg:opacity-40"
      >
        <ChessFigure
          src="/images/knight.png"
          alt=""
          className="w-full drop-shadow-[0_0_50px_rgba(0,212,255,0.25)]"
          delay={-3000}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        <div>
          <Reveal>
            <SectionMarker>faq</SectionMarker>
          </Reveal>
          <Reveal delay={80} variant="wipe">
            <h2 className="mt-5 text-[8vw] font-semibold leading-none tracking-tight sm:text-5xl">
              Частые <Em>вопросы</Em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              Не нашли ответ? Напишите — помогу разобраться с любой задачей по
              монтажу.
            </p>
            <a
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-white"
            >
              Задать вопрос в Telegram
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Reveal>
        </div>

        <div>
          {FAQ.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 90}>
                <div className="group border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left sm:gap-6 sm:py-6"
                  >
                    <span
                      className={`text-[15px] font-medium transition-colors duration-300 sm:text-lg ${
                        open
                          ? "text-accent"
                          : "text-white/90 group-hover:text-accent"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        open
                          ? "rotate-[135deg] border-accent bg-accent text-ink"
                          : "border-white/15 text-white/70 group-hover:border-accent/50 group-hover:text-accent"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      open
                        ? "grid-rows-[1fr] pb-6 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl text-[13px] leading-relaxed text-white/55 sm:text-sm">
                        {item.a.split("в Telegram").map((part, idx, arr) =>
                          idx === arr.length - 1 ? (
                            part
                          ) : (
                            <span key={idx}>
                              {part}
                              <a
                                href={CONTACT.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                              >
                                в Telegram
                              </a>
                            </span>
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
