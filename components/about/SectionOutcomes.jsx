const OUTCOMES = [
  {
    title: 'Faster Enterprise Deal Cycles',
    how: 'Structured discovery frameworks and demo playbooks replace the ad-hoc heroics that slow deals down. Every technical touchpoint is designed to advance the evaluation\u2014not stall it.',
    impact: '30\u201350% shorter sales cycles',
  },
  {
    title: 'Higher POC Conversion',
    how: 'Time-boxed evaluation frameworks with clear success criteria and solutions-design definitions ensure POCs prove value fast\u2014instead of lingering for months with no outcome.',
    impact: '2\u20133x improvement in POC-to-close rates',
  },
  {
    title: 'Fewer Implementation Failures',
    how: 'Pre-sale to post-sale handoff architecture ensures what\u2019s sold is what gets delivered. Scoping, expectations, and technical requirements transfer cleanly\u2014so implementation doesn\u2019t become the bottleneck.',
    impact: '40%+ reduction in implementation rework',
  },
  {
    title: 'Stronger Alignment Between Sales and Delivery',
    how: 'Cross-functional operating models bridge presales, implementation, and customer success. The gap between \u201Cwhat we promised\u201D and \u201Cwhat we shipped\u201D closes for good.',
    impact: 'Eliminate the #1 driver of enterprise churn',
  },
  {
    title: 'Predictable Revenue Growth',
    how: 'Scalable technical GTM systems replace the individual heroics that cap your growth. Repeatable playbooks, clear ownership, and process architecture let you grow revenue without linear headcount growth.',
    impact: 'Scale enterprise revenue without scaling headcount 1:1',
  },
];

export function SectionOutcomes() {
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-6">

        {/* Who this is for — lead */}
        <div className="text-center mb-16">
          <p className="text-[#38bdf8] font-medium text-sm uppercase tracking-widest mb-4">
            Who this is for
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-6 font-serif">
            B2B SaaS Leaders Whose Product Is Strong&mdash;but Whose Technical Sales and Delivery Process Isn&rsquo;t Scaling.
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Founders, CROs, and VP-level revenue leaders at Series&nbsp;A&ndash;D companies selling complex, technical products into the enterprise. If that sounds like you, here&rsquo;s how we move the needle.
          </p>
        </div>

        {/* Outcome cards */}
        <div className="grid gap-6">
          {OUTCOMES.map((o, i) => (
            <div
              key={o.title}
              className="bg-white rounded-xl border border-slate-200 p-8 md:p-10 flex flex-col md:flex-row md:items-start gap-6"
            >
              <div className="shrink-0 w-12 h-12 rounded-lg bg-[#0f172a] flex items-center justify-center text-[#38bdf8] font-bold text-lg">
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#0f172a] mb-2 font-serif">{o.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">{o.how}</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] text-sm font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {o.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
