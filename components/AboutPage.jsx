/**
 * About Page — Revenue Delivery Architecture
 * Production-ready React component for the consultancy About page.
 * Use with Tailwind CSS (same config as site: brand colors, Inter + Playfair Display).
 */

import { SectionHero } from './about/SectionHero';
import { SectionFounder } from './about/SectionFounder';
import { SectionOutcomes } from './about/SectionOutcomes';
import { SectionApproach } from './about/SectionApproach';
import { SectionCta } from './about/SectionCta';

export function AboutPage() {
  return (
    <main className="bg-[#f8fafc] text-slate-800 antialiased">
      <SectionHero />
      <SectionFounder />
      <SectionOutcomes />
      <SectionApproach />
      <SectionCta />
    </main>
  );
}
