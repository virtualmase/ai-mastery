# Technical SEO operating procedure

**Purpose.** Use this procedure for every Coreweaver, AI Mastery, or related static property before publication. It is designed for portable HTML/CSS/JS sites and does not require Vite, a proprietary backend, or a specific CMS.

> The operating standard is: **make every important page discoverable, understandable, inspectable, and maintainable; pass normal internal authority flow; never manufacture authority or claim outcomes that have not been measured.**

## 1. Establish the route manifest

Enumerate every intended public HTML route and every intentionally published non-HTML resource. Give each route one canonical URL, one descriptive title, one useful description, and one clear purpose. Mark routes as `published`, `review`, `redirect`, or `exclude`; do not let staging, duplicate, or accidental files enter the public sitemap.

The release manifest is the source for the crawler, sitemap, directory, and machine-readable index. A route is not complete until it is both reachable from the home graph and represented consistently in the discovery files.

## 2. Make links crawlable and default-follow

Use ordinary HTML anchors with an `href` for internal navigation:

```html
<a href="/learning/example/">Read the example lesson</a>
```

This is the project’s default-follow state. Do not add `rel="dofollow"`; it is unnecessary markup. Do not add `nofollow`, `ugc`, or `sponsored` to ordinary internal links. Use those values only when the relationship genuinely warrants them and document the reason. Do not replace a page destination with a JavaScript-only click handler.

Use descriptive, concise anchor text that makes sense out of context. Link important pages from at least one other relevant page, create logical hubs and spokes, and put the strongest contextual links in the body of the content. A footer or directory can support discovery, but it should not be the only meaningful link to a high-value page. Google’s current guidance states that crawlable links are normally anchor elements with `href` values and recommends descriptive anchor text and contextual internal cross-references [1].

## 3. Build the authority graph

Organize the site as a small number of clear hubs: the homepage, primary index or directory, topic hubs, supporting lessons, and evidence or case-study records. Every important page should be reachable from home through a short path, normally no more than two or three meaningful clicks. Every lesson should link to its parent hub, one prerequisite or adjacent concept, one evidence/source surface, and one next action.

Do not create artificial link volume, keyword-stuffed anchors, circular link farms, or irrelevant cross-links. Internal links distribute context and discovery; they do not create external authority by themselves. Moz describes link equity as depending on factors including relevance, authority, crawlability, HTTP status, placement, and the broader link graph [2].

## 4. Control indexability and canonicalization

Each intended public HTML route should have a self-referential absolute canonical URL and an indexable robots directive unless there is a documented reason to exclude it. The canonical URL must match the URL represented in internal links and the sitemap. Do not use `robots.txt` to canonicalize duplicates; use redirects or canonical link elements instead. Google identifies redirects and `rel="canonical"` as stronger canonical signals than sitemap inclusion and recommends linking consistently to the canonical URL [3].

Review trailing slashes, protocol, hostname, path prefix, query parameters, and case. A static project hosted beneath a subpath must use the correct base path in every absolute canonical, Open Graph URL, sitemap URL, and internal link.

## 5. Maintain robots and sitemap files

`robots.txt` should permit crawling of intended public content and declare the absolute sitemap URL. Do not block a crawler that the project intends to serve unless the decision is deliberate, documented, and compatible with the property’s distribution goals. A sitemap should contain only canonical, public, indexable URLs and should have parity with the route manifest. Google describes a sitemap as a discovery and relationship signal, not a guarantee that every URL will be crawled or indexed [4].

## 6. Add structured data honestly

Use JSON-LD only when the type and values accurately describe the page. Typical types include `WebSite`, `Organization`, `Course`, `LearningResource`, `CollectionPage`, and `Article`, depending on the actual content. Do not add ratings, reviews, testimonials, offers, outcomes, certifications, or availability that do not exist. Validate JSON-LD syntax and confirm that the visible page supports the structured claims.

## 7. Apply page-level technical basics

Every public page should have a unique title, useful meta description, canonical URL, robots directive, and a meaningful first heading. Where sharing matters, add Open Graph and Twitter metadata. Use semantic headings in order, visible keyboard focus, descriptive link text, accessible image `alt` text, explicit image dimensions when images exist, and lazy loading for below-fold media where appropriate. Keep filenames and alt text descriptive and factual; never use image metadata to invent evidence.

## 8. Run the release gates

From the repository root, run the following checks:

```sh
node scripts/audit-live-site.mjs
node scripts/audit-internal-link-policy.mjs
```

The hard gates are: every intended route returns HTTP 200 or an intentional permanent redirect; there are no broken internal page links; there are no orphan routes; important pages remain within the chosen click-depth limit; there are no unintended `noindex` directives; canonical URLs are self-consistent; sitemap coverage has no missing or extra routes; and no internal link is restricted by `nofollow`, `ugc`, or `sponsored` without an approved exception.

Record warnings separately from failures. A missing enhancement such as optional JSON-LD is not equivalent to a 404, blocked crawl, wrong canonical, or orphaned page. Save the machine-readable JSON report and a concise Markdown summary with the release.

## 9. Measure authority without fabricating it

Technical SEO can establish crawlability, discoverability, canonical consistency, and a coherent internal graph. It cannot guarantee rankings, citations, PageRank transfer, or a Domain Authority score. Moz Domain Authority is a third-party predictive metric based on link data and should be monitored in the relevant tool rather than inferred from local HTML checks [5].

The off-site authority procedure is separate: earn relevant editorial links, maintain accurate entity references, publish source-worthy original work, correct mismatched records, and monitor referring domains and Search Console data. Do not buy, fabricate, exchange, or mass-submit links in ways that compromise trust.

## Current AI Mastery baseline

As of 2026-08-30, the live property has 50 HTML routes, 50 successful live route fetches, zero broken internal page links, zero orphan pages, zero pages beyond two clicks from home, zero sitemap gaps, zero image-alt gaps, zero restrictive internal-link attributes, and zero baseline metadata or structured-data warnings. The current live robots policy allows crawling and points to the sitemap.

These are structural release results. Search visibility, Domain Authority, external referring-domain quality, citations, conversions, and learner outcomes remain measurement questions rather than claims.

## References

[1]: https://developers.google.com/search/docs/crawling-indexing/links-crawlable "Google Search Central: Link best practices for Google"

[2]: https://moz.com/learn/seo/what-is-link-equity "Moz: What Is Link Juice? How Is Link Equity Determined"

[3]: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls "Google Search Central: How to specify a canonical URL"

[4]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview "Google Search Central: Learn about sitemaps"

[5]: https://moz.com/domain-analysis "Moz: Domain Analysis and Domain Authority"
