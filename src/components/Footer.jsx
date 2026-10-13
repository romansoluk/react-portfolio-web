export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-10 py-12 border-t border-black/10 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <h3 className="text-4xl md:text-6xl font-serif-display tracking-tight text-neutral-300">
            Roman<span className="italic"> Soluk</span>
          </h3>
          <nav className="flex flex-wrap gap-6">
            {['Works', 'Collections', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-neutral-500 hover:text-black transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-black/5">
          <p className="text-xs text-neutral-400">
            © {year} Roman Soluk. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400">
            Lorem ipsum.
          </p>
        </div>
      </div>
    </footer>
  );
}
