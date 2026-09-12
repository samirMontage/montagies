import { useEffect, useRef } from "react";

/**
 * Фиксированный фон в стиле референса:
 * движущиеся циановые блобы, бегущая сетка, виньетка и пятно света под курсором.
 */
export function Background() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    // На тач-устройствах курсора нет — оставляем мягкое статичное свечение по центру
    if (window.matchMedia("(hover: none)").matches) {
      el.style.background =
        "radial-gradient(600px circle at 50% 30%, rgba(0,212,255,0.06), transparent 70%)";
      return;
    }

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const loop = () => {
      // мягкое «догоняние» курсора — получается плавный шлейф
      cx += (x - cx) * 0.06;
      cy += (y - cy) * 0.06;
      el.style.background = `radial-gradient(560px circle at ${cx}px ${cy}px, rgba(0,212,255,0.075), transparent 70%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Бегущая сетка */}
      <div className="bg-grid absolute -inset-[10%] animate-grid opacity-70" />

      {/* Цветные блобы — на телефоне блюр слабее: тот же вид, но заметно дешевле для GPU */}
      <div className="absolute -left-[18%] top-[-12%] h-[46rem] w-[46rem] animate-blob rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.16),transparent_65%)] blur-2xl sm:blur-3xl" />
      <div className="absolute -right-[14%] top-[26%] h-[40rem] w-[40rem] animate-blob-slow rounded-full bg-[radial-gradient(circle,rgba(0,110,255,0.13),transparent_65%)] blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-[-16%] left-[24%] h-[38rem] w-[38rem] animate-blob rounded-full bg-[radial-gradient(circle,rgba(0,255,200,0.09),transparent_65%)] blur-2xl [animation-delay:-8s] sm:blur-3xl" />

      {/* Кольцо-орбита — на телефоне и так почти не видно за маской, но постоянно вращается и лишний раз перерисовывается, поэтому скрываем только на маленьких экранах */}
      <div className="absolute left-1/2 top-1/2 hidden h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-white/[0.04] [mask-image:radial-gradient(circle,black,transparent_72%)] sm:block" />

      {/* Пятно под курсором */}
      <div ref={spotRef} className="absolute inset-0" />

      {/* Виньетка */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(1,2,5,0.75)_100%)]" />
    </div>
  );
}

/**
 * Полоса прогресса обновляет DOM напрямую. Так при прокрутке не
 * перерисовывается всё React-приложение вместе с видео и лайтбоксом.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? window.scrollY / height : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent" aria-hidden>
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-accent/40 via-accent to-white shadow-[0_0_12px_rgba(0,212,255,0.8)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
