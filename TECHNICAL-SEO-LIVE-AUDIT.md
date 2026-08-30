# AI Mastery live technical SEO and link-reachability audit

**Audit date:** 2026-08-30  
**Base URL:** https://virtualmase.github.io/ai-mastery/  
**Method:** Zero-dependency Node crawler. It enumerates repository HTML routes, fetches every corresponding live URL, parses internal links and core metadata, calculates homepage click depth, compares the live sitemap with the route manifest, and saves per-page evidence to `audit-live-site.json`.

## Executive result

The live site has **50 of 50 routes returning HTTP 200**. The page graph contains **zero broken page links, zero orphan pages, and zero pages beyond two clicks from the homepage**. Sitemap parity is complete: **50 HTML routes and 50 sitemap URLs**, with no missing or extra entries. No image was found without an `alt` attribute.

Two low-severity technical SEO warnings remain. The `/aure/` directory has no JSON-LD block. The `/directory/` route has neither Open Graph metadata nor JSON-LD. Both pages have titles, descriptions, canonicals, and robots directives, and both are reachable. These are enhancement opportunities, not reachability failures.

## Results

| Check | Result | Classification |
|---|---:|---|
| Published HTML routes enumerated | 50 | Pass |
| Live HTML routes fetched | 50 | Pass |
| HTTP status failures | 0 | Pass |
| Broken internal page links | 0 | Pass |
| Orphan pages | 0 | Pass |
| Pages beyond two clicks from home | 0 | Pass |
| Sitemap URLs | 50 | Pass |
| Sitemap routes missing from local manifest | 0 | Pass |
| Sitemap URLs not represented by HTML routes | 0 | Pass |
| Routes missing image `alt` attributes | 0 | Pass |
| Routes missing required baseline SEO tags | 0 | Pass |
| Routes with enhancement warnings | 2 | Warning |

## Remaining warnings

| Route | Missing element | Recommended treatment |
|---|---|---|
| `/aure/` | JSON-LD | Add `Course` or `CollectionPage` JSON-LD only if the structured values remain accurate and maintainable. |
| `/directory/` | Open Graph and JSON-LD | Add social preview metadata and `CollectionPage`/`ItemList` JSON-LD if the directory is intended as a shareable discovery surface. |

These warnings do not imply ranking, citation, retrieval, revenue, conversion, safety, or learner-outcome results. They are structural observations from the live HTML response.

## Reproducibility

Run from the repository root:

```sh
node scripts/audit-live-site.mjs
```

The script writes `audit-live-site.json` with per-route status, internal targets, depth, metadata flags, image checks, and sitemap comparison data. It exits nonzero when a hard failure occurs or when enhancement warnings are present, so CI can treat the current two warnings as a deliberate review gate.
