# Strategic Codebase Audit — Solutions Advisory Partners

**Date:** March 5, 2026
**Auditor perspective:** Staff+ Engineer / Product-minded CTO
**Repository:** `solutionsadvisorypartners`
**Deployment:** Cloudflare Workers/Pages (static assets)

---

## Files and Directories That Informed This Audit

| File / Directory | Why It Mattered |
|---|---|
| `index.html` | Primary landing page; sole location of the contact form, EmailJS integration, and Mixpanel form-event tracking. The single conversion endpoint for the entire site. |
| `about.html` | Longest content page. Reveals the founder positioning strategy (or lack thereof — no name, no photo). Houses the "Revenue Delivery Architecture" concept, the closest thing to a proprietary framework. |
| `services.html` | All four service cards display `$TBD` pricing. No differentiation framing, no ROI argument, no social proof. This page is where qualified buyers would decide to reach out — and it currently under-delivers. |
| `insights.html` | Seven article cards, every one linking to `#`. The "Browse by topic" filter links point to non-existent anchors. The entire page is scaffolding with zero real content, meaning zero SEO value. |
| `thank-you.html` | Post-form-submission page. Functional but disconnected — the contact form on `index.html` never redirects here. |
| `wrangler.jsonc` | Cloudflare Pages deployment config. Still contains the placeholder project name `"your-project-name"`. |
| `components/` (9 JSX files) | React components for the About page that are never compiled or used. No `package.json`, no build pipeline. Dead code. |
| `components/ABOUT_PAGE_LAYOUT_NOTES.md` | Design documentation for the About page layout. Useful reference, but describes a React integration path that was never implemented. |
| `.git/` history (11 commits) | Reveals iteration pattern: 4 consecutive commits fixing form submission, followed by EmailJS and Mixpanel additions. No branching, no CI. |

---

## 1. Executive Summary

### What This System Is

- Solutions Advisory Partners is a fractional consulting firm that helps B2B SaaS companies design technical sales, demo, POC, and implementation systems — branded as "Revenue Delivery Architecture."
- The website is the firm's only digital storefront: a 5-page static HTML site deployed on Cloudflare Pages.
- There is no backend, no database, no CMS, no build pipeline, and no server-side logic.
- The tech stack is intentionally minimal: hand-written HTML, Tailwind CSS via CDN, Google Fonts, and inline JavaScript.
- Visitor analytics are handled by Google Analytics (GA4) and Mixpanel (with 100% session recording and heatmaps enabled).
- The sole conversion mechanism is a contact form on the home page, submitted client-side via EmailJS.
- Nine React/JSX component files exist in a `components/` directory but are completely unused — no bundler or React runtime is present.
- Content on the Insights page is entirely placeholder — all seven article cards link to `#`.
- All service pricing displays `$TBD`.
- The site has no mobile navigation — the nav menu is hidden on screens below 768px with no hamburger alternative.

### 3 Largest Business Risks

1. **The site cannot convert mobile visitors.** The navigation is `hidden md:flex` with no mobile menu. Any visitor on a phone — likely 50%+ of traffic for a LinkedIn-driven consultancy — cannot navigate to About, Services, or Insights. They can only see the home page and scroll to the contact form. This is a silent lead killer.

2. **Zero social proof and an anonymous founder.** The About page contains a detailed multi-paragraph founder bio but never states the founder's name, shows a photo, or links to a personal LinkedIn profile. There are no testimonials, client logos, case studies, or quantified outcomes anywhere on the site. For a high-trust, high-ticket B2B consulting engagement, this is the single biggest conversion blocker. Prospects need to trust a named individual before scheduling a call.

3. **The Insights page is a credibility liability.** Seven article titles are displayed with professional UI treatment, but every link goes to `#`. A visitor who clicks "Read article" and nothing happens will question the legitimacy of the firm. This page either needs real content or should be removed until content is ready.

### 3 Largest Strategic Opportunities

1. **Publish 3-5 real Insights articles to unlock organic inbound.** The article titles already exist and are well-chosen for the ICP. Writing and publishing these would immediately create SEO surface area for terms like "SaaS POC strategy," "technical sales systems," and "demo conversion" — exactly what the firm's buyers search for.

2. **Add founder identity and social proof to dramatically increase conversion.** Naming the founder, adding a professional photo, linking to their LinkedIn, and including 2-3 client testimonials or outcome metrics would transform the About and Services pages from informational to persuasive.

3. **Adopt a lightweight static site generator (Eleventy/11ty) to eliminate duplication and enable content velocity.** The current architecture requires editing 5 files for any shared element change (nav, footer, analytics, brand tokens). A zero-config SSG like Eleventy would enable layouts, partials, and markdown-based blog posts — dramatically reducing friction for publishing new content.

### Architectural Maturity Assessment

**Stage: Prototype / MVP.**

The site is functional and visually polished, but architecturally it is a collection of independent HTML files with no shared infrastructure, no build process, no testing, no CI/CD, and no content management capability. This is appropriate for a "get something live fast" phase but will become increasingly painful as content needs grow. The gap between the visual quality of the site and the engineering maturity of the codebase is significant.

---

## 2. Architecture Map

### System Architecture

```
                         ┌──────────────────────────────┐
                         │        Cloudflare Pages       │
                         │   (CDN / Static Asset Host)   │
                         │                                │
                         │  ┌──────────┐ ┌────────────┐  │
                         │  │index.html│ │ about.html │  │
                         │  └──────────┘ └────────────┘  │
                         │  ┌──────────────┐ ┌─────────┐ │
                         │  │services.html │ │insights │ │
                         │  └──────────────┘ │  .html  │ │
                         │  ┌──────────────┐ └─────────┘ │
                         │  │thank-you.html│              │
                         │  └──────────────┘              │
                         └──────────┬───────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
              ┌─────▼─────┐  ┌─────▼─────┐  ┌──────▼──────┐
              │  Tailwind  │  │  Google   │  │   Google    │
              │  CSS CDN   │  │  Fonts    │  │ Analytics   │
              │            │  │  CDN      │  │   (GA4)     │
              └────────────┘  └───────────┘  └─────────────┘
                    │
              ┌─────▼─────┐  ┌───────────┐  ┌─────────────┐
              │  Mixpanel  │  │  EmailJS  │  │  LinkedIn   │
              │ (sessions, │  │ (contact  │  │  (company   │
              │  heatmaps) │  │  form)    │  │   page)     │
              └────────────┘  └───────────┘  └─────────────┘
```

### Visitor Conversion Funnel

```
  LinkedIn / Organic / Direct
            │
            ▼
    ┌───────────────┐
    │   Any Page     │
    │ (index, about, │
    │  services,     │
    │  insights)     │
    └───────┬───────┘
            │  CTA click
            ▼
    ┌───────────────┐
    │  index.html   │
    │  #contact     │
    │  (EmailJS     │
    │   form)       │
    └───────┬───────┘
            │  submit
            ▼
    ┌───────────────┐     ┌───────────────┐
    │  EmailJS API  │────▶│  Email inbox   │
    └───────────────┘     └───────────────┘
            │
            ▼
    ┌───────────────┐
    │  Mixpanel     │
    │  (identify +  │
    │   track)      │
    └───────────────┘
```

**Note:** The thank-you.html page exists but is never reached — the form handler shows inline success text instead of redirecting.

### Key Coupling Points and Dependency Risks

| Coupling Point | Risk |
|---|---|
| **Tailwind CSS CDN** (`cdn.tailwindcss.com`) | If the CDN is down or Tailwind deprecates the play CDN (which is not recommended for production per Tailwind's own docs), every page breaks visually. The play CDN also ships the entire Tailwind framework (~300KB) instead of only the classes used. |
| **Mixpanel snippet** (copy-pasted across 5 files) | A Mixpanel SDK update or config change requires editing 5 files identically. Drift between files could cause inconsistent tracking. |
| **GA4 snippet** (copy-pasted across 5 files) | Same duplication risk as Mixpanel. |
| **EmailJS** (single integration point in `index.html`) | Contact form delivery depends entirely on a third-party service with no fallback. If EmailJS is down, form submissions silently fail after showing "Something went wrong." The `mailto:` link is buried in small text. |
| **Google Fonts CDN** | Render-blocking font loads. If Google Fonts is slow, text rendering is delayed on every page. |

### Where Complexity Is Concentrated

Complexity is concentrated in `index.html`, which is the only file with behavioral JavaScript (form handling, EmailJS integration, Mixpanel user identification). All other pages are purely presentational. The `components/` directory adds conceptual complexity without providing value — it represents an abandoned or aspirational React migration path.

---

## 3. Product Delivery & Engineering Velocity

### Current State

Every change to a shared element — navigation, footer, analytics configuration, brand colors, font imports, Tailwind config — requires manually editing 5 HTML files and verifying consistency. The git history confirms this friction: four consecutive commits were needed to fix the contact form (`Fixing form submission`, `Fixing form submission 2`, `Fixing form submission 3`, `Fixing form submission 4th times the charm`).

### Duplication Inventory

| Duplicated Block | Lines per File | Files | Total Duplicated Lines |
|---|---|---|---|
| `<head>` analytics + Tailwind config + fonts | ~60 | 5 | ~300 |
| Navigation bar | ~14 | 5 | ~70 |
| Footer | ~10 | 5 | ~50 |
| Mixpanel init snippet | ~12 | 5 | ~60 |
| GA4 init snippet | ~6 | 5 | ~30 |
| **Total** | | | **~510 duplicated lines** |

On a codebase of ~960 total lines of HTML, roughly **53% is duplicated boilerplate**.

### Content Publishing Friction

Publishing a new Insights article currently requires:

1. Creating a new HTML file from scratch (or copying an existing page)
2. Manually adding the full `<head>` block (~60 lines)
3. Manually adding the nav and footer
4. Manually updating the insights.html grid to link to the new file
5. Deploying via `wrangler deploy`

There is no markdown support, no templating, no content pipeline. This means every article is a full HTML engineering task rather than a content task.

### Recommendations

| Recommendation | Impact | Effort | Details |
|---|---|---|---|
| **Adopt Eleventy (11ty) as a static site generator** | High — eliminates all duplication, enables markdown blog posts, enables shared layouts/partials | M (1-2 days) | Zero-config SSG that works with existing HTML. Move shared blocks into `_includes/` layouts. Convert insights articles to markdown files. Tailwind can be integrated via PostCSS at build time, replacing the CDN. |
| **Delete the `components/` directory** | Low-medium — removes confusion, reduces cognitive load | S (15 minutes) | These JSX files are dead code. The design notes in `ABOUT_PAGE_LAYOUT_NOTES.md` can be moved to `docs/` if worth preserving. |
| **Add a `.gitignore`** | Low — standard hygiene | S (5 minutes) | Should exclude `node_modules/`, `.wrangler/`, `dist/`, and OS files. |
| **Add a `README.md`** | Medium — reduces onboarding friction for any collaborator | S (30 minutes) | Should document: what the site is, how to run it locally, how to deploy, where to edit content. |

---

## 4. Reliability & Operability

### Current Reliability Profile

The site is a static asset bundle served by Cloudflare's CDN. This is inherently reliable — Cloudflare provides global edge caching, automatic HTTPS, and DDoS protection. For a static site, this is an excellent deployment choice. The primary reliability risks are in the third-party integrations, not the hosting.

### Identified Failure Modes

| Failure Mode | Likelihood | Impact | Current Mitigation |
|---|---|---|---|
| **EmailJS service outage** | Low-medium | High — all lead capture fails | A generic `alert()` message. The `mailto:` fallback is in small gray text that most users will not see. |
| **Tailwind CDN outage** | Low | Critical — all pages render as unstyled HTML | None. |
| **Mixpanel SDK fails to load** | Low | Low — analytics lost, site still functional | The form handler checks `typeof mixpanel !== 'undefined'` before calling Mixpanel — this is good defensive coding. |
| **Google Fonts CDN slow/down** | Low | Medium — text renders in fallback system font with a flash | `font-display: swap` is not explicitly set (Google Fonts defaults to swap). |
| **Visitor submits form but EmailJS silently drops it** | Unknown | High — lead is lost with no record | No server-side logging or backup. The only record is Mixpanel's `"Form Submitted"` event, which tracks intent but not delivery. |

### Error Handling Assessment

- **Contact form success:** Button text changes to "Message Sent!" with a green background. The form resets. The `thank-you.html` page is never used.
- **Contact form failure:** A browser `alert()` with "Something went wrong. Please try emailing directly." — functional but unprofessional for a premium consulting brand.
- **No structured error logging:** `console.log('FAILED...', error)` is the only error capture. No error reporting service (Sentry, LogRocket, etc.).

### 5 Concrete Improvements

1. **Redirect to `thank-you.html` on successful form submission** instead of inline button text change. This enables a proper conversion tracking event in GA4 (destination goal), gives the visitor a clear confirmation, and makes the existing `thank-you.html` page useful. *Effort: S (30 minutes).*

2. **Add a fallback email link that is visually prominent** on the contact form — not buried in 12px gray text. If EmailJS fails, the visitor should immediately see a large, clickable email address. *Effort: S (15 minutes).*

3. **Replace `alert()` error handling with an inline error message** styled consistently with the site's design system. Browser alerts are jarring and undermine the premium brand positioning. *Effort: S (30 minutes).*

4. **Add Cloudflare Pages `_headers` file** to set security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) and cache-control for static assets. Cloudflare Pages supports a `_headers` file for custom response headers. *Effort: S (1 hour).*

5. **Instrument a simple uptime check on the form submission flow** via a free service (e.g., UptimeRobot or Cloudflare's built-in health checks) that periodically verifies the site loads and key third-party scripts are accessible. *Effort: S (30 minutes).*

---

## 5. Security & Data Risk

### Current Security Posture

| Area | Status | Notes |
|---|---|---|
| **HTTPS** | Enforced by Cloudflare | No action needed. |
| **Secrets in source code** | Client-side keys only | EmailJS public key (`mA84J6L0WEIHGyjde`), service ID (`service_mro1akd`), template ID (`template_i5x4coi`), Mixpanel token (`11313cd5aafb3ac2150a3be3c3846f37`), GA4 ID (`G-YKTHF2B8VJ`). These are designed to be public, but should be documented so the team knows what is exposed. |
| **Input validation** | Minimal | HTML `required` attributes on form fields. `type="email"` provides browser-level email format validation. No server-side validation (there is no server). No sanitization of user input — EmailJS handles this on their end. |
| **Content Security Policy** | Missing | No CSP headers. The site loads scripts from 5 different origins (cdn.tailwindcss.com, googleapis.com, googletagmanager.com, cdn.mxpnl.com, cdn.jsdelivr.net). A CSP should whitelist these explicitly. |
| **Cookie consent** | Missing | Mixpanel is configured with `record_sessions_percent: 100` and `record_heatmap_data: true`, meaning every visitor's session is recorded — mouse movements, clicks, scrolls. Under GDPR (if any EU visitors exist) and increasingly under US state privacy laws, this requires explicit consent. |
| **Dependency security** | No lockfile | All dependencies are loaded via CDN with no version pinning beyond EmailJS (`@3`). Tailwind CDN, Mixpanel SDK, and GA4 load "latest" — a supply chain compromise would immediately affect the site. |
| **`.gitignore`** | Missing | If the repo were public, all files including any local dev artifacts would be exposed. |
| **Auth boundaries** | N/A | No authenticated areas. No admin panel. No user accounts. |

### GDPR / Privacy Risk: Mixpanel Session Recording

This is the most significant compliance risk. The current Mixpanel configuration:

```javascript
mixpanel.init("11313cd5aafb3ac2150a3be3c3846f37", {
    autocapture: true,
    track_pageview: true,
    record_sessions_percent: 100,
    record_heatmap_data: true,
});
```

This records 100% of visitor sessions with full behavioral data. The contact form collects name and work email, which Mixpanel then links to the session recording via `mixpanel.identify(emailVal)`. This means Mixpanel stores:

- Full session recordings tied to a named individual
- Email addresses as PII in the `$email` profile property
- Message content snippets (first 50 characters) in event properties

Under GDPR, this requires: (a) a cookie consent banner with opt-in for analytics, (b) a privacy policy page explaining what data is collected, and (c) a mechanism to honor data deletion requests. None of these exist.

### SOC2 Readiness Assessment

Not applicable in the traditional sense — there is no backend, no customer data storage, and no multi-tenant system. However, if the firm's clients ever ask "what is your security posture?" (common in enterprise B2B SaaS sales), having a documented privacy policy, CSP headers, and GDPR-compliant analytics would demonstrate professionalism.

### Top 5 Security Improvements (Ranked by Risk)

1. **Add a cookie consent banner and privacy policy page.** Mixpanel session recording without consent is a regulatory liability that grows with traffic. *Risk: Legal/compliance. Effort: M (1-2 days).*

2. **Add a `_headers` file with Content Security Policy.** Restrict script sources to the known CDN origins. This prevents XSS via injected scripts. *Risk: Security. Effort: S (1 hour).*

3. **Pin CDN dependency versions.** Replace `cdn.tailwindcss.com` (unversioned, development-only CDN) with a build-time Tailwind installation. Pin Mixpanel and EmailJS to specific versions. *Risk: Supply chain. Effort: M (half day with SSG migration).*

4. **Add a `.gitignore` file.** Prevent accidental commit of local artifacts, credentials, or build output. *Risk: Low but foundational. Effort: S (5 minutes).*

5. **Reduce Mixpanel session recording from 100% to a lower percentage** (e.g., 10-25%) until a consent mechanism is in place. This reduces the scope of data collection while still providing usable behavioral insights. *Risk: Privacy. Effort: S (1 minute — change one number).*

---

## 6. Scalability & Cost-to-Serve

### Current Scaling Characteristics

| Dimension | Assessment |
|---|---|
| **Hosting scalability** | Excellent. Cloudflare Pages serves static files from a global CDN. It can handle virtually unlimited traffic at no additional cost on the free tier (unlimited bandwidth, unlimited requests). |
| **Cost-to-serve** | Near zero. Cloudflare Pages free tier, EmailJS free tier (200 emails/month), Mixpanel free tier (20M events/month), GA4 free. Total hosting cost: $0/month. |
| **Performance** | Suboptimal despite being static. The Tailwind play CDN ships ~300KB of uncompressed CSS (the entire Tailwind framework). A build-time purge would reduce this to ~10-15KB. Google Fonts add 2+ render-blocking requests. |

### Performance Bottlenecks

| Issue | Impact | Fix | ROI |
|---|---|---|---|
| **Tailwind play CDN (~300KB CSS)** | Slow first paint, especially on mobile. Google explicitly warns against using the play CDN in production. | Build-time Tailwind with PurgeCSS. Output: ~10-15KB. | **High ROI.** 95% CSS reduction. Implemented automatically with SSG migration. |
| **Render-blocking Google Fonts (2 requests)** | Delays text rendering by 100-300ms. | Self-host fonts or use `font-display: swap` with `preconnect`. | **High ROI.** Minimal effort, measurable LCP improvement. |
| **5 separate CDN script loads per page** | GA4 + Mixpanel + Tailwind + EmailJS + Google Fonts = 5 blocking/async external requests on every page load. | SSG build step can inline critical CSS and defer non-critical scripts. | **Medium ROI.** Requires build pipeline. |
| **No image optimization pipeline** | Currently no images on the site, but adding founder photo, client logos, or social images will require optimization. | Use modern formats (WebP/AVIF), lazy loading, and responsive `srcset`. | **Future-proofing.** Zero cost now, prevents problems later. |

### Scalability Risks That Matter for This Business

The website itself will never have a scaling problem — Cloudflare CDN handles that. The real scaling constraints are:

1. **Content scaling:** Adding each new page or article is a manual HTML engineering task. If the firm wants to publish weekly insights (which it should for SEO), the current architecture will not support that pace.

2. **EmailJS limits:** The free tier allows 200 emails/month. If lead generation succeeds and form submissions exceed this, leads will be silently dropped. The paid tier ($15/month for 1,000 emails) is the easy fix.

3. **Mixpanel limits:** 100% session recording at scale will hit Mixpanel's free-tier event limits. At ~20M events/month free, this is unlikely to be a near-term issue, but recording percentage should be reduced regardless for privacy reasons.

---

## 7. Code Health

### Project Structure

```
solutionsadvisorypartners/
├── index.html              ← Home + contact form
├── about.html              ← About + founder + concept
├── services.html           ← Services and (TBD) pricing
├── insights.html           ← Placeholder blog index
├── thank-you.html          ← Unused post-form page
├── wrangler.jsonc           ← Deployment config (placeholder name)
├── components/              ← DEAD CODE (unused React components)
│   ├── AboutPage.jsx
│   ├── ABOUT_PAGE_LAYOUT_NOTES.md
│   └── about/
│       ├── SectionAudience.jsx
│       ├── SectionConcept.jsx
│       ├── SectionCta.jsx
│       ├── SectionFocus.jsx
│       ├── SectionFounder.jsx
│       ├── SectionHero.jsx
│       ├── SectionOutcomes.jsx
│       └── SectionProblem.jsx   ← Orphan (not imported by AboutPage)
└── docs/                    ← This audit
```

### Assessment

| Dimension | Rating | Notes |
|---|---|---|
| **Naming consistency** | Good | HTML files are lowercase, descriptive. JSX components use PascalCase. Brand tokens are consistent (`brand.dark`, `brand.accent`, `brand.light`). |
| **Duplication** | Critical | 53% of total HTML is duplicated boilerplate. Every shared element is copy-pasted across 5 files. |
| **Module boundaries** | N/A | No modules — flat HTML files with inline everything. |
| **Dependency hygiene** | Poor | No `package.json`, no lockfile, no version pinning. All dependencies loaded via CDN at whatever version is current. |
| **Dead code** | Significant | 9 JSX files (~300 lines) that serve no purpose. `SectionProblem.jsx` is orphaned even within the dead JSX tree. `thank-you.html` exists but is never linked to. |
| **Inline JavaScript** | Moderate concern | Form handling, analytics init, and Tailwind config are all inline `<script>` blocks. Acceptable for a small static site but makes testing and linting impossible. |

### Testing Strategy Assessment

| Test Type | Coverage | Notes |
|---|---|---|
| **Unit tests** | 0% | No test files, no test framework, no `package.json` to install one. |
| **Integration tests** | 0% | No test infrastructure. |
| **End-to-end tests** | 0% | No Playwright, Cypress, or similar. |
| **Visual regression tests** | 0% | No tooling. |
| **Accessibility tests** | 0% | No automated a11y checks. Manual review shows: no skip-to-content link, no ARIA landmarks on nav, no `alt` text infrastructure (but no images currently). |
| **Lighthouse / performance tests** | 0% | No CI/CD to run them. |

**What should be tested first:** If a test framework is introduced (recommend Playwright for this type of site), the first tests should be:

1. Contact form submission works (end-to-end with EmailJS mock)
2. All navigation links resolve (no broken links)
3. All pages pass Lighthouse performance threshold (>90)
4. All pages pass Lighthouse accessibility threshold (>90)
5. Mobile viewport renders critical content (currently fails — no mobile nav)

### Tech Debt Items and Interest Rates

| Debt Item | Interest Rate | Explanation |
|---|---|---|
| **Duplicated `<head>` / nav / footer across 5 files** | High | Every new page or analytics change multiplies the cost. Adding the 6th page means 6 files to synchronize. Adding the 20th means 20. This debt compounds linearly with site growth. |
| **Tailwind play CDN in production** | Medium | Performance penalty is constant (~300KB per page load), but the CDN could also be deprecated by Tailwind at any time, which would be a site-breaking event. |
| **Unused `components/` directory** | Low | Static cost — it doesn't get worse over time, it just adds confusion for anyone new to the repo. |
| **No `.gitignore`** | Low | Static cost until the moment something sensitive is accidentally committed, at which point the cost becomes high and irreversible. |
| **Missing cookie consent with 100% session recording** | High | Legal exposure increases linearly with traffic. If the site is shared on LinkedIn (likely, given the business model) and reaches EU visitors, this is a GDPR violation on every visit. |
| **`$TBD` pricing on services page** | Medium-High | Every visitor who reaches this page and sees placeholder pricing loses confidence. The interest rate is proportional to traffic growth — more traffic means more lost conversions. |

---

## 8. Prioritized Engineering Roadmap

### 30-Day Plan: Foundation and Quick Wins

| # | Initiative | Type | Impact | Effort | Risk | Engineer |
|---|---|---|---|---|---|---|
| 1 | **Add mobile navigation (hamburger menu)** | Quick Win | Critical — unlocks 50%+ of potential visitors | S (2-3 hours) | Low | Frontend |
| 2 | **Name the founder, add photo, link personal LinkedIn** | Quick Win | High — trust and conversion | S (30 minutes content + 1 hour HTML) | Low | Content + Frontend |
| 3 | **Add meta descriptions to all pages** | Quick Win | Medium — SEO baseline | S (30 minutes) | Low | Content |
| 4 | **Add Open Graph tags and a social sharing image** | Quick Win | Medium — LinkedIn shares look professional | S (1-2 hours) | Low | Frontend |
| 5 | **Add a `.gitignore`** | Quick Win | Low — hygiene | S (5 minutes) | None | Any |
| 6 | **Reduce Mixpanel session recording to 10%** | Quick Win | Medium — privacy risk reduction | S (1 minute) | None | Any |
| 7 | **Replace `alert()` error on form with inline message** | Quick Win | Low-medium — brand polish | S (30 minutes) | Low | Frontend |
| 8 | **Add `_headers` file with security headers** | Quick Win | Medium — security posture | S (1 hour) | Low | Frontend |
| 9 | **Fix wrangler.jsonc project name** | Quick Win | Low — operational hygiene | S (1 minute) | None | Any |
| 10 | **Redirect form submission to thank-you.html** | Quick Win | Low-medium — conversion tracking | S (30 minutes) | Low | Frontend |

### 60-Day Plan: Content and Conversion

| # | Initiative | Type | Impact | Effort | Risk | Engineer |
|---|---|---|---|---|---|---|
| 11 | **Publish 3 real Insights articles** | Week Win | High — SEO, credibility, inbound leads | M (3-5 days content writing) | Low | Content / Founder |
| 12 | **Add social proof section to home page** (testimonials or outcome metrics) | Week Win | High — conversion rate | S-M (1-2 days depending on content availability) | Low | Content + Frontend |
| 13 | **Replace `$TBD` with real pricing or "Starting at" ranges** | Week Win | High — lead qualification and conversion | S (1 hour if pricing is decided) | Medium (pricing strategy risk) | Business decision |
| 14 | **Expand "Who this is for" section** with ICP definition | Week Win | Medium — lead qualification | S (2-3 hours) | Low | Content |
| 15 | **Add a cookie consent banner and privacy policy page** | Week Win | High — compliance | M (1-2 days) | Low | Frontend |
| 16 | **Add a secondary conversion path** (LinkedIn follow CTA on every page, or email newsletter signup) | Week Win | Medium — captures visitors not ready to schedule a call | S-M (half day) | Low | Frontend |
| 17 | **Add `sitemap.xml` and `robots.txt`** | Quick Win | Low-medium — SEO infrastructure | S (30 minutes) | None | Frontend |
| 18 | **Add a `README.md`** | Quick Win | Medium — onboarding and documentation | S (1 hour) | None | Any |

### 90-Day Plan: Strategic Architecture Investment

| # | Initiative | Type | Impact | Effort | Risk | Engineer |
|---|---|---|---|---|---|---|
| 19 | **Migrate to Eleventy (11ty) static site generator** | Strategic Investment | Very High — eliminates duplication, enables content velocity, enables build-time Tailwind | M-L (2-3 days for migration, including Tailwind build integration) | Medium (migration risk, but rollback is easy since the output is still static HTML) | Frontend |
| 20 | **Build a markdown-based blog pipeline** (as part of SSG) | Strategic Investment | High — enables non-technical content publishing | Included in #19 | Low (once SSG is in place) | Frontend |
| 21 | **Add Playwright E2E tests for critical paths** | Strategic Investment | Medium — prevents regressions, especially on form and navigation | M (2-3 days) | Low | Frontend |
| 22 | **Set up GitHub Actions CI/CD** (lint, test, build, deploy to Cloudflare Pages) | Strategic Investment | High — automated quality gates, one-command deploy | M (1-2 days) | Low | DevOps / Frontend |
| 23 | **Delete `components/` directory and archive design notes to `docs/`** | Quick Win | Low — code hygiene | S (15 minutes) | None | Any |
| 24 | **Self-host fonts and eliminate Google Fonts CDN dependency** | Week Win | Low-medium — performance, privacy | S (1-2 hours) | Low | Frontend |
| 25 | **Add Lighthouse CI performance budgets** in GitHub Actions | Strategic Investment | Medium — automated performance monitoring | S-M (half day, included in #22) | Low | Frontend |

### Summary by Category

**Quick Wins (each ≤ 1 day):**
Items 1-10, 17, 18, 23. Total: ~1-2 days of work. These can all be shipped in the first week.

**Week Wins (each ≤ 1 week):**
Items 11-16, 24. Total: ~2-3 weeks of work. These are primarily content-dependent.

**Strategic Investments (2-6 weeks):**
Items 19-22, 25. Total: ~2-3 weeks of engineering work. The SSG migration (#19-20) is the highest-leverage single investment.

---

## 9. North Star Engineering Metrics

### Proposed Metrics

| # | Metric | Why It Matters | How to Instrument |
|---|---|---|---|
| 1 | **Form conversion rate** (form submissions / unique visitors) | The single most important business metric for this site. Measures whether the site is generating leads. | GA4 destination goal on `thank-you.html` (requires implementing the redirect in item #10). Alternatively, Mixpanel's existing "Form Submitted" event divided by unique visitors. |
| 2 | **Lighthouse Performance score** (target: >90) | Measures page load speed, which directly impacts bounce rate and SEO ranking. Currently likely ~60-70 due to Tailwind CDN bloat. | Run `npx lighthouse <url> --output=json` in CI. After GitHub Actions setup (#22), run on every deploy. Free via Lighthouse CI. |
| 3 | **Lighthouse Accessibility score** (target: >90) | Measures compliance with WCAG guidelines. Currently expected to fail on mobile nav, missing landmarks. | Same as above. Included in Lighthouse CI. |
| 4 | **Pages indexed by Google** | Measures SEO surface area. Currently 5 pages. Target: 10+ after publishing real Insights articles. | Google Search Console (free). Check "Coverage" report monthly. |
| 5 | **Organic search impressions** | Leading indicator of inbound lead potential. Currently likely near-zero without real content. | Google Search Console "Performance" report. Track weekly after publishing articles. |
| 6 | **Mobile vs. desktop engagement** (bounce rate, pages/session) | Until mobile nav is fixed, mobile visitors are essentially bouncing after the home page. This metric will validate the fix. | GA4 audience report, segmented by device category. Already instrumented via existing GA4 setup. |
| 7 | **Deployment frequency** | Measures engineering velocity and ability to ship. Currently: manual `wrangler deploy`, no CI. Target: automated deploy on every push to `main`. | After GitHub Actions setup (#22), count deployments per week via GitHub API or Cloudflare Pages dashboard. |
| 8 | **Page-to-contact rate by source page** | Identifies which pages are most effective at driving conversions. Currently, all CTAs go to `index.html#contact`, so GA4 can track which referrer page preceded the form view. | GA4 event tracking with `page_referrer` parameter on the contact section view event. Can be enhanced with Mixpanel's existing funnel analysis. |

### Realistic Instrumentation Path

- **Metrics 1, 6, 8:** Already partially instrumented via GA4 and Mixpanel. Require minor configuration (GA4 destination goal, audience segments).
- **Metrics 2, 3:** Require a CI/CD pipeline (GitHub Actions). Zero-cost with Lighthouse CI GitHub Action.
- **Metrics 4, 5:** Require Google Search Console verification (add a DNS TXT record or HTML meta tag via Cloudflare). Free, ~15 minutes to set up.
- **Metric 7:** Requires GitHub Actions deployment pipeline. Metric is a natural byproduct of CI/CD setup.

### Baseline Targets (First 90 Days)

| Metric | Current (Estimated) | 30-Day Target | 90-Day Target |
|---|---|---|---|
| Lighthouse Performance | ~60-70 | >80 (add font optimization, preconnect) | >90 (SSG + purged Tailwind) |
| Lighthouse Accessibility | ~70-80 | >85 (add mobile nav, landmarks) | >95 |
| Pages indexed | 5 | 5 | 8-10 |
| Organic impressions/week | ~0 | ~0 (takes time to index) | 50-200 |
| Deployment frequency | Manual, ad hoc | Weekly | On every push to main |
| Form conversion rate | Unknown | Establish baseline | Improve by 25% via social proof + mobile nav |

---

*End of audit. This document should be reviewed quarterly and updated as the roadmap items are completed.*
