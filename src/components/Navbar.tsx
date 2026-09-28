import { useEffect, useState } from "react";
import { Menu, Send, X } from "lucide-react";
import { CONTACT, NAV_LINKS } from "../data/content";
import { Logo } from "./ui";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const offset = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const bottom = top + el.getBoundingClientRect().height;
          if (offset >= top && offset <= bottom) current = link.href;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Блокируем прокрутку, когда открыто мобильное меню */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  active === link.href
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-4 -bottom-px h-px bg-accent transition-transform duration-300 ${
                    active === link.href
                      ? "scale-x-100"
                      : "scale-x-0 hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Компактная кнопка Telegram — всегда под рукой на мобильных */}
            <a
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в Telegram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-ink transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] md:hidden"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-white hover:shadow-[0_0_36px_rgba(0,212,255,0.35)] md:inline-flex"
            >
              <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Обсудить проект
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent/60 hover:text-accent md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <Logo />
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col items-center justify-center gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-3xl font-semibold tracking-tight transition-all duration-500 ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } ${active === link.href ? "text-accent" : "text-white hover:text-accent"}`}
              style={{ transitionDelay: menuOpen ? `${120 + i * 90}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT.telegram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-base font-semibold text-ink transition-transform duration-300 hover:scale-105"
          >
            <Send className="h-4 w-4" />
            Написать в Telegram
          </a>
        </nav>
      </div>
    </>
  );
}
