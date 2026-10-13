import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function WorkModal({ work, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.3s' }} />

      {/* Content */}
      <div
        className="relative bg-[#fafafa] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors duration-300"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="w-full aspect-[16/10] bg-neutral-100 overflow-hidden">
          <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="p-6 md:p-10">
          <div className="flex items-start justify-between gap-6 mb-6">
            <h2 className="text-2xl md:text-3xl font-serif-display tracking-tight">
              {work.title}
            </h2>
            <span className="text-sm text-neutral-400 mt-1.5 shrink-0">{work.year}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border border-black/10 text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-neutral-500 leading-relaxed mt-6 max-w-2xl">
            Part of an ongoing archive of design explorations. This project
            represents a study in form, composition, and material — created as
            part of a broader creative practice spanning digital and physical
            design disciplines.
          </p>
        </div>
      </div>
    </div>
  );
}
