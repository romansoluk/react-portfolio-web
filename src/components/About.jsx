export default function About() {
  const tools = ['Blender', 'Touchdesigner', 'C4D', 'Unity', 'After Effects', 'Cavalry', 'Figma', 'InDesign'];

  return (
    <section id="about" className="px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-20 border-b border-black/10 pb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">About</p>
          <h2 className="text-3xl md:text-5xl font-serif-display tracking-tight">
            The Designer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Bio */}
          <div className="md:col-span-7">
            <p className="text-lg md:text-2xl font-serif-display leading-relaxed text-neutral-700 mb-6">
              multidisciplinary designer
              of <span className="italic">3D, motion, and typography</span>.
            </p>
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed mb-4 max-w-xl">
              My work moves between digital and physical — from animated 3D
              compositions to printed editorial pieces. I treat every project
              as an experiment, building an ongoing archive of process and
              output.
            </p>
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-xl">
              This site serves as a living catalog of that work — organized by
              collection, tagged by discipline, and updated as new explorations
              are completed.
            </p>
          </div>

          {/* Tools / info */}
          <div className="md:col-span-5 md:pl-12 md:border-l border-black/10">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
                Tools & Software
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-3 py-1.5 rounded-full border border-black/10 text-neutral-600 hover:bg-black hover:text-white transition-colors duration-300 cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
                Disciplines
              </p>
              <ul className="space-y-2">
                {['3D Design', 'Motion & Animation', 'Typography', 'Editorial Design', 'Art Direction', 'UX / UI Design'].map(
                  (discipline) => (
                    <li
                      key={discipline}
                      className="text-sm text-neutral-600 flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                      {discipline}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
