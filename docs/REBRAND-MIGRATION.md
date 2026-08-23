# Proofworks — Rebrand Decisions & Migration Checklist

---

## 1. The Name

**Proofworks** — chosen because it encodes the differentiator (proof-first pilots, the POC
heritage) and the delivery promise ("works": a workshop that ships working systems). It is
not AI-branded, so it survives the hype cycle, and it gives the method, the tagline, and the
visual identity one spine:

- **Tagline:** *AI automation, proven before it's promised.*
- **Method:** the Proof-First Method (Map → Pilot → Prove → Scale)
- **Visual motif:** the checkmark / passing-test / pilot-scorecard aesthetic

**Domain:** the site is built against `https://www.proofworks.io`. DNS probing (2026-08-23)
showed `proofworks.io` and `getproofworks.com` with no DNS records (good signal, **not**
proof — verify at a registrar before buying anything). `proofworks.com/.ai/.co` resolve and
are likely taken. If the final domain differs, one command fixes the whole site:

```bash
grep -rl 'proofworks\.io' --include='*.html' --include='*.xml' --include='*.txt' . \
  | xargs sed -i 's/www\.proofworks\.io/www.YOURDOMAIN.com/g'
```

**Alternates considered** (documented so the decision can be revisited once):
- *Second Shift* — "automation that works while you sleep." Evocative, but describes the
  output, not the trust problem; secondshiftautomation.com taken.
- *Groundwork* — solid but generic; heavy trademark collision risk.
- *Castagnola & Co.* — personal brands work for solo consultants, but harder to say/spell,
  and caps the option to productize later.
- Keeping *Solutions Advisory Partners* — rejected: "Solutions" now reads as the old
  category, and the name tested as big-firm pretense against the solo-practice honesty rule.

## 2. Visual Identity

| Element | Old (SAP) | New (Proofworks) |
|---------|-----------|------------------|
| Heading font | Playfair Display (old-consultancy serif) | **Space Grotesk** (technical, modern) |
| Body font | Inter | Inter (kept) |
| Dark | `#0f172a` slate | `#0b1120` deeper ink |
| Accent | `#38bdf8` sky blue | `#34d399` emerald — the "proof/green-light" color |
| Motif | code-block | pilot scorecard / passing checks, terminal-flavored |
| Logo | "Solutions Advisory." wordmark | "proofworks" lowercase wordmark + `✓` tick block; favicon.svg included |

## 3. Repo Strategy: keep the old, start the new

Requested setup: keep `ncasj/solutionsadvisorypartners` as reference/fallback, work from a
net-new repo. The full rebrand lives on branch `claude/ai-automation-rebrand-xhvrae`;
`main` still holds the old site untouched. To spin the branch out into a new repo:

```bash
# 1. Create the new empty repo on GitHub (e.g. ncasj/proofworks) — no README/license.

# 2. Clone the old repo fresh and point the rebrand branch at the new repo:
git clone https://github.com/ncasj/solutionsadvisorypartners.git proofworks
cd proofworks
git checkout claude/ai-automation-rebrand-xhvrae
git remote set-url origin https://github.com/ncasj/proofworks.git
git branch -M main
git push -u origin main
```

This keeps full history (the old site remains reachable in the new repo's history — handy
for reference). For a clean-slate history instead, replace step 2's last three lines with
`git checkout --orphan main && git commit -m "Proofworks initial site"` before pushing.
The old repo stays exactly as it is; archive it on GitHub (Settings → Archive) once the new
site is live so it can't drift.

**Cloudflare Pages:** create a *new* Pages project connected to the new repo (project name
`proofworks`; `wrangler.jsonc` already renamed). Keep the old project alive until DNS
cutover, then add the new custom domain to the new project.

## 4. Launch Checklist (accounts & services)

- [ ] Verify + register domain (see §1); set up Cloudflare DNS
- [ ] New Cloudflare Pages project ← new repo; custom domain + www redirect
- [ ] **Old domain 301s:** keep `solutionsadvisorypartners.com` registered ≥1 yr; add a
      Cloudflare Bulk Redirect (or `_redirects` on the old project) sending everything to
      the new domain — preserves inbound links and Google equity
- [ ] **Email:** create `nico@` (or `hello@`) on the new domain (Cloudflare Email Routing →
      Gmail, as previously planned); site currently ships with the existing
      `nicojcastagnola@gmail.com` fallback address — swap when routing is live
- [ ] **EmailJS:** template `template_i5x4coi` copy references — update sender name/subject
      to Proofworks (service/template IDs kept, no code change needed)
- [ ] **Calendly:** rename event / create `calendly.com/proofworks` (site links to the
      existing URL until then — update `contact.html` when created)
- [ ] **Mixpanel:** rename project or create new one; if new, swap `MP_TOKEN` in `consent.js`
- [ ] **LinkedIn:** rename company page (or create new "Proofworks" page); update personal
      headline to "AI Automation Consultant · I build automations businesses can prove";
      pinned narrative post (see GTM.md §3.2)
- [ ] Google Search Console: add new domain, submit `sitemap.xml`, use Change of Address
      tool from the old property
- [ ] Regenerate `assets/og-default.png` if hero copy changes (script: `scripts/og.mjs`)

## 5. What Was Removed vs. Carried Forward

**Removed** (still on `main` in the old repo): the SE glossary, all 14 SE-topic insight
articles, all "fractional SE" service framing, SE maturity ladder.
**Carried forward:** the quiz engine (new questions), EmailJS + Mixpanel + consent wiring,
mobile nav, precompiled-Tailwind build approach, honest-copy rules (no fake logos/metrics,
illustrative scenarios labeled), headshot, Calendly flow.
