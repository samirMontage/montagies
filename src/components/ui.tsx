import { useRef, type ReactNode, type MouseEvent } from "react";
import { Play } from "lucide-react";
import { useReveal, useSpotlight } from "../hooks/useAnim";

/* Появление при скролле: подъём + расфокус */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "wipe";
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${variant} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* Маркер секции: «• портфолио» */
export function SectionMarker({ children }: { children: ReactNode }) {
  const ref = useReveal<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      className="rise inline-flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.32em] text-accent sm:text-[11px]"
    >
      <span className="h-1 w-1 animate-blink rounded-full bg-accent" />
      {children}
    </span>
  );
}

/* Логотип */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent transition-transform duration-500 group-hover:rotate-[360deg]">
        <Play className="h-3.5 w-3.5 fill-ink text-ink" />
      </span>
      <span className="text-sm font-semibold tracking-tight text-white">
        Samir<span className="text-accent">TO</span>creator
      </span>
    </a>
  );
}

/* Курсивный серифный акцент в заголовке */
export function Em({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal italic text-accent">{children}</em>;
}

/* Кнопка, слегка тянущаяся к курсору */
export function Magnetic({
  children,
  className = "",
  href,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    el.style.transform = `translate(${dx * 9}px, ${dy * 7}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

/* Карточка со свечением под курсором */
export function SpotCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useSpotlight<HTMLDivElement>();
  return (
    <div ref={ref} className={`spot ${className}`}>
      {children}
    </div>
  );
}

/* Декоративная шахматная фигура (фон PNG убирается через screen) */
export function ChessFigure({
  src,
  alt,
  className = "",
  float = true,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  float?: boolean;
  delay?: number;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      className={`blend-screen pointer-events-none select-none ${
        float ? "animate-float-slow" : ""
      } ${className}`}
      style={{
        animationDelay: delay ? `${delay}ms` : undefined,
        // Растушёвка краёв: скрывает подложку картинки и мягко растворяет фигуру в фоне
        maskImage:
          "radial-gradient(ellipse at center, black 42%, rgba(0,0,0,0.6) 62%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 42%, rgba(0,0,0,0.6) 62%, transparent 78%)",
      }}
    />
  );
}
