export function SectionFounder() {
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* Left column: Photo + Identity + Credentials */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            {/* Headshot with accent ring */}
            <div className="relative mb-6">
              <div
                className="rounded-2xl p-[3px]"
                style={{ background: 'conic-gradient(#38bdf8, #0ea5e9, #38bdf8)' }}
              >
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src="assets/nico-headshot.jpg"
                    alt="Nico Castagnola, Founder of Solutions Advisory Partners"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    className="w-full h-full bg-gradient-to-br from-[#0f172a] to-slate-700 items-center justify-center text-white text-5xl font-serif font-bold"
                    style={{ display: 'none' }}
                  >
                    NC
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#38bdf8] text-[#0f172a] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                10+ Years Solutions Experience
              </div>
            </div>

            {/* Name + Title */}
            <h3 className="text-2xl font-bold text-[#0f172a] font-serif mb-1">Nico Castagnola</h3>
            <p className="text-[#38bdf8] font-semibold text-sm mb-2">Founder & Principal Advisor</p>
            <p className="text-slate-500 text-sm mb-5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              New York, NY
            </p>

            {/* LinkedIn CTA */}
            <a
              href="https://www.linkedin.com/in/njc29/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white text-sm font-medium rounded-lg hover:bg-[#004182] transition mb-6 shadow-sm w-full justify-center md:w-auto"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Connect on LinkedIn
            </a>

            {/* Credentials */}
            <div className="w-full space-y-3">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="w-8 h-8 bg-[#38bdf8]/10 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0f172a]">UC San Diego</p>
                  <p className="text-xs text-slate-500">B.A. Economics & Business</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="w-8 h-8 bg-[#38bdf8]/10 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0f172a]">Harvard Business School</p>
                  <p className="text-xs text-slate-500">Credential in Leadership, Impact, Management, and Business for Experienced Leaders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Bio + Social proof stats */}
          <div className="md:col-span-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-4 font-serif">
              About Our Founder
            </h2>

            {/* Social proof stats */}
            <div className="flex flex-wrap gap-8 mb-8 pb-8 border-b border-slate-100">
              <div>
                <p className="text-3xl font-bold text-[#0f172a]">10+</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Years in B2B SaaS</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#0f172a]">F500</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">to Startup Scale</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#0f172a]">2K+</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">LinkedIn Network</p>
              </div>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              I've spent over a decade operating inside B2B SaaS companies—leading Sales Engineering, Solutions Architecture, Implementation Engineering, and Technical Account Management at high-growth organizations. I didn't observe these problems from the sidelines; I ran the teams and closed the deals.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              My experience spans high-growth startups to large, multinational Fortune 500 companies. I've worked with and sold into lean eCommerce teams and massive tech organizations that drive global economic activity—so I understand how revenue systems need to flex whether you're scaling your first enterprise deal or optimizing a complex global motion.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              I've guided complex enterprise deals from first discovery through implementation and renewal. I've sat at the intersection of sales, product, and delivery—and I've seen exactly where revenue systems break when they're not deliberately designed.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              That's why I advise founders and revenue leaders now. Not as a generic consultant, but as someone who's built and fixed these systems from the inside. If your product is strong but your technical sales and delivery process isn't scaling, I can help you redesign it.
            </p>

            <a
              href="index.html#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white font-bold rounded-lg hover:bg-slate-700 transition"
            >
              Schedule a Conversation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
