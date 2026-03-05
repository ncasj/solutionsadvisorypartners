const FOCUS_AREAS = [
  {
    title: '1. Technical Sales Systems',
    description:
      'Designing repeatable discovery frameworks, demo architecture, and SE playbooks so your technical sales motion scales with your pipeline—not with ad-hoc heroics.',
  },
  {
    title: '2. Demo and POC Strategy',
    description:
      'Structuring high-conversion demos and POCs that accelerate enterprise deals instead of letting them drag. Clear criteria, clear timelines, clear technical win definitions.',
  },
  {
    title: '3. Implementation and Handoff Architecture',
    description:
      'Designing the systems that connect pre-sales and post-sales execution so what’s sold is what gets delivered—and implementation doesn’t become the bottleneck.',
  },
  {
    title: '4. Fractional Revenue Architecture Leadership',
    description:
      'Acting as a fractional leader who helps founders and CROs build scalable technical GTM organizations—without hiring a full-time head of SE or delivery before they’re ready.',
  },
];

export function SectionFocus() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-4 text-center font-serif">
          Core Areas of Focus
        </h2>
        <p className="text-slate-600 text-lg text-center max-w-2xl mx-auto mb-16">
          Where we help you build and fix the systems that drive revenue.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {FOCUS_AREAS.map((area) => (
            <div
              key={area.title}
              className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm"
            >
              <h3 className="text-xl font-bold text-[#0f172a] mb-3 font-serif">
                {area.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
