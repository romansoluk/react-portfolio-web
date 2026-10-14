import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-16 pt-32">
        {/* Background subtle grid */}
        <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                  'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Top intro line */}
          <div className="flex items-baseline justify-between mb-auto pt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Portfolio Archive — 2021 / 2024
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 hidden md:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Multidisciplinary Designer
            </p>
          </div>

          {/* Main display text */}
          <div className="mt-auto">
            <h1
                className="text-display font-serif-display tracking-tight animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
            >
              Roman<span className="italic text-neutral-400"> Soluk</span>
            </h1>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-8">
              <p
                  className="text-base md:text-lg text-neutral-600 max-w-md leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: '0.5s' }}
              >
                A multidisciplinary designer working across 3D, motion, typography,
                and editorial design. This is an archive of selected works.
              </p>

              <a
                  href="#works"
                  className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-black transition-colors duration-300 animate-fade-in-up self-start md:self-auto"
                  style={{ animationDelay: '0.7s' }}
              >
                <span>Scroll to explore</span>
                <ArrowDown
                    size={16}
                    className="animate-bounce group-hover:translate-y-1 transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
  );
}
