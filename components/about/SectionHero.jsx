export function SectionHero({ contactAnchor = '#contact' }) {
  return (
    <section className="min-h-0 py-24 md:py-32 flex items-center bg-[#0f172a] text-white"
      style={{
        backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="max-w-4xl mx-auto px-8 md:px-12 lg:px-16 text-center">
        <p className="text-[#38bdf8] font-medium text-sm uppercase tracking-widest mb-6">About</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 font-serif">
          Revenue Delivery Architecture for Technical SaaS
        </h1>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6">
          We help B2B SaaS companies design the systems that connect technical sales, demos, POCs, implementation, and customer success—so complex enterprise deals can scale without breaking.
        </p>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
          The problem isn’t your people. Scaling companies hit a predictable wall: discovery stays shallow, demos don’t convert, POCs drag on for months, and sales promises what delivery can’t execute. That’s not a hiring problem or a “try harder” problem—it’s a <span className="text-[#38bdf8] font-semibold">system design problem</span>. The architecture that’s supposed to connect technical sales, validation, and delivery was never built, or it was built for a smaller stage and never evolved.
        </p>
        <a
          href={contactAnchor}
          className="inline-block px-8 py-4 bg-[#38bdf8] text-[#0f172a] font-bold rounded-lg hover:bg-white transition"
        >
          Schedule a Consultation
        </a>
      </div>
    </section>
  );
}
