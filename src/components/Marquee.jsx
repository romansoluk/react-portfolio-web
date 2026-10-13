import { ArrowRight } from 'lucide-react';

export default function Marquee() {
  const items = [
    '3D Design',
    'Motion',
    'Typography',
    'Editorial',
    'Art Direction',
    'Animation',
    'Print',
    'Visual Identity',
  ];

  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden py-10 md:py-16 border-y border-black/10 bg-[#fafafa]">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 text-3xl md:text-5xl font-serif-display tracking-tight text-neutral-800 mx-6"
          >
            {item}
            <ArrowRight size={24} className="text-neutral-300" />
          </span>
        ))}
      </div>
    </div>
  );
}
