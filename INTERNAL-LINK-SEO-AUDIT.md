# Internal-link crawlability and link-equity audit

**Audit scope:** All 50 local HTML routes corresponding to the published AI Mastery site.  
**Live route status:** The prior live audit verified all 50 routes return HTTP 200.  
**Audit date:** 2026-08-30.

## Result

The site contains **518 internal anchor links across 50 HTML pages**. No internal anchor uses `rel="nofollow"`, `rel="ugc"`, or `rel="sponsored"`. No internal link uses a `javascript:` URL, and no audited page carries a `noindex` robots directive. The result is **0 restricted internal links and 0 crawl-control findings**.

Internal links do not need a `dofollow` attribute. A normal HTML anchor without a restrictive `rel` value is the standard crawlable form. Adding a fictional or unnecessary `dofollow` attribute would not improve authority and would create noise. The implementation therefore uses ordinary descriptive anchors and reserves `nofollow`, `ugc`, or `sponsored` for cases where their meaning is actually warranted.

| Check | Result | Classification |
|---|---:|---|
| HTML pages checked | 50 | Pass |
| Total anchors inspected | 750 | Pass |
| Internal anchors inspected | 518 | Pass |
| Internal links with `nofollow`, `ugc`, or `sponsored` | 0 | Pass |
| Internal JavaScript-only links | 0 | Pass |
| Pages with `noindex` | 0 | Pass |
| Previously verified broken internal page links | 0 | Pass |
| Previously verified orphan pages | 0 | Pass |
| Previously verified pages beyond two clicks from home | 0 | Pass |

## SEO boundary

Normal crawlable internal links can help search engines discover and contextualize pages, but they do not guarantee PageRank transfer, domain-authority growth, rankings, citations, or top-tier placement. Those outcomes depend on many external and content-quality signals and remain unmeasured here.

## Reproducibility

Run from the repository root:

```sh
node scripts/audit-internal-link-policy.mjs
```

The command writes `audit-internal-link-policy.json` and exits nonzero if a restricted internal link or `noindex` finding appears.
