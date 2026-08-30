# AI Mastery

AI Mastery is Mason Nguyen's technical knowledge and systems architecture platform for artificial intelligence, knowledge systems, agentic computing, production infrastructure, and digital trust.

## Local preview

No build step or package installation is required.

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Deployment

The site is a zero-dependency static document and can be served from GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any static web server. Canonical discovery files currently target `https://virtualmase.github.io/ai-mastery/`; update them together if a custom domain is connected.

## Discovery surface

- Semantic HTML and responsive CSS
- JSON-LD for Mason Nguyen, AI Mastery, and the website
- LearningResource JSON-LD for the operator and GEO learning pages
- Open Graph and Twitter card metadata
- `robots.txt`, `sitemap.xml`, and `llms.txt`
- Reduced-motion support and keyboard-accessible navigation

## Learning paths

- Operator foundations: mandate, identity and signing, payment policy, settlement versus fulfillment, and exception handling
- ARM foundations: resource scope, decision rights, trace records, and accountable exception design, extending the ARM pathway overview to five connected lessons.
- Trust Infrastructure foundations: evidence and claim boundaries, provenance records and content credentials, and verifier policy with correction paths. These are educational inspection methods, not claims about live infrastructure or verified products.
- Public self-audit: a source-linked implementation case study with a claim register, explicit unknowns, correction route, and local-only validation. It does not claim audience, search, commercial, learner, security, compliance, or product outcomes.
- Machine-Readable Internet foundations: canonical entity records, structured relationship data, and discovery-file boundaries. These lessons describe interoperable record and discovery mechanisms; they do not promise indexing, ranking, crawling, citation, retrieval, or model behavior.
- Economic Models and Agentic Commerce foundations: value/payment/fulfillment stages, bounded mandates, reconciliation and disputes, and incentives/risk allocation. These are educational systems models, not financial, investment, payment, tax, legal, profitability, or adoption advice.
- Agentic Interoperability foundations: protocol roles and boundaries, message envelopes and correlation, capability discovery and negotiation, and task state with human handoffs. These lessons describe protocol and workflow primitives; they do not establish trust, authorization, safety, truth, successful execution, or business outcomes.
- GEO foundations: entity clarity, structured data, retrieval surface, source attribution, and currency decay
- Knowledge Index: twelve connected research domains, each organized around a system question, a bounded set of methods, and the next layer a learner should inspect.

Run `node scripts/validate-economic-models-pathway.mjs` to verify the four section 08 lessons, homepage exposure, reciprocal links, source shelves, claim boundaries, sitemap coverage, `llms.txt` coverage, and local relative links.

Run `node scripts/validate-knowledge-index.mjs` to verify the connected domain anchors, source shelf, styling hooks, and machine-readable handoff before publishing a change to the index. Run `node scripts/validate-agentic-interoperability-pathway.mjs` to verify the section 07 route sequence, source links, claim boundaries, and discovery records.

## Identity source

Mason Nguyen's professional roles and identity links are cross-referenced against his canonical [Coreweaver author profile](https://coreweaver.io/authors/mason-nguyen).


## Reusable technical SEO operating procedure

The portable, property-agnostic release procedure is documented in [`docs/TECHNICAL-SEO-OPERATING-PROCEDURE.md`](docs/TECHNICAL-SEO-OPERATING-PROCEDURE.md). It covers route manifests, canonical URLs, robots.txt, sitemap parity, default-follow internal links, hub-and-spoke authority architecture, structured data, image metadata, accessibility essentials, and the boundary between technical readiness and unmeasured ranking or Domain Authority outcomes.

The project’s internal-link policy is documented in [`docs/internal-link-policy.md`](docs/internal-link-policy.md). Ordinary internal anchors are the default-follow standard. Do not add `rel="dofollow"`; do not add `nofollow`, `ugc`, or `sponsored` to normal internal navigation. Use those values only for a documented exception.

Before publishing a property-wide change, run the reproducible checks below from the repository root:

```bash
node scripts/audit-live-site.mjs
node scripts/audit-internal-link-policy.mjs
```

The checks should establish that every intended route is live or intentionally redirected, every important page is reachable through the internal graph, no orphan or over-deep routes remain, canonicals and sitemap URLs agree, intended pages are indexable, internal links are ordinary crawlable anchors, and no restricted link attributes appear without an approved reason. Preserve the JSON output and Markdown report with the release.

### Current SEO baseline

As of 2026-08-30, AI Mastery has 50 HTML routes, 50 live successful fetches, zero broken internal page links, zero orphan pages, zero routes beyond two clicks from home, zero sitemap gaps, zero image-alt gaps, zero restricted internal links, and zero baseline metadata or structured-data warnings. The live robots policy allows crawling and points to the sitemap.

These checks describe technical structure only. They do not establish a Moz Domain Authority score, external referring-domain quality, rankings, citations, revenue, conversions, or learner outcomes. Those require independent measurement and ethical off-site authority work.
