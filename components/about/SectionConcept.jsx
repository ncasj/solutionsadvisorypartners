const FLOW_STEPS = [
  { title: 'Sales Discovery' },
  { title: 'Technical Validation', subtitle: 'Demos + POCs' },
  { title: 'Implementation Readiness' },
  { title: 'Customer Success' },
];

function FlowConnector() {
  return (
    <div
      className="w-0.5 h-5 mx-auto flex-shrink-0"
      style={{ background: 'linear-gradient(to bottom, #38bdf8, #cbd5e1)' }}
      aria-hidden
    />
  );
}

export function SectionConcept() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-4 font-serif">
          The Concept: Revenue Delivery Architecture
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-12 max-w-2xl">
          <strong className="text-[#0f172a]">Revenue Delivery Architecture</strong> is the operational architecture that connects technical sales, validation, and delivery so complex enterprise deals can scale. When it’s designed well, each stage feeds the next. When it’s missing or misaligned, deals stall and implementation fails.
        </p>
        <div className="bg-white rounded-xl border border-slate-200 p-8 md:p-10 shadow-sm">
          <div className="flex flex-col items-stretch gap-0">
            {FLOW_STEPS.map((step, i) => (
              <div key={step.title} className="flex flex-col items-stretch gap-0">
                {i > 0 && <FlowConnector />}
                <div className="py-5 px-6 rounded-lg bg-slate-50 border border-slate-100 text-center">
                  <span className="font-semibold text-[#0f172a]">{step.title}</span>
                  {step.subtitle && (
                    <p className="text-sm text-slate-500 mt-1">{step.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
