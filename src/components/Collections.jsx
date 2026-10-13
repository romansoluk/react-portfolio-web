import { collections } from '../data';

export default function Collections() {
  return (
    <section id="collections" className="px-6 md:px-10 py-20 md:py-32 bg-white border-y border-black/5">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-20 border-b border-black/10 pb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
            Collections
          </p>
          <h2 className="text-3xl md:text-5xl font-serif-display tracking-tight">
            Curated Series
          </h2>
        </div>

        {/* Collections */}
        <div className="space-y-20 md:space-y-32">
          {collections.map((collection, i) => (
            <div
              key={collection.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                i % 2 === 1 ? 'md:[direction:rtl]' : ''
              }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-neutral-100 aspect-[4/3] group [direction:ltr]">
                <img
                  src={collection.image}
                  alt={collection.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 text-6xl md:text-7xl font-serif-display text-white/90 mix-blend-difference">
                  {collection.number}
                </div>
              </div>

              {/* Text */}
              <div className="[direction:ltr]">
                <h3 className="text-2xl md:text-4xl font-serif-display tracking-tight mb-4">
                  {collection.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-6 max-w-md">
                  {collection.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {collection.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full border border-black/10 text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More works link */}
        <div className="mt-20 md:mt-32 flex justify-center">
          <a
            href="#works"
            className="group inline-flex items-center gap-3 text-sm text-neutral-500 hover:text-black transition-colors duration-300 border-b border-black/10 pb-1"
          >
            <span>More Works</span>
            <span className="inline-block w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
          </a>
        </div>
      </div>
    </section>
  );
}
