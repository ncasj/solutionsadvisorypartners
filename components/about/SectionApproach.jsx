const STAGES = [
  { num: '01', title: 'Discovery', opacity: '' },
  { num: '02', title: 'Technical Validation', opacity: '/90' },
  { num: '03', title: 'Implementation', opacity: '/80' },
  { num: '04', title: 'Customer Success', opacity: '/70' },
];

export function SectionApproach() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-[#38bdf8] font-medium text-sm uppercase tracking-widest mb-6">
          Our Approach
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-10 leading-tight font-serif">
          We Think of Sales Engineering as Revenue Architecture&mdash;Not Deal Support.
        </h2>

        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
          <p>
            Most companies treat the SE function as tactical support. An SE gets
            assigned to a deal, runs the demo, answers technical questions, and
            moves on to the next one. When things get busy, leadership hires more
            SEs. When deals stall, they assume the team needs better training.
          </p>
          <p>
            We see it differently. The SE function isn&rsquo;t a support
            layer&mdash;it&rsquo;s the connective tissue of the entire revenue
            lifecycle. Every enterprise deal flows through a series of critical
            stages. When those stages are connected by deliberate architecture,
            deals accelerate and customers succeed. When they&rsquo;re not, you
            get the same symptoms over and over: shallow discovery, demos that
            don&rsquo;t convert, POCs that drag on for months, and
            implementations that fail before they start.
          </p>
          <p>
            These aren&rsquo;t isolated problems. They&rsquo;re symptoms of a
            system that was never deliberately designed. We call that system{' '}
            <strong className="text-[#0f172a]">
              Revenue Delivery Architecture
            </strong>
            .
          </p>
        </div>

        <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 rounded-xl overflow-hidden shadow-sm">
          {STAGES.map((s) => (
            <div
              key={s.num}
              className={`bg-[#0f172a]${s.opacity} text-white p-5 text-center flex flex-col justify-center`}
            >
              <p className="text-[#38bdf8] text-xs font-bold uppercase tracking-wider mb-1.5">
                {s.num}
              </p>
              <p className="font-semibold text-sm md:text-base">{s.title}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
          <p>
            It starts with discovery&mdash;and not the checklist kind. Real
            discovery diagnoses the buyer&rsquo;s underlying problem, maps their
            technical environment, surfaces their decision criteria, and flags
            implementation risks before anyone opens a demo environment. When
            discovery is strong, everything downstream becomes sharper. When
            it&rsquo;s weak, the rest of the sales motion is guesswork.
          </p>
          <p>
            From there, technical validation&mdash;demos and POCs&mdash;should
            function as structured proof, not open-ended exploration. We believe
            every demo should be built around the buyer&rsquo;s problem, their
            workflow, and their outcome&mdash;not a product tour. And every POC
            should have explicit success criteria, a defined scope, and a hard
            timeline. When these elements are missing, evaluations expand
            indefinitely and deals die slowly.
          </p>
          <p>
            Then comes the stage most companies get wrong: the bridge from sales
            to delivery. What gets promised during the deal rarely transfers
            cleanly to the team responsible for making it real. Integrations,
            constraints, success criteria&mdash;they live in someone&rsquo;s
            head or a scattered set of notes. We design structured handoff
            systems so that what&rsquo;s sold is what gets delivered, and
            implementation doesn&rsquo;t start from scratch.
          </p>
          <p>
            None of this happens by accident. It requires deliberate
            architecture and experienced leadership. That&rsquo;s what we
            provide&mdash;whether as fractional SE leadership helping you build
            these systems from the ground up, or as advisors working alongside
            your existing team to redesign the revenue motion that isn&rsquo;t
            scaling.
          </p>
          <p className="text-[#0f172a] font-semibold text-xl leading-snug">
            Revenue Delivery Architecture isn&rsquo;t a framework you hang on
            the wall. It&rsquo;s the operating system your technical sales
            motion runs on.
          </p>
        </div>
      </div>
    </section>
  );
}
