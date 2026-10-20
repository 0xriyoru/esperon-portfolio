const links = [
  { href: "#projects", label: "Projects", mobile: true },
  { href: "#journey", label: "Journey", mobile: false },
  { href: "#skills", label: "Skills", mobile: false },
  { href: "#activity", label: "Activity", mobile: false },
  { href: "#contact", label: "Contact", mobile: true },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
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
        </nav>
      </div>
    </header>
  );
}
