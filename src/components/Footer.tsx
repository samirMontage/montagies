import { ArrowUp, Code2, Send } from "lucide-react";
import { CONTACT, NAV_LINKS } from "../data/content";
import { Logo } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 md:flex-row md:justify-between">
        <Logo />

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/55 transition-colors duration-300 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={CONTACT.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-accent hover:text-accent"
          >
            <Send className="h-4 w-4" />
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub репозиторий"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-accent hover:text-accent"
          >
            <Code2 className="h-4 w-4" />
          </a>
          <a
            href="#top"
            aria-label="Наверх"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-accent text-ink transition-all duration-300 hover:bg-white"
          >
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-xs tracking-wide text-white/35">
        © {new Date().getFullYear()} SamirTOcreator — Premium Video Editing.
        Все права защищены.
      </p>
    </footer>
  );
}
