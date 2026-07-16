const links = [
  ["about", "#about"],
  ["skills", "#skills"],
  ["projects", "#projects"],
  ["beyond", "#beyond"],
  ["now", "#now"],
  ["contact", "#contact"],
];

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 select-none">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo left */}
        <a href="#top" className="flex items-center gap-1.5 group">
          <span className="font-serif text-2xl font-bold text-[color:var(--ink)] tracking-tight">
            Rosh
          </span>
          <span className="text-[color:var(--rose-deep)] text-lg group-hover:rotate-12 transition-transform duration-300">
            ✦
          </span>
        </a>

        {/* Nav pill center */}
        <nav
          className="hidden md:flex items-center gap-8 rounded-full px-7 py-2.5 border border-[color:var(--ink)]/10 shadow-[0_8px_20px_-6px_rgba(95,30,45,0.15)] bg-[color:var(--paper)]/80 backdrop-blur-sm"
        >
          {links.map(([l, href]) => (
            <a
              key={l}
              href={href}
              className="font-serif text-[15px] lowercase text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Say Hi right */}
        <a
          href="#contact"
          className="hand text-lg text-[color:var(--ink)] hover:text-[color:var(--rose-deep)] transition-colors duration-200 relative group"
        >
          say hi →
          <span className="absolute left-0 bottom-[-2px] w-full h-[2.5px] bg-[color:var(--rose-deep)]/40 rounded-full scale-x-100 group-hover:bg-[color:var(--rose-deep)]/70 transition-colors" />
        </a>
      </div>
    </header>
  );
}
