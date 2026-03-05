export function SectionCta({ contactAnchor = '#contact' }) {
  return (
    <section className="py-24 bg-[#0f172a] text-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-xl md:text-2xl leading-relaxed text-slate-200 mb-8">
          If your product is strong but your technical sales process isn’t scaling, it’s likely a systems problem.
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
