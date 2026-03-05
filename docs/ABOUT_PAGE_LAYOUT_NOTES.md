# About Page — Layout Structure & Notes

## Overview

The About page is built as a single-column, section-based layout. Each section is a full-width block with a constrained content area (`max-w-3xl` to `max-w-5xl`) and consistent vertical rhythm (`py-24`). The design follows a Stripe/Linear/Vercel style: large typography, generous whitespace, clear hierarchy, subtle borders.

---

## Section Hierarchy

| Section | Purpose | Layout | Max width |
|--------|--------|--------|-----------|
| **1. Hero** | Headline + what we do + full problem narrative (people vs. system design) + CTA | Centered, single column | `max-w-3xl` |
| **2. About the Founder** | Operator credibility narrative | Prose block | `max-w-3xl` |
| **3. Outcomes we deliver** | Expected results | 2-column grid of cards | `max-w-4xl` |
| **4. Our Approach** | Unified narrative on how we think about the SE function -- weaves Revenue Delivery Architecture concept and four focus areas into cohesive prose with an integrated 4-stage visual strip | Prose + inline 4-stage grid | `max-w-4xl` |
| **5. CTA** | Closing line + Schedule CTA | Centered | `max-w-2xl` |

---

## Typography

- **Headings**: Playfair Display via `font-serif`, `text-2xl`--`text-3xl` (section titles), `text-4xl`--`text-6xl` (hero).
- **Body**: Inter (sans), `text-lg` for lead/body, `text-slate-600` for readability.
- **Emphasis**: `text-[#0f172a]` (brand dark) for strong terms; accent `#38bdf8` for CTAs and list markers.

---

## Background Rhythm

Alternating section backgrounds create separation without heavy borders:

- **Hero**: Dark (`#0f172a`) with dot pattern; full problem narrative integrated.
- **Founder**: White.
- **Outcomes**: `bg-slate-50`.
- **Our Approach**: White, with an integrated dark-background stage strip mid-section.
- **CTA**: Dark (`#0f172a`).

Borders: `border-b border-slate-100` on white sections for a subtle break.

---

## Reusable Patterns

1. **Section wrapper**: `py-24` + `max-w-* mx-auto px-6`.
2. **Prose block**: `text-lg leading-relaxed` + `text-slate-600`.
3. **Primary button**: `px-8 py-4 bg-[#38bdf8] text-[#0f172a] font-bold rounded-lg hover:bg-white transition`.
4. **Card**: `bg-white p-8 rounded-xl border border-slate-200 shadow-sm`.

---

## Stage Visual (Our Approach section)

The Revenue Delivery Architecture stages are rendered as a 4-cell inline grid (2x2 on mobile, 4-across on md+) with graduated dark backgrounds:

1. Discovery (01)
2. Technical Validation (02)
3. Implementation (03)
4. Customer Success (04)

The visual sits mid-narrative between the philosophy intro and the detailed prose, acting as an anchor rather than a standalone diagram.

---

## Responsive Behavior

- **Mobile**: Single column; section titles and body scale down (`text-2xl` / `text-lg`). Stage grid becomes 2x2.
- **md (768px+)**: Hero headline up to `text-5xl`/`text-6xl`; Outcomes use 2-column grid; Stage visual goes 4-across.
- **Nav**: Same as site (e.g. fixed nav with About highlighted on this page).

---

## Integration

- **Static site**: Use `about.html` as the live About page; nav links to `about.html`, CTA links to `contact.html`.
- **React**: Import `AboutPage` and render inside your layout (with shared Nav/Footer). Components: `SectionHero`, `SectionFounder`, `SectionOutcomes`, `SectionApproach`, `SectionCta`.

---

## Tailwind / Brand Tokens

If using Tailwind config, map these for consistency:

- `brand.dark` -> `#0f172a`
- `brand.accent` -> `#38bdf8`
- `brand.light` -> `#f8fafc`

Fonts: `sans: Inter`, `serif: Playfair Display`.
