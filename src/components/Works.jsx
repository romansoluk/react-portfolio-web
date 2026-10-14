import { useState } from 'react';
import { works } from '../data';
import WorkModal from './WorkModal';

export default function Works() {
  const [selected, setSelected] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
      <section id="works" className="px-6 md:px-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12 md:mb-20 border-b border-black/10 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
                Selected Works
              </p>
              <h2 className="text-3xl md:text-5xl font-serif-display tracking-tight">
                The Archive
              </h2>
            </div>
            <p className="text-sm text-neutral-400 hidden md:block">
              {works.length} projects
            </p>
          </div>

          {/* Works grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
            {works.map((work, i) => (
                <button
                    key={work.id}
                    onClick={() => setSelected(work)}
                    onMouseEnter={() => setHoveredId(work.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="group text-left"
                >
                  {/* Image container */}
                  <div className="relative overflow-hidden bg-neutral-100 aspect-[4/5] mb-4">
                    <img
                        src={work.image}
                        alt={work.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    />
                    {/* Number overlay */}
                    <div className="absolute top-3 left-3 text-xs font-medium text-white/80 mix-blend-difference">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {/* Hover overlay */}
                    <div
                        className={`absolute inset-0 bg-black/10 transition-opacity duration-500 ${
                            hoveredId === work.id ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                  </div>

                  {/* Caption */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-medium leading-snug group-hover:text-neutral-500 transition-colors duration-300">
                        {work.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        {work.tags.join(' / ')}
                      </p>
                    </div>
                    <span className="text-xs text-neutral-300 mt-0.5 shrink-0">
                  {work.year}
                </span>
                  </div>
                </button>
            ))}
          </div>
        </div>

        {selected && <WorkModal work={selected} onClose={() => setSelected(null)} />}
      </section>
  );
}
