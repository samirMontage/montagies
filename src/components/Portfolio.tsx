import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Play, Send, X } from "lucide-react";
import { CONTACT, WORKS, type Work } from "../data/content";
import { Reveal, SectionMarker, Em, SpotCard } from "./ui";
import { useIsTouch } from "../hooks/useAnim";

const TABS = [
  { id: "all", label: "Все" },
  { id: "reels", label: "Reels" },
  { id: "horizontal", label: "Горизонтальные" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* Сетки карточек. Размеры на компьютере не изменены.
   На телефоне вертикальные ролики идут по одному в ряд, как горизонтальные. */
const REELS_GRID =
  "grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3";
const REEL_ITEM = "w-full max-w-[300px] sm:max-w-none";
const HORIZONTAL_GRID = "grid gap-5 sm:grid-cols-2";

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

  /* Клавиатура и блокировка прокрутки страницы, пока открыт плеер */
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

  const reelsList = (
    <div className={REELS_GRID}>
      {reels.map((w, i) => (
        <Reveal key={w.id} delay={i * 90} className={REEL_ITEM}>
          <VideoCard work={w} onOpen={() => open(w)} touch={touch} tall />
        </Reveal>
      ))}
    </div>
  );

  const horizontalList = (
    <div className={HORIZONTAL_GRID}>
      {horizontal.map((w, i) => (
        <Reveal key={w.id} delay={i * 90}>
          <VideoCard work={w} onOpen={() => open(w)} touch={touch} />
        </Reveal>
      ))}
    </div>
  );

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

      {/* Сетки работ */}
      <div className="mx-auto max-w-6xl px-6">
        {tab === "all" && (
          <div className="mt-12 space-y-12">
            <div>
              <GroupTitle>Reels · вертикальные</GroupTitle>
              <div className="mt-5">{reelsList}</div>
            </div>
            <div>
              <GroupTitle>Горизонтальные</GroupTitle>
              <div className="mt-5">{horizontalList}</div>
            </div>
          </div>
        )}
        {tab === "reels" && <div className="mt-12">{reelsList}</div>}
        {tab === "horizontal" && <div className="mt-12">{horizontalList}</div>}
      </div>

      {/* Плеер */}
      {selected && (
        <Lightbox
          work={selected}
          position={(index ?? 0) + 1}
          total={WORKS.length}
          onClose={close}
          onStep={step}
        />
      )}
    </section>
  );
}

/* ---------- Подзаголовок группы работ ---------- */
function GroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-white/12 to-transparent" />
    </div>
  );
}

/* ---------- Плеер ----------
   Рамка подстраивается под реальное соотношение сторон каждого ролика:
   вертикальные открываются вертикальными, горизонтальные — горизонтальными,
   без чёрных полей вокруг. */
function Lightbox({
  work,
  position,
  total,
  onClose,
  onStep,
}: {
  work: Work;
  position: number;
  total: number;
  onClose: () => void;
  onStep: (dir: number) => void;
}) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  /* Свайп влево и вправо на телефоне переключает ролики */
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      onStep(dx < 0 ? 1 : -1);
    }
  };

  const arrowClass =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-ink/60 text-white backdrop-blur transition-all duration-300 hover:border-accent hover:text-accent active:scale-95";

  return (
    <div
      className="lightbox fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/95 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр видео"
    >
      {/* Верхняя панель */}
      <div className="lightbox-top absolute inset-x-0 top-0 flex items-center justify-between px-4 sm:px-6">
        <span className="rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 text-[11px] font-medium tabular-nums tracking-[0.18em] text-white/60 backdrop-blur">
          {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className={`${arrowClass} hover:rotate-90`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Стрелки по бокам на компьютере */}
      <button
        type="button"
        aria-label="Предыдущее видео"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        className={`${arrowClass} absolute left-6 top-1/2 hidden -translate-y-1/2 sm:flex`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Следующее видео"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        className={`${arrowClass} absolute right-6 top-1/2 hidden -translate-y-1/2 sm:flex`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        className="flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* key сбрасывает размеры и загрузку при переключении ролика */}
        <PlayerFrame key={work.id} work={work} />

        {/* Нижняя панель */}
        <div className="mt-4 flex w-full items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Предыдущее видео"
            onClick={() => onStep(-1)}
            className={`${arrowClass} sm:hidden`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-accent sm:inline-block">
            {work.categoryLabel}
          </span>
          <a
            href={CONTACT.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-white"
          >
            <Send className="h-3.5 w-3.5" />
            Хочу так же
          </a>
          <button
            type="button"
            aria-label="Следующее видео"
            onClick={() => onStep(1)}
            className={`${arrowClass} sm:hidden`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PlayerFrame({ work }: { work: Work }) {
  const ref = useRef<HTMLVideoElement>(null);
  // Сначала берём соотношение по категории, затем уточняем по самому файлу
  const [ratio, setRatio] = useState(work.category === "reels" ? 9 / 16 : 16 / 9);
  const [loading, setLoading] = useState(true);

  const onMeta = () => {
    const el = ref.current;
    if (!el) return;
    if (el.videoWidth && el.videoHeight) setRatio(el.videoWidth / el.videoHeight);
    // Если браузер запретил автозапуск со звуком, запускаем без звука.
    // Звук включается кнопкой в самом плеере.
    el.play().catch(() => {
      el.muted = true;
      el.play().catch(() => {});
    });
  };

  return (
    <div
      className="player-frame relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.7),0_0_60px_rgba(0,212,255,0.08)]"
      style={{ "--r": ratio, aspectRatio: String(ratio) } as React.CSSProperties}
    >
      <video
        ref={ref}
        src={work.src}
        controls
        autoPlay
        playsInline
        preload="auto"
        controlsList="nodownload"
        onLoadedMetadata={onMeta}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onPlaying={() => setLoading(false)}
        className="absolute inset-0 h-full w-full object-contain"
      />
      {loading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-9 w-9 animate-spin text-accent" />
        </div>
      )}
    </div>
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Превью запускается при наведении на всю карточку.
  // Раньше слои поверх видео перехватывали наведение, и превью не играло.
  const onEnter = () => {
    if (touch) return;
    videoRef.current?.play().catch(() => {});
  };
  const onLeave = () => {
    const el = videoRef.current;
    if (touch || !el) return;
    el.pause();
    el.currentTime = 0.1;
  };

  return (
    <SpotCard className="group h-full rounded-2xl">
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        aria-label={`Смотреть видео: ${work.categoryLabel}`}
        className="relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-panel text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_26px_80px_rgba(0,212,255,0.15)]"
      >
        <div className={tall ? "aspect-[9/16]" : "aspect-video"}>
          <PreviewVideo
            ref={videoRef}
            src={work.src}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
        <span className="sheen pointer-events-none absolute inset-0 overflow-hidden" />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/15 bg-ink/60 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur">
          {work.categoryLabel}
        </span>
        {/* Кнопка Play: на телефоне видна всегда, на компьютере появляется при наведении */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-accent/90 text-ink shadow-[0_0_30px_rgba(0,212,255,0.45)] backdrop-blur transition-all duration-300 ${
              touch
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            }`}
          >
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </span>
        </span>
      </button>
    </SpotCard>
  );
}

/* ---------- Превью ----------
   Метка #t=0.1 заставляет iPhone и Android показать первый кадр ролика
   вместо чёрного прямоугольника, даже без отдельной картинки-постера. */
function PreviewVideo({
  ref,
  src,
  className = "",
}: {
  ref: React.Ref<HTMLVideoElement>;
  src: string;
  className?: string;
}) {
  return (
    <video
      ref={ref}
      src={`${src}#t=0.1`}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      className={className}
    />
  );
}
