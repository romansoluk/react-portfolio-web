import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.target.reset();
  };

  return (
      <section id="contact" className="px-6 md:px-10 py-20 md:py-32 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-12 md:mb-20 border-b border-black/10 pb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">Contact</p>
            <h2 className="text-3xl md:text-5xl font-serif-display tracking-tight">
              Get in Touch
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Left: info */}
            <div>
              <p className="text-lg md:text-xl font-serif-display text-neutral-700 leading-relaxed mb-8">
                Available for freelance projects, collaborations, and conversations
                about design.
              </p>

              <div className="space-y-6">
                <a
                    href="mailto:roman.soluk25@gmail.com"
                    className="group flex items-center gap-2 text-sm text-neutral-600 hover:text-black transition-colors duration-300"
                >
                  <span>roman.soluk25@gmail.com</span>
                  <ArrowUpRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>

                <div className="flex gap-6 pt-4">
                  {['Instagram', 'Behance', 'LinkedIn'].map((social) => (
                      <a
                          key={social}
                          href="#"
                          className="text-sm text-neutral-500 hover:text-black transition-colors duration-300 relative group"
                      >
                        {social}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
                      </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2">
                    Name
                  </label>
                  <input
                      type="text"
                      required
                      className="w-full border-b border-black/15 pb-2 bg-transparent text-sm text-neutral-800 outline-none focus:border-black transition-colors duration-300 placeholder:text-neutral-300"
                      placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2">
                    Email
                  </label>
                  <input
                      type="email"
                      required
                      className="w-full border-b border-black/15 pb-2 bg-transparent text-sm text-neutral-800 outline-none focus:border-black transition-colors duration-300 placeholder:text-neutral-300"
                      placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2">
                    Message
                  </label>
                  <textarea
                      required
                      rows={3}
                      className="w-full border-b border-black/15 pb-2 bg-transparent text-sm text-neutral-800 outline-none focus:border-black transition-colors duration-300 placeholder:text-neutral-300 resize-none"
                      placeholder="Tell me about your project..."
                  />
                </div>

                <button
                    type="submit"
                    className="group inline-flex items-center gap-3 px-6 py-3 bg-black text-white text-sm rounded-full hover:bg-neutral-800 transition-all duration-300"
                >
                  <span>{sent ? 'Message sent' : 'Send message'}</span>
                  {sent && <span className="text-white/70">—</span>}
                  {!sent && (
                      <span className="inline-block w-4 h-px bg-white transition-all duration-300 group-hover:w-8" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}
