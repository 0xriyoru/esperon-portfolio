import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import ScrollProgress from "./ScrollProgress";

const links = [
  { href: "#work", label: "Systems", mobile: true },
  { href: "#experience", label: "Experience", mobile: false },
  { href: "#skills", label: "Skills", mobile: false },
  { href: "#contact", label: "Contact", mobile: true },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <ScrollProgress />
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="font-display text-lg font-normal tracking-tight">
          Rhodge Esperon
        </a>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm md:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`link-draw py-1 ${l.mobile ? "" : "hidden sm:inline"}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-note border border-rule-strong px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            View CV
            <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
