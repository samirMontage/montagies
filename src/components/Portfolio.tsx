import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Send, X } from "lucide-react";
import { CONTACT, WORKS, type Work } from "../data/content";
import { Reveal, SectionMarker, Em, SpotCard } from "./ui";
import { useIsTouch } from "../hooks/useAnim";

const TABS = [
  { id: "all", label: "Все" },
  { id: "reels", label: "Reels" },
  { id: "horizontal", label: "Горизонтальные" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Portfolio() {
  const [tab, setTab] = useState<TabId>("all");
  const [index, setIndex] = useState<number | null>(null);
  const touch = useIsTouch();

  const reels = WORKS.filter((w) => w.category === "reels");
  const horizontal = WORKS.filter((w) => w.category === "horizontal");
  const selected = index === null ? null : WORKS[index];

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + WORKS.length) % WORKS.length)),
    []
  );

  /* Клавиатура + блокировка прокрутки в лайтбоксе */
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const open = (w: Work) => setIndex(WORKS.findIndex((x) => x.id === w.id));

  return (
    <section id="work" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionMarker>портфолио</SectionMarker>
        </Reveal>
        <div className="mt-5 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <Reveal delay={80} variant="wipe">
            <h2 className="text-[8vw] font-semibold leading-none tracking-tight sm:text-5xl">
              Избранные <Em>работы</Em>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              Каждое видео открывается в полном размере — со звуком и в
              максимальном качестве.
            </p>
          </Reveal>
        </div>

        {/* Табы */}
        <Reveal delay={240}>
          <div className="no-bar mt-9 -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:px-0">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  tab === t.id
                    ? "border-accent bg-accent text-ink shadow-[0_0_26px_rgba(0,212,255,0.35)]"
                    : "border-white/12 bg-white/[0.03] text-white/60 hover:border-accent/50 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Вкладка «Все»: две бесконечные ленты в разные стороны */}
      {tab === "all" && (
        <div className="mt-12 space-y-5">
          <MarqueeRow items={reels} onOpen={open} touch={touch} direction="left" />
          <MarqueeRow
            items={horizontal}
            onOpen={open}
            touch={touch}
            direction="right"
          />
        </div>
      )}

      {/* Вкладки с сеткой */}
      <div className="mx-auto max-w-6xl px-6">
        {tab === "reels" && (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {reels.map((w, i) => (
              <Reveal key={w.id} delay={i * 90}>
                <VideoCard work={w} onOpen={() => open(w)} touch={touch} tall />
              </Reveal>
            ))}
          </div>
        )}
        {tab === "horizontal" && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {horizontal.map((w, i) => (
              <Reveal key={w.id} delay={i * 90}>
                <VideoCard work={w} onOpen={() => open(w)} touch={touch} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Лайтбокс */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-md sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink/60 text-white backdrop-blur transition-all duration-300 hover:rotate-90 hover:border-accent hover:text-accent"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Предыдущее видео"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink/60 text-white backdrop-blur transition-all hover:border-accent hover:text-accent sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Следующее видео"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink/60 text-white backdrop-blur transition-all hover:border-accent hover:text-accent sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={selected.id}
              src={selected.src}
              controls
              autoPlay
              playsInline
              className="max-h-[68vh] w-full rounded-2xl border border-white/10 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:mt-5">
              <div>
                <h3 className="text-base font-semibold text-white sm:text-lg">
                  {selected.title}
                </h3>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-accent">
                  {selected.categoryLabel}
                </p>
              </div>
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-white"
              >
                <Send className="h-3.5 w-3.5" />
                Хочу так же
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Бесконечная лента ---------- */
function MarqueeRow({
  items,
  onOpen,
  touch,
  direction,
}: {
  items: Work[];
  onOpen: (w: Work) => void;
  touch: boolean;
  direction: "left" | "right";
}) {
  const reels = items[0]?.category === "reels";
  return (
    <div className="group/row relative">
      {/* gap вынесен внутрь копий (pr-*) — иначе translateX(-50%) даёт скачок на каждом цикле */}
      <div
        className={`flex w-max ${
          direction === "left" ? "animate-marquee" : "animate-marquee-rev"
        } group-hover/row:[animation-play-state:paused]`}
      >
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5"
          >
            {items.map((w) => (
              <StripCard
                key={`${dup}-${w.id}`}
                work={w}
                onOpen={() => onOpen(w)}
                touch={touch}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent sm:w-32" />
      <span className="pointer-events-none absolute -left-1 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent lg:block" />
      <span
        className={`pointer-events-none absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent lg:block ${
          reels ? "right-0" : "left-0"
        }`}
      />
    </div>
  );
}

function StripCard({
  work,
  onOpen,
  touch,
}: {
  work: Work;
  onOpen: () => void;
  touch: boolean;
}) {
  const isReels = work.category === "reels";
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex h-40 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-panel transition-all duration-500 hover:z-10 hover:scale-[1.04] hover:border-accent/60 hover:shadow-[0_20px_60px_rgba(0,212,255,0.2)] sm:h-52 sm:rounded-2xl lg:h-60"
    >
      {/* Ширина считается сама из соотношения сторон — без обрезки видео */}
      <div
        className={`h-full w-auto shrink-0 ${
          isReels ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <AutoVideo src={work.preview} touch={touch} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent" />
      <span className="sheen absolute inset-0 overflow-hidden" />
      <span className="absolute left-2.5 top-2.5 rounded-full border border-white/15 bg-ink/60 px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur sm:text-[9px]">
        {work.categoryLabel}
      </span>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-accent/90 text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <Play className="h-4 w-4 fill-current" />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 block truncate px-3 pb-2.5 text-left text-[11px] font-medium text-white sm:text-xs">
        {work.title}
      </span>
    </button>
  );
}

/* ---------- Карточка сетки ---------- */
function VideoCard({
  work,
  onOpen,
  touch,
  tall = false,
}: {
  work: Work;
  onOpen: () => void;
  touch: boolean;
  tall?: boolean;
}) {
  return (
    <SpotCard className="group h-full rounded-2xl">
      <button
        type="button"
        onClick={onOpen}
        className="relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-panel text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_26px_80px_rgba(0,212,255,0.15)]"
      >
        <div className={tall ? "aspect-[9/16]" : "aspect-video"}>
          <AutoVideo
            src={work.preview}
            touch={touch}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/10 to-ink/20" />
        <span className="sheen absolute inset-0 overflow-hidden" />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-ink/60 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur">
          {work.categoryLabel}
        </span>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-white sm:text-base">
            {work.title}
          </h3>
          <span className="flex h-9 w-9 shrink-0 translate-y-2 items-center justify-center rounded-full bg-accent text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Play className="h-3.5 w-3.5 fill-current" />
          </span>
        </div>
      </button>
    </SpotCard>
  );
}

/* ---------- Видео: hover на десктопе, авто-воспроизведение в кадре на тач ----------
   Источник видео подключается лениво: пока карточка далеко от области
   видимости, <video> вообще ничего не загружает. Это особенно важно для
   вкладки «Все», где на экране одновременно присутствуют 12 роликов —
   без этого телефон начинал бы качать метаданные всех сразу. */
function AutoVideo({
  src,
  touch,
  className = "",
}: {
  src: string;
  touch: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const loadSrc = () => {
      if (loaded.current) return;
      loaded.current = true;
      el.src = src;
    };

    // На телефонах одновременно видны несколько дубликатов видео из ленты.
    // Показываем первый кадр, но не декодируем все ролики во время скролла.
    if (touch) {
      const showFirstFrame = () => {
        if (el.duration && Number.isFinite(el.duration)) el.currentTime = 0.01;
      };
      el.addEventListener("loadedmetadata", showFirstFrame, { once: true });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) loadSrc();
        },
        { rootMargin: "500px 150px" }
      );
      io.observe(el);

      return () => {
        io.disconnect();
        el.removeEventListener("loadedmetadata", showFirstFrame);
      };
    }

    // На компьютерах видео подгружается у видимой карточки и играет при наведении.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadSrc();
        else el.pause();
      },
      { threshold: 0.3, rootMargin: "300px" }
    );
    io.observe(el);

    const onEnter = () => {
      loadSrc();
      el.play().catch(() => {});
    };
    const onLeave = () => {
      el.pause();
      el.currentTime = 0;
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      io.disconnect();
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [touch, src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
