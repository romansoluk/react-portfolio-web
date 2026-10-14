export default function Header() {
  return (
      <header className="archive-header">
        <a href="#top" className="archive-name" onClick={() => onSelect(null, 'works')}>ROMAN SOLUK</a>
        <nav className="archive-nav" aria-label="Main navigation">
          <a href="#works">↓ Works</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </nav>
      </header>
  );
}
